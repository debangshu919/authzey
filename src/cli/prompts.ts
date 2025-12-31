import prompts from "prompts";
import { OAUTH_PROVIDERS, type OAuthProvider } from "../core/oauth.js";
import type { AuthProvider } from "../core/provider.js";
import { PROVIDERS } from "../core/registry.js";
import { log } from "../utils/log.js";
import type { DatabaseType, OrmType } from "./context.js";

export async function askAuthFramework(): Promise<AuthProvider> {
	const response = await prompts({
		type: "select",
		name: "framework",
		message: "Choose an authentication framework",
		choices: Object.values(PROVIDERS).map((fw) => ({
			title: fw.name,
			value: fw,
		})),
	});

	if (!response.framework) {
		log.error("\n✘ Setup cancelled");
		process.exit(1);
	}

	return response.framework;
}

export async function askDatabase(): Promise<DatabaseType | null> {
	const { db } = await prompts({
		type: "select",
		name: "db",
		message: "Choose a database",
		choices: [
			{ title: "PostgreSQL", value: "postgres" },
			{ title: "SQLite", value: "sqlite" },
			{ title: "Skip database setup", value: null },
		],
	});

	return db ?? null;
}

export async function askOrm(_db: DatabaseType): Promise<OrmType> {
	const choices = [
		{ title: "Drizzle", value: "drizzle" },
		{ title: "No ORM", value: "none" },
	];

	const { orm } = await prompts({
		type: "select",
		name: "orm",
		message: "Choose an ORM",
		choices,
	});

	return orm;
}

export async function askOAuthProviders(): Promise<OAuthProvider[]> {
	const { providers } = await prompts({
		type: "multiselect",
		name: "providers",
		message: "Select OAuth providers",
		choices: OAUTH_PROVIDERS.map((p) => ({
			title: p.name,
			value: p.id,
		})),
	});

	return providers ?? [];
}
