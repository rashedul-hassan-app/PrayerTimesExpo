import { prayerTimes365 } from "../data/prayerTimes365";
import { getTodaysDatePatternLikeMM_DD } from "./formatPrayerTime";

export const getNextXDaysOfPrayerTimes = (days) => {
	const todayPattern = getTodaysDatePatternLikeMM_DD();

	const keys = Object.keys(prayerTimes365);

	// Find the index of today's date pattern or the next date pattern if not found
	const startIndex = keys.findIndex((key) => key >= todayPattern) || 0;

	// Create a circular array of keys
	const circularKeys = [
		...keys.slice(startIndex),
		...keys.slice(0, startIndex),
	];

	const nextXDaysOfPrayerTimes = {};

	// Iterate through the circularKeys to get the next 9 key-value pairs
	for (let i = 0; i < days; i++) {
		const key = circularKeys[i];
		nextXDaysOfPrayerTimes[key] = prayerTimes365[key];
	}

	console.log(nextXDaysOfPrayerTimes);
	return nextXDaysOfPrayerTimes;
};
