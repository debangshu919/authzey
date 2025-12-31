import type { ProjectContext } from "../cli/context.js";

export type ProviderResult = {
	success: boolean;
	message?: string;
};

export type AuthFrameworkId = "betterAuth" | "authjs";

export interface AuthProvider {
	/** Unique provider id */
	id: AuthFrameworkId;

	/** Display name */
	name: string;

	/** Validate project compatibility */
	validate?(ctx: ProjectContext): ProviderResult | Promise<ProviderResult>;

	/** Install required npm packages */
	installDeps(ctx: ProjectContext): Promise<void>;

	/** Generate config, routes, helpers */
	generateFiles(ctx: ProjectContext): Promise<void>;

	/** Update .env / env.local */
	updateEnv(ctx: ProjectContext): Promise<void>;

	/** Optional DB setup (Prisma, Drizzle, etc.) */
	setupDatabase?(ctx: ProjectContext): Promise<void>;
}
