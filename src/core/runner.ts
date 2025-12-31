import type { ProjectContext } from "../cli/context.js";
import { log } from "../utils/log.js";
import type { AuthProvider } from "./provider.js";

export async function runProvider(provider: AuthProvider, ctx: ProjectContext) {
	log.info(`\n⚙ Setting up ${provider.name}...\n`);

	if (provider.validate) {
		const result = await provider.validate(ctx);
		if (!result.success) {
			log.error(result.message || "Provider validation failed");
			process.exit(1);
		}
	}

	await provider.installDeps(ctx);
	await provider.generateFiles(ctx);
	await provider.updateEnv(ctx);

	if (provider.setupDatabase) {
		await provider.setupDatabase(ctx);
	}

	log.success(`\n✔ ${provider.name} setup completed!\n`);
}
