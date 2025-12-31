import type { AuthProvider } from "./provider.js";
import { BetterAuthProvider } from "../providers/betterAuth/index.js";

export const PROVIDERS: Record<string, AuthProvider> = {
	betterAuth: BetterAuthProvider,
};
