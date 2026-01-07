// Mock the BetterAuth provider to avoid importing ESM packages (execa, ora)
jest.mock("../../src/providers/betterAuth/index", () => ({
	BetterAuthProvider: {
		id: "betterAuth",
		name: "Better Auth",
		installDeps: jest.fn(),
		generateFiles: jest.fn(),
		updateEnv: jest.fn(),
		setupDatabase: jest.fn(),
	},
}));

import { PROVIDERS } from "../../src/core/registry";

describe("PROVIDERS registry", () => {
	it("should have betterAuth provider registered", () => {
		expect(PROVIDERS).toHaveProperty("betterAuth");
	});

	it("betterAuth provider should have correct id", () => {
		expect(PROVIDERS.betterAuth?.id).toBe("betterAuth");
	});

	it("betterAuth provider should have a display name", () => {
		expect(PROVIDERS.betterAuth?.name).toBeDefined();
		expect(typeof PROVIDERS.betterAuth?.name).toBe("string");
		expect(PROVIDERS.betterAuth?.name.length).toBeGreaterThan(0);
	});

	it("betterAuth provider should implement required methods", () => {
		const provider = PROVIDERS.betterAuth;
		expect(provider).toBeDefined();
		expect(typeof provider?.installDeps).toBe("function");
		expect(typeof provider?.generateFiles).toBe("function");
		expect(typeof provider?.updateEnv).toBe("function");
	});

	it("betterAuth provider should optionally implement validate and setupDatabase", () => {
		const provider = PROVIDERS.betterAuth;
		// These are optional, but if defined should be functions
		if (provider?.validate) {
			expect(typeof provider.validate).toBe("function");
		}
		if (provider?.setupDatabase) {
			expect(typeof provider.setupDatabase).toBe("function");
		}
	});

	it("all registered providers should implement AuthProvider interface", () => {
		for (const [_key, provider] of Object.entries(PROVIDERS)) {
			expect(provider).toHaveProperty("id");
			expect(provider).toHaveProperty("name");
			expect(typeof provider.installDeps).toBe("function");
			expect(typeof provider.generateFiles).toBe("function");
			expect(typeof provider.updateEnv).toBe("function");
		}
	});
});
