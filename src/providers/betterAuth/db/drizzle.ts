import path from "node:path";
import type { DatabaseType, ProjectContext } from "../../../cli/context.js";
import { runCommand } from "../../../utils/cmd.js";
import { addEnvVars } from "../../../utils/env.js";
import { writeFileSafe } from "../../../utils/fs.js";
import { installDevPackages, installPackages } from "../../../utils/pkg.js";
import { loadTemplate } from "../../../utils/template.js";
import { renderDatabaseProviderImports, renderMinimalDatabaseProvider, renderOAuthProviders } from "../util.js";

/*
 * install dependencies
 * create db client & drizzle config
 * generate auth schema
 * add env vars
 * create auth-client.ts
 */

export async function setupDrizzle(ctx: ProjectContext) {
	// Install dependencies
	await installPackages(["drizzle-orm", "pg", "dotenv"]);
	await installDevPackages(["drizzle-kit", "tsx", "@types/pg"]);

	// Create db client & drizzle config
	const dbTemplate = loadTemplate("providers/betterAuth/templates/drizzle/db.ts");
	const configTemplate = loadTemplate("providers/betterAuth/templates/drizzle/drizzle.config.ts");

	writeFileSafe(path.join(process.cwd(), "lib", "db.ts"), dbTemplate);
	writeFileSafe(path.join(process.cwd(), "drizzle.config.ts"), configTemplate);

	// Step 1: Write a minimal auth.ts WITHOUT schema import (so better-auth CLI can read it)
	const authTemplate = loadTemplate("providers/betterAuth/templates/auth.ts");
	const minimalAuthTemplate = renderOAuthProviders(
		renderMinimalDatabaseProvider(authTemplate, ctx.db!),
		ctx.orm!,
		ctx.oauthProviders!,
	);
	writeFileSafe(path.join(process.cwd(), "lib", "auth.ts"), minimalAuthTemplate);

	// Step 2: Generate auth schema - await the command and output to lib/auth-schema.ts
	await runCommand("npx", ["@better-auth/cli", "generate", "--output", "./lib/auth-schema.ts", "-y"]);

	// Step 3: Now write the full auth.ts WITH schema import
	const fullAuthTemplate = renderOAuthProviders(
		renderDatabaseProviderImports(authTemplate, ctx.orm!, ctx.db!),
		ctx.orm!,
		ctx.oauthProviders!,
	);
	writeFileSafe(path.join(process.cwd(), "lib", "auth.ts"), fullAuthTemplate);

	// Add env vars
	addEnvVars({
		DATABASE_URL: getDbUrl(ctx.db!),
	});

	// Create auth-client.ts
	const authClientTemplate = loadTemplate("providers/betterAuth/templates/drizzle/auth-client.ts");
	writeFileSafe(path.join(process.cwd(), "lib", "auth-client.ts"), authClientTemplate);
}
function getDbUrl(db: DatabaseType) {
	switch (db) {
		case "postgres":
			return "postgresql://user:password@localhost:5432/db";
		case "sqlite":
			return "file:./dev.db";
	}
}
