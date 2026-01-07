import fs from "node:fs";
import { addEnvVars } from "../../src/utils/env";

// Mock the fs module
jest.mock("node:fs");

const mockedFs = jest.mocked(fs);

describe("addEnvVars", () => {
	const originalCwd = process.cwd;

	beforeEach(() => {
		jest.clearAllMocks();
		process.cwd = () => "/mock/project";
	});

	afterEach(() => {
		process.cwd = originalCwd;
	});

	it("should create new .env.local file if it does not exist", () => {
		mockedFs.existsSync.mockReturnValue(false);
		mockedFs.writeFileSync.mockImplementation(() => {});

		addEnvVars({ API_KEY: "test-key" });

		expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
			expect.stringContaining(".env.local"),
			expect.stringContaining("API_KEY=test-key"),
		);
	});

	it("should append to existing .env.local file", () => {
		mockedFs.existsSync.mockReturnValue(true);
		mockedFs.readFileSync.mockReturnValue("EXISTING_VAR=value");
		mockedFs.writeFileSync.mockImplementation(() => {});

		addEnvVars({ NEW_VAR: "new-value" });

		expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
			expect.stringContaining(".env.local"),
			expect.stringMatching(/EXISTING_VAR=value[\s\S]*NEW_VAR=new-value/),
		);
	});

	it("should skip duplicate keys", () => {
		mockedFs.existsSync.mockReturnValue(true);
		mockedFs.readFileSync.mockReturnValue("API_KEY=existing-value");
		mockedFs.writeFileSync.mockImplementation(() => {});

		addEnvVars({ API_KEY: "new-value" });

		const writeCall = mockedFs.writeFileSync.mock.calls[0];
		const content = writeCall?.[1] as string;

		// Should not add duplicate
		const matches = (content.match(/API_KEY/g) || []).length;
		expect(matches).toBe(1);
	});

	it("should add multiple variables at once", () => {
		mockedFs.existsSync.mockReturnValue(false);
		mockedFs.writeFileSync.mockImplementation(() => {});

		addEnvVars({
			VAR_ONE: "value1",
			VAR_TWO: "value2",
			VAR_THREE: "value3",
		});

		expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
			expect.stringContaining(".env.local"),
			expect.stringMatching(/VAR_ONE=value1[\s\S]*VAR_TWO=value2[\s\S]*VAR_THREE=value3/),
		);
	});

	it("should trim content and ensure trailing newline", () => {
		mockedFs.existsSync.mockReturnValue(true);
		mockedFs.readFileSync.mockReturnValue("EXISTING=value\n\n\n");
		mockedFs.writeFileSync.mockImplementation(() => {});

		addEnvVars({ NEW_VAR: "test" });

		const writeCall = mockedFs.writeFileSync.mock.calls[0];
		const content = writeCall?.[1] as string;

		// Should end with exactly one newline
		expect(content.endsWith("\n")).toBe(true);
		expect(content.endsWith("\n\n")).toBe(false);
	});

	it("should handle empty existing file", () => {
		mockedFs.existsSync.mockReturnValue(true);
		mockedFs.readFileSync.mockReturnValue("");
		mockedFs.writeFileSync.mockImplementation(() => {});

		addEnvVars({ NEW_VAR: "value" });

		expect(mockedFs.writeFileSync).toHaveBeenCalledWith(
			expect.stringContaining(".env.local"),
			expect.stringContaining("NEW_VAR=value"),
		);
	});
});
