import fs from "node:fs";
import path from "node:path";
import kleur from "kleur";
import { formatSize } from "./format.js";

export function writeFileSafe(filePath: string, content: string) {
	let fileExists = false;
	if (fs.existsSync(filePath)) fileExists = true;

	fs.mkdirSync(path.dirname(filePath), { recursive: true });
	fs.writeFileSync(filePath, content);

	if (fileExists) {
		console.log(
			`${kleur.bgCyan().black("EDITED")} ${kleur.bold(
				filePath.replace(process.cwd(), "").slice(1).replaceAll("\\", "/"),
			)} ${kleur.green(formatSize(fs.statSync(filePath).size))}`,
		);
	} else {
		console.log(
			`${kleur.bgCyan().black("CREATED")} ${kleur.bold(
				filePath.replace(process.cwd(), "").slice(1).replaceAll("\\", "/"),
			)} ${kleur.green(formatSize(fs.statSync(filePath).size))}`,
		);
	}
}
