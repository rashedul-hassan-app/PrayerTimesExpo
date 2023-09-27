import { get365PrayerDataFromLS } from "../data/dataManager";
import { getNextXDaysOfPrayerTimes } from "../utils/getPrayerTimes"; // Import your utility functions here
import {
	clearAllNotifications,
	schedulePrayerTimeNotifications,
} from "./handle-local-notification";

export const scheduleNotificationsOnPhone = async (days = 7) => {
	try {
		const prayerTimes = await get365PrayerDataFromLS();
		await clearAllNotifications();
		await schedulePrayerTimeNotifications(
			getNextXDaysOfPrayerTimes(days, prayerTimes)
		);

		console.log("--x--- Finished setting all notifications --x---");
	} catch (err) {
		console.error("Error: Scheduling on phone");
	}
};
