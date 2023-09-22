import { prayerTimes365 } from "../data/prayerTimes365";

// Helper function to format prayer time from H, MM, S to HH:MM AM/PM
export const formatPrayerTimeToAMPM = (time) => {
	const [hours, minutes] = time.split(",").map(Number);
	const period = hours < 12 ? "AM" : "PM";
	const formattedHours = (((hours + 11) % 12) + 1)
		.toString()
		.padStart(2, "0");
	const formattedMinutes = minutes.toString().padStart(2, "0");
	return `${formattedHours}:${formattedMinutes} ${period}`;
};

export const formatPrayerTimeTo24H = (time) => {
	const [hours, minutes] = time.split(",").map(Number);
	const formattedHours = hours.toString().padStart(2, "0");
	const formattedMinutes = minutes.toString().padStart(2, "0");
	return `${formattedHours}:${formattedMinutes}`;
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
