import { OAUTH_PROVIDERS, type OAuthProvider } from "../../src/core/oauth";

describe("OAUTH_PROVIDERS", () => {
	it("should contain github provider", () => {
		const github = OAUTH_PROVIDERS.find((p) => p.id === "github");
		expect(github).toBeDefined();
		expect(github?.name).toBe("GitHub");
		expect(github?.env).toContain("GITHUB_CLIENT_ID");
		expect(github?.env).toContain("GITHUB_CLIENT_SECRET");
	});

	it("should contain google provider", () => {
		const google = OAUTH_PROVIDERS.find((p) => p.id === "google");
		expect(google).toBeDefined();
		expect(google?.name).toBe("Google");
		expect(google?.env).toContain("GOOGLE_CLIENT_ID");
		expect(google?.env).toContain("GOOGLE_CLIENT_SECRET");
	});

	it("should contain discord provider", () => {
		const discord = OAUTH_PROVIDERS.find((p) => p.id === "discord");
		expect(discord).toBeDefined();
		expect(discord?.name).toBe("Discord");
		expect(discord?.env).toContain("DISCORD_CLIENT_ID");
		expect(discord?.env).toContain("DISCORD_CLIENT_SECRET");
	});

	it("should have exactly 3 providers", () => {
		expect(OAUTH_PROVIDERS).toHaveLength(3);
	});

	it("each provider should have required properties", () => {
		for (const provider of OAUTH_PROVIDERS) {
			expect(provider).toHaveProperty("id");
			expect(provider).toHaveProperty("name");
			expect(provider).toHaveProperty("env");
			expect(Array.isArray(provider.env)).toBe(true);
			expect(provider.env.length).toBeGreaterThanOrEqual(2);
		}
	});

	it("each provider should have client ID and secret env vars", () => {
		for (const provider of OAUTH_PROVIDERS) {
			const hasClientId = provider.env.some((e) => e.includes("CLIENT_ID"));
			const hasClientSecret = provider.env.some((e) => e.includes("CLIENT_SECRET"));
			expect(hasClientId).toBe(true);
			expect(hasClientSecret).toBe(true);
		}
	});
});

describe("OAuthProvider type", () => {
	it("should accept valid provider ids", () => {
		const validIds: OAuthProvider[] = ["github", "google", "discord"];
		expect(validIds).toHaveLength(3);
	});
});
