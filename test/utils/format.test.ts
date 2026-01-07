import { formatSize } from "../../src/utils/format";

// Define the enum locally for testing since it's not exported
enum sizeFormat {
	B = "B",
	KB = "KB",
	MB = "MB",
	GB = "GB",
	TB = "TB",
}

describe("formatSize", () => {
	describe("auto-detection of best unit", () => {
		it("should format bytes correctly", () => {
			expect(formatSize(500)).toBe("500 B");
		});

		it("should auto-convert to KB when appropriate", () => {
			expect(formatSize(1024)).toBe("1.00 KB");
		});

		it("should auto-convert to MB when appropriate", () => {
			expect(formatSize(1024 * 1024)).toBe("1.00 MB");
		});

		it("should auto-convert to GB when appropriate", () => {
			expect(formatSize(1024 * 1024 * 1024)).toBe("1.00 GB");
		});

		it("should auto-convert to TB when appropriate", () => {
			expect(formatSize(1024 * 1024 * 1024 * 1024)).toBe("1.00 TB");
		});

		it("should handle zero", () => {
			expect(formatSize(0)).toBe("0.00 B");
		});
	});

	describe("explicit source unit conversion", () => {
		it("should accept source unit for conversion", () => {
			expect(formatSize(1, sizeFormat.KB)).toBe("1.00 KB");
		});

		it("should convert from KB to appropriate display", () => {
			expect(formatSize(1024, sizeFormat.KB)).toBe("1.00 MB");
		});

		it("should convert from MB", () => {
			expect(formatSize(1, sizeFormat.MB)).toBe("1.00 MB");
		});
	});

	describe("explicit target unit conversion", () => {
		it("should convert bytes to KB when target specified", () => {
			expect(formatSize(1024, sizeFormat.B, sizeFormat.KB)).toBe("1.00 KB");
		});

		it("should convert KB to MB when target specified", () => {
			expect(formatSize(1024, sizeFormat.KB, sizeFormat.MB)).toBe("1.00 MB");
		});

		it("should convert MB to GB when target specified", () => {
			expect(formatSize(1024, sizeFormat.MB, sizeFormat.GB)).toBe("1.00 GB");
		});

		it("should convert down (GB to MB)", () => {
			expect(formatSize(1, sizeFormat.GB, sizeFormat.MB)).toBe("1024.00 MB");
		});
	});

	describe("formatting precision", () => {
		it("should show 2 decimal places for small values", () => {
			expect(formatSize(1.5 * 1024)).toBe("1.50 KB");
		});

		it("should show 1 decimal place for values >= 10", () => {
			expect(formatSize(15 * 1024)).toBe("15.0 KB");
		});

		it("should show no decimal places for values >= 100", () => {
			expect(formatSize(150 * 1024)).toBe("150 KB");
		});
	});

	describe("error handling", () => {
		it("should throw for invalid source unit", () => {
			expect(() => formatSize(100, "invalid" as sizeFormat)).toThrow("Invalid unit: invalid");
		});

		it("should throw for invalid target unit", () => {
			expect(() => formatSize(100, sizeFormat.B, "invalid" as sizeFormat)).toThrow("Invalid target unit: invalid");
		});
	});
});
