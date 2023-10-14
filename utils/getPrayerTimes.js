import { prayerTimes365 } from "../data/prayerTimes365";
import {
	getTodaysDatePatternLikeMM_DD,
	formatPrayerTimeToAMPM,
	formatPrayerTimeTo24H,
} from "./formatPrayerTime";

export const getNextXDaysOfPrayerTimes = (days, prayerTimes365) => {
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
	return nextXDaysOfPrayerTimes;
};

// Helper function to find the next prayer time and name
const findNextPrayer = (prayerTimes365) => {
	const todayPattern = getTodaysDatePatternLikeMM_DD();
	const todaysTimes = prayerTimes365[todayPattern];
	const currentTime = new Date();

	if (!todaysTimes || todaysTimes.length === 0) {
		return null;
	}

	for (let i = 0; i < todaysTimes.length; i++) {
		const time = todaysTimes[i];
		const [hours, minutes, seconds] = time.split(",").map(Number);
		const prayerTime = new Date(
			currentTime.getFullYear(),
			currentTime.getMonth(),
			currentTime.getDate(),
			hours,
			minutes,
			seconds
		);

		if (prayerTime > currentTime) {
			const nextPrayerName = getPrayerName(i);
			return { name: nextPrayerName, time: formatPrayerTimeToAMPM(time) };
		}
	}

	// If no future prayer time was found for today, get the first time for tomorrow
	const tomorrowPattern = getTodaysDatePatternLikeMM_DD(
		new Date(currentTime.getTime() + 24 * 60 * 60 * 1000)
	);
	const tomorrowTimes = prayerTimes365[tomorrowPattern];

	if (!tomorrowTimes || tomorrowTimes.length === 0) {
		return null;
	}

	const nextPrayerName = getPrayerName(0);
	const nextPrayerTime = formatPrayerTimeToAMPM(tomorrowTimes[0]);
	return { name: nextPrayerName, time: nextPrayerTime };
};

// Helper function to get the prayer name based on index
export const getPrayerName = (index) => {
	const prayerNames = {
		0: "Sehri",
		1: "Fajr",
		2: "Sunrise",
		3: new Date().getDay() === 5 ? "Jummah" : "Zuhr",
		4: "Asr",
		5: "Maghrib",
		6: "Isha",
	};
	return prayerNames[index] || "Unknown";
};

// Function to get the next prayer name
export const getNextPrayerName = (prayerTimes365) => {
	const nextPrayerInfo = findNextPrayer(prayerTimes365);
	return nextPrayerInfo ? nextPrayerInfo.name : "No upcoming prayer";
};

// Function to get the next prayer time
export const getNextPrayerTime = (prayerTimes365) => {
	const nextPrayerInfo = findNextPrayer(prayerTimes365);
	return nextPrayerInfo ? nextPrayerInfo.time : "No upcoming prayer";
};

export const getTimeRemainingUntilTheNextPrayer = (prayerTimes365) => {
	const nextPrayerInfo = findNextPrayer(prayerTimes365);
	if (!nextPrayerInfo) {
		return null;
	}

	// Convert the prayer time to 24-hour format
	const formattedPrayerTime = formatPrayerTimeTo24H(nextPrayerInfo.time);
	// console.log(
	// 	`nxtP.tim=${nextPrayerInfo.time} formattedPrayertime in 24h ${formattedPrayerTime}`
	// );
	// Split the formatted time string like "05:30" into hours and minutes
	const [hoursOfNP, minutesOfNP] = formattedPrayerTime.split(":");
	// console.log(
	// 	`Passed Time ${nextPrayerInfo.time} ${formattedPrayerTime} OG ${hoursOfNP}, ${minutesOfNP}`
	// );
	// Get the current date and time
	const currentTime = new Date();
	const currentHours = currentTime.getHours();
	const currentMinutes = currentTime.getMinutes();
	const currentSeconds = currentTime.getSeconds();

	// Create a new date object with today's date and the prayer time
	const todayPrayerTime = new Date(currentTime);
	todayPrayerTime.setHours(hoursOfNP, minutesOfNP, 0, 0);
	// console.log(
	// 	`C T ${currentTime}  Next PT ${todayPrayerTime} currH = ${currentHours} PT h=${hoursOfNP}`
	// );
	if (currentTime >= todayPrayerTime) {
		// Today's prayer time has passed, so calculate time remaining until tomorrow's first prayer
		const tomorrowFirstPrayerTime = new Date(currentTime);
		tomorrowFirstPrayerTime.setDate(currentTime.getDate() + 1);
		tomorrowFirstPrayerTime.setHours(hoursOfNP, minutesOfNP, 0, 0);

		// Calculate the time difference between tomorrow's first prayer and today's current time
		const timeDiff = (tomorrowFirstPrayerTime - currentTime) / 1000; // Convert milliseconds to seconds
		const hoursRemaining = Math.floor(timeDiff / 3600);
		const minutesRemaining = Math.floor((timeDiff % 3600) / 60);
		const secondsRemaining = Math.floor(timeDiff % 60);

		return {
			hours: hoursRemaining,
			minutes: minutesRemaining,
			seconds: secondsRemaining,
		};
	} else {
		// Today's prayer time is still ahead, so calculate time remaining
		const timeDiff =
			hoursOfNP * 3600 +
			minutesOfNP * 60 - // Total seconds until prayer time
			(currentHours * 3600 + currentMinutes * 60 + currentSeconds); // Total seconds elapsed today

		const hoursRemaining = Math.floor(timeDiff / 3600);
		const minutesRemaining = Math.floor((timeDiff % 3600) / 60);
		const secondsRemaining = Math.floor(timeDiff % 60);

		return {
			hours: hoursRemaining,
			minutes: minutesRemaining,
			seconds: secondsRemaining,
		};
	}
};

export const getTodaysPrayerTimes = (prayerTimes365) => {
	const todayKey = getTodaysDatePatternLikeMM_DD();
	const newTodaysPrayerTimes = (prayerTimes365[todayKey] || []).map(
		formatPrayerTimeToAMPM
	);
	return newTodaysPrayerTimes;
};
