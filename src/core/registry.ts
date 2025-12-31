import { BetterAuthProvider } from "../providers/betterAuth/index.js";
import type { AuthProvider } from "./provider.js";

export const PROVIDERS: Record<string, AuthProvider> = {
	betterAuth: BetterAuthProvider,
};
