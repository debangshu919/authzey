import fs from "node:fs";
import path from "node:path";
import type { OAuthProvider } from "../core/oauth.js";

export type DatabaseType = "postgres" | "sqlite";
export type OrmType = "drizzle" | "none";

export type ProjectContext = {
	framework: "nextjs" | "unknown";
	router: "app" | "pages" | "unknown";
	language: "ts" | "js";
	root: string;

	db?: DatabaseType;
	orm?: OrmType;
	oauthProviders?: OAuthProvider[];
};

export async function getProjectContext(): Promise<ProjectContext> {
	const root = process.cwd();

	const hasNextConfig =
		fs.existsSync(path.join(root, "next.config.js")) ||
		fs.existsSync(path.join(root, "next.config.mjs")) ||
		fs.existsSync(path.join(root, "next.config.ts"));

	const hasAppRouter = fs.existsSync(path.join(root, "app"));
	const hasPagesRouter = fs.existsSync(path.join(root, "pages"));

	const usesTS = fs.existsSync(path.join(root, "tsconfig.json"));

	return {
		framework: hasNextConfig ? "nextjs" : "unknown",
		router: hasAppRouter ? "app" : hasPagesRouter ? "pages" : "unknown",
		language: usesTS ? "ts" : "js",
		root,
	};
}
