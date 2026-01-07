import fs from "node:fs";
import { getProjectContext } from "../../src/cli/context";

// Mock the fs module
jest.mock("node:fs");

const mockedFs = jest.mocked(fs);

describe("getProjectContext", () => {
	const originalCwd = process.cwd;

	beforeEach(() => {
		jest.clearAllMocks();
		process.cwd = () => "/mock/project";
	});

	afterEach(() => {
		process.cwd = originalCwd;
	});

	describe("framework detection", () => {
		it("should detect nextjs with next.config.js", async () => {
			mockedFs.existsSync.mockImplementation((filePath) => {
				const p = filePath.toString();
				return p.includes("next.config.js");
			});

			const ctx = await getProjectContext();
			expect(ctx.framework).toBe("nextjs");
		});

		it("should detect nextjs with next.config.mjs", async () => {
			mockedFs.existsSync.mockImplementation((filePath) => {
				const p = filePath.toString();
				return p.includes("next.config.mjs");
			});

			const ctx = await getProjectContext();
			expect(ctx.framework).toBe("nextjs");
		});

		it("should detect nextjs with next.config.ts", async () => {
			mockedFs.existsSync.mockImplementation((filePath) => {
				const p = filePath.toString();
				return p.includes("next.config.ts");
			});

			const ctx = await getProjectContext();
			expect(ctx.framework).toBe("nextjs");
		});

		it("should return unknown when no next.config found", async () => {
			mockedFs.existsSync.mockReturnValue(false);

			const ctx = await getProjectContext();
			expect(ctx.framework).toBe("unknown");
		});
	});

	describe("router detection", () => {
		it("should detect app router", async () => {
			mockedFs.existsSync.mockImplementation((filePath) => {
				const p = filePath.toString();
				return p.endsWith("app") || p.endsWith("app/");
			});

			const ctx = await getProjectContext();
			expect(ctx.router).toBe("app");
		});

		it("should detect pages router when no app folder", async () => {
			mockedFs.existsSync.mockImplementation((filePath) => {
				const p = filePath.toString();
				return p.endsWith("pages") || p.endsWith("pages/");
			});

			const ctx = await getProjectContext();
			expect(ctx.router).toBe("pages");
		});

		it("should return unknown when neither router found", async () => {
			mockedFs.existsSync.mockReturnValue(false);

			const ctx = await getProjectContext();
			expect(ctx.router).toBe("unknown");
		});

		it("should prefer app router when both exist", async () => {
			mockedFs.existsSync.mockImplementation((filePath) => {
				const p = filePath.toString();
				return p.endsWith("app") || p.endsWith("pages");
			});

			const ctx = await getProjectContext();
			expect(ctx.router).toBe("app");
		});
	});

	describe("language detection", () => {
		it("should detect TypeScript when tsconfig.json exists", async () => {
			mockedFs.existsSync.mockImplementation((filePath) => {
				const p = filePath.toString();
				return p.includes("tsconfig.json");
			});

			const ctx = await getProjectContext();
			expect(ctx.language).toBe("ts");
		});

		it("should return js when tsconfig.json does not exist", async () => {
			mockedFs.existsSync.mockReturnValue(false);

			const ctx = await getProjectContext();
			expect(ctx.language).toBe("js");
		});
	});

	describe("root detection", () => {
		it("should set root to current working directory", async () => {
			mockedFs.existsSync.mockReturnValue(false);

			const ctx = await getProjectContext();
			expect(ctx.root).toBe("/mock/project");
		});
	});

	describe("full project detection", () => {
		it("should correctly detect a full Next.js TypeScript app router project", async () => {
			mockedFs.existsSync.mockImplementation((filePath) => {
				const p = filePath.toString();
				return p.includes("next.config.ts") || p.endsWith("app") || p.includes("tsconfig.json");
			});

			const ctx = await getProjectContext();
			expect(ctx).toEqual({
				framework: "nextjs",
				router: "app",
				language: "ts",
				root: "/mock/project",
			});
		});
	});
});
