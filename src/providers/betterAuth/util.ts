import type { DatabaseType, OrmType } from "../../cli/context.js";
import type { OAuthProvider } from "../../core/oauth.js";

export function getDbUrl(db: DatabaseType) {
	switch (db) {
		case "postgres":
			return "postgresql://user:password@localhost:5432/db";
		case "sqlite":
			return "file:./dev.db";
	}
}

/**
 * Renders a minimal database config WITHOUT schema import.
 * This is used before schema generation so better-auth CLI can read the config.
 */
export function renderMinimalDatabaseProvider(template: string, db: DatabaseType) {
	template = template.replace(
		"// ORM RELATED IMPORTS",
		`import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";`,
	);

	template = template.replace(
		"// DATABASE",
		`database: drizzleAdapter(db, {
    provider: "${db === "postgres" ? "pg" : db}",
  }),`,
	);
	return template;
}

export function renderDatabaseProviderImports(template: string, orm: OrmType, db: DatabaseType) {
	switch (orm) {
		case "drizzle":
			template = template.replace(
				"// ORM RELATED IMPORTS",
				`import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/auth-schema";`,
			);

			template = template.replace(
				"// DATABASE",
				`database: drizzleAdapter(db, {
    provider: "${db === "postgres" ? "pg" : db}",
    schema,
  }),`,
			);
			return template;
		default:
			return template;
	}
}

function renderSocialProvider(provider: OAuthProvider) {
	switch (provider) {
		case "github":
			return `    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }`;

		case "google":
			return `    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }`;

		case "discord":
			return `    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }`;

		default:
			return "";
	}
}

export function renderOAuthProviders(template: string, _orm: OrmType, oauth: OAuthProvider[]) {
	if (!oauth || oauth.length === 0) {
		// Remove the placeholder if no OAuth providers selected
		return template.replace("// SOCIAL_PROVIDERS", "");
	}

	const socialProvidersBlock = `socialProviders: {
${oauth.map(renderSocialProvider).join(",\n")}
  },`;

	return template.replace("// SOCIAL_PROVIDERS", socialProvidersBlock);
}
