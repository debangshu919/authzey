export type OAuthProvider = "github" | "google" | "discord";

export const OAUTH_PROVIDERS: {
	id: OAuthProvider;
	name: string;
	env: string[];
}[] = [
	{
		id: "github",
		name: "GitHub",
		env: ["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"],
	},
	{
		id: "google",
		name: "Google",
		env: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"],
	},
	{
		id: "discord",
		name: "Discord",
		env: ["DISCORD_CLIENT_ID", "DISCORD_CLIENT_SECRET"],
	},
];
