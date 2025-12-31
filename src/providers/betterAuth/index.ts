import crypto from "node:crypto";
import path from "node:path";
import type { ProjectContext } from "../../cli/context.js";
import { OAUTH_PROVIDERS } from "../../core/oauth.js";
import type { AuthProvider } from "../../core/provider.js";
import { addEnvVars } from "../../utils/env.js";
import { writeFileSafe } from "../../utils/fs.js";
import { installPackages } from "../../utils/pkg.js";
import { loadTemplate } from "../../utils/template.js";
import { setupDrizzle } from "./db/drizzle.js";

export const BetterAuthProvider: AuthProvider = {
	id: "betterAuth",
	name: "Better Auth",

	validate(ctx: ProjectContext) {
		if (ctx.framework !== "nextjs") {
			return {
				success: false,
				message: "Better Auth currently supports Next.js only",
			};
		}

		if (ctx.router !== "app") {
			return {
				success: false,
				message: "Better Auth requires Next.js App Router",
			};
		}

		return { success: true };
	},

	async installDeps(_ctx: ProjectContext) {
		const packages = ["better-auth"];
		await installPackages(packages);
	},

	async setupDatabase(ctx: ProjectContext) {
		if (!ctx.db || !ctx.orm || ctx.orm === "none") return;

		if (ctx.orm === "drizzle") {
			await setupDrizzle(ctx);
		}
	},

	async generateFiles(_ctx: ProjectContext) {
		const root = process.cwd();

		const routeTemplate = loadTemplate("providers/betterAuth/templates/route.ts");
		const authTemplate = loadTemplate("providers/betterAuth/templates/auth.ts");

		writeFileSafe(path.join(root, "lib", "auth.ts"), authTemplate);
		writeFileSafe(path.join(root, "app", "api", "auth", "[...auth]", "route.ts"), routeTemplate);
	},

	async updateEnv(ctx: ProjectContext) {
		const envs: Record<string, string> = {
			BETTER_AUTH_SECRET: crypto.randomBytes(32).toString("hex"),
			BETTER_AUTH_URL: "http://localhost:3000",
		};

		for (const p of ctx.oauthProviders ?? []) {
			const provider = OAUTH_PROVIDERS.find((x) => x.id === p);
			provider?.env.forEach((key) => {
				envs[key] = "";
			});
		}

		addEnvVars(envs);
	},
};
