import { execa } from "execa";

export async function runCommand(command: string, args: string[] = []) {
	return execa(command, args);
}
