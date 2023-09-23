import { getNextXDaysOfPrayerTimes } from "../utils/getPrayerTimes"; // Import your utility functions here
import {
	clearAllNotifications,
	schedulePrayerTimeNotifications,
} from "./handle-local-notification";

export const scheduleNotificationsOnPhone = async (days = 7) => {
	try {
		await clearAllNotifications();
		schedulePrayerTimeNotifications(getNextXDaysOfPrayerTimes(days)); // Call schedulePrayerTimeNotifications after clearAllNotifications is done

		console.log("--x--- Finished setting all notifications --x---");
	} catch (err) {
		console.error("Error: Scheduling on phone");
	}
};
