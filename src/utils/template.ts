import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadTemplate(relativePath: string): string {
	// Check if we're running from dist/ (bundled) or src/ (development)
	const isDist = __dirname.endsWith("dist") || __dirname.includes("dist");

	// In production (dist), go up one level to project root, then into src/
	// In development (src/utils), go up one level to src/
	const basePath = isDist ? path.join(__dirname, "..", "src") : path.join(__dirname, "..");

	return fs.readFileSync(path.join(basePath, relativePath), "utf-8");
}
