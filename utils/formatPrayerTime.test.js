import { formatPrayerTimeTo24H } from "./formatPrayerTime";

describe("formatPrayerTimeTo24H", () => {
	it("should format AM time correctly", () => {
		const formattedTime = formatPrayerTimeTo24H("12:41 AM");
		expect(formattedTime).toBe("00:41");
	});

	it("should format PM time correctly", () => {
		const formattedTime = formatPrayerTimeTo24H("05:30 PM");
		expect(formattedTime).toBe("17:30");
	});

	it("should format PM time correctly 1", () => {
		const formattedTime = formatPrayerTimeTo24H("12:00 PM");
		expect(formattedTime).toBe("12:00");
	});

	it("should format PM time correctly 2", () => {
		const formattedTime = formatPrayerTimeTo24H("12:00 AM");
		expect(formattedTime).toBe("00:00");
	});

	it("should format PM time correctly 2", () => {
		const formattedTime = formatPrayerTimeTo24H("11:59 AM");
		expect(formattedTime).toBe("11:59");
	});

	it("should format PM time correctly 2", () => {
		const formattedTime = formatPrayerTimeTo24H("11:59 PM");
		expect(formattedTime).toBe("23:59");
	});

	it("should format PM time correctly 3", () => {
		const formattedTime = formatPrayerTimeTo24H("12:01 PM");
		expect(formattedTime).toBe("12:01");
	});

	it("should format PM time correctly 3", () => {
		const formattedTime = formatPrayerTimeTo24H("12:01 AM");
		expect(formattedTime).toBe("00:01");
	});
});
