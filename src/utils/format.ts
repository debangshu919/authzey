enum sizeFormat {
	B = "B",
	KB = "KB",
	MB = "MB",
	GB = "GB",
	TB = "TB",
}

export function formatSize(size: number, unit: sizeFormat = sizeFormat.B, target?: sizeFormat): string {
	const units = [sizeFormat.B, sizeFormat.KB, sizeFormat.MB, sizeFormat.GB, sizeFormat.TB];
	const unitIndex = units.indexOf(unit);

	if (unitIndex === -1) {
		throw new Error(`Invalid unit: ${unit}`);
	}

	const sizeInBytes = size * 1024 ** unitIndex;

	if (target) {
		const targetIndex = units.indexOf(target);
		if (targetIndex === -1) {
			throw new Error(`Invalid target unit: ${target}`);
		}

		const convertedSize = sizeInBytes / 1024 ** targetIndex;
		return `${convertedSize.toFixed(2)} ${target}`;
	}

	// Auto-detect the best unit (largest unit where size >= 1)
	let currentSize = sizeInBytes;
	let currentUnitIndex = 0;

	while (currentSize >= 1024 && currentUnitIndex < units.length - 1) {
		currentSize /= 1024;
		currentUnitIndex++;
	}

	const formattedSize =
		currentSize < 10 ? currentSize.toFixed(2) : currentSize < 100 ? currentSize.toFixed(1) : currentSize.toFixed(0);

	return `${formattedSize} ${units[currentUnitIndex]}`;
}
