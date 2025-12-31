import fs from "node:fs";
import path from "node:path";

export function addEnvVars(vars: Record<string, string>) {
	const envPath = path.join(process.cwd(), ".env.local");

	let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : "";

	for (const [key, value] of Object.entries(vars)) {
		if (!content.includes(key)) {
			content += `\n${key}=${value}`;
		}
	}

	fs.writeFileSync(envPath, `${content.trim()}\n`);
}
