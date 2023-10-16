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
export const formatPrayerTimeTo24H = (amPmTime) => {
	// Split the time string by ':' and space to handle variations
	let [time, modifier] = amPmTime.split(" ");
	let [hours, minutes] = time.split(":");

	if (hours === "12") {
		hours = "00";
	}

	if (modifier === "PM") {
		hours = parseInt(hours, 10) + 12;
	}

	return `${hours}:${minutes}` || "";
};

// If you want the tomorrow's time, pass 'true' as a param
export const getTodaysDatePatternLikeMM_DD = (tomorrow = false) => {
	const today = new Date();
	if (tomorrow) {
		today.setDate(today.getDate() + 1);
	}
	const month = (today.getMonth() + 1).toString().padStart(2, "0");
	const day = today.getDate().toString().padStart(2, "0");
	const todayPattern = `${month}_${day}`;
	return todayPattern;
};

export const getTodaysDatePatternAsString = () => {
	const today = new Date();
	const month = months[today.getMonth()];
	const day = today.getDate();

	return `${month} ${day}`;
};

export const convertToDateStringFromMM_DD = (dateString) => {
	if (dateString) {
		const month = dateString.split("_")[0];
		const date = dateString.split("_")[1];

		return `${months[month - 1]} ${date}`;
	}
	return "Loading";
};
