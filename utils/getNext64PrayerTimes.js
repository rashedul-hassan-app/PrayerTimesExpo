import { prayerTimes365 } from "../data/prayerTimes365";

export const getNext64PrayerTimes = () => {
	const todayPattern = getTodaysDatePatternLikeMM_DD();

	const keys = Object.keys(prayerTimes365);

	// Find the index of today's date pattern or the next date pattern if not found
	const startIndex = keys.findIndex((key) => key >= todayPattern) || 0;

	// Create a circular array of keys
	const circularKeys = [
		...keys.slice(startIndex),
		...keys.slice(0, startIndex),
	];

	const next10PrayerTimes = {};

	// Iterate through the circularKeys to get the next 9 key-value pairs
	for (let i = 0; i < 9; i++) {
		const key = circularKeys[i];
		next10PrayerTimes[key] = prayerTimes365[key];
	}

	console.log(next10PrayerTimes);
	return next10PrayerTimes;
};

export const getTodaysDatePatternLikeMM_DD = () => {
	const today = new Date();
	const month = (today.getMonth() + 1).toString().padStart(2, "0");
	const day = today.getDate().toString().padStart(2, "0");
	const todayPattern = `${month}_${day}`;
	return todayPattern;
};

export const getTodaysDatePatternAsString = () => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const today = new Date();
	const month = months[today.getMonth()];
	const day = today.getDate();

	return `${month} ${day}`;
};
