import { execa } from "execa";

export async function installPackages(pkgs: string[], cwd = process.cwd()) {
	await execa("npm", ["install", "--legacy-peer-deps", ...pkgs], {
		cwd,
		stdio: "inherit",
	});
}

export async function installDevPackages(pkgs: string[], cwd = process.cwd()) {
	await execa("npm", ["install", "--save-dev", "--legacy-peer-deps", ...pkgs], {
		cwd,
		stdio: "inherit",
	});
}
