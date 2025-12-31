#!/usr/bin/env node

import { cac } from "cac";
import { getProjectContext } from "./cli/context.js";
import { log } from "./utils/log.js";
import { askAuthFramework, askDatabase, askOrm, askOAuthProviders } from "./cli/prompts.js";
import { PROVIDERS } from "./core/registry.js";
import { runProvider } from "./core/runner.js";

const cli = cac("setup-auth");

cli.command("", "Setup authentication for your project").action(async () => {
	log.info("\n🔐 setup-auth\n");

	const ctx = await getProjectContext();

	log.success("✔ Project detected");
	log.info(`  Framework : ${ctx.framework}`);
	log.info(`  Router    : ${ctx.router}`);
	log.info(`  Language  : ${ctx.language}`);
	log.info(``);

	const framework = await askAuthFramework();

	const db = await askDatabase();
	if (db) {
		ctx.db = db;
		const orm = await askOrm(db);
		ctx.orm = orm;
	}

	const oauthProviders = await askOAuthProviders();
	ctx.oauthProviders = oauthProviders;

	const provider = PROVIDERS[framework.id]!;
	await runProvider(provider, ctx);
});

cli.help();
cli.parse();
