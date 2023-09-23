import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { scheduleNotificationsOnPhone } from "./scheduler";

const BACKGROUND_FETCH_TASK = "BACKGROUND_TASK";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
	try {
		console.log("-*- background scheduling STARTED -*-");
		// Call the Scheduler
		await scheduleNotificationsOnPhone();
		console.log("--- background scheduling finished ---");

		BackgroundFetch.finish();
	} catch (err) {
		return BackgroundFetch.BackgroundFetchResult.Failed;
	}
});

export const registerBackgroundTask = async () => {
	try {
		// Register your task with a desired minimum interval (in seconds)
		await BackgroundFetch.setMinimumIntervalAsync(5); // Set your desired interval here (e.g., every 60 seconds)

		// Start the background task
		await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
			minimumInterval: 6, // Same as the interval set above
			stopOnTerminate: false, // Continue running the task even if the app is terminated
			startOnBoot: true, // Start the task when the device boots up
		});
		console.log("--- background task registered --");
	} catch (err) {
		console.log("-- task register failed --", err);
	}
};

export const unregisterBackgroundTask = async () => {
	// Stop the background task
	await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
	console.log("--- unregistering--");
};
