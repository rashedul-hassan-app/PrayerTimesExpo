/*
    This file contains functions for scheduling push notifications and handling push notification 
    permissions.

    - schedulePushNotification schedules a local notification with a title, subtitle, and body 
    to appear X seconds after calling it.

    - registerForPushNotificationsAsync handles the setup of push notification permissions 
    and generates an Expo push token for your device.
*/

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import React, { useEffect } from "react";

export const getAllNotificationSetupAlready = async () => {
	console.log(await Notifications.getAllScheduleNotifications());
};

export const clearAllNotifications = async () => {
	await Notifications.cancelAllScheduledNotificationsAsync();
	console.log("== All notifications cleared ==");
};

const prayerNames = [
	"Sehri",
	"Fajr",
	"Sunrise",
	"Zuhr",
	"Asr",
	"Magrib",
	"Isha",
];

export const schedulePrayerTimeNotifications = async (prayerTimes) => {
	// Get the current year
	const currentYear = new Date().getFullYear();

	let count = 1;
	// Iterate over the prayer times for each day
	for (const date in prayerTimes) {
		const times = prayerTimes[date];
		const [month, day] = date.split("_").map(Number);

		if (!isValidDate(currentYear, month, day)) {
			console.warn(`Invalid date: ${currentYear}-${month}-${day}`);
			continue; // Skip invalid dates
		}

		for (let i = 0; i < times.length; i++) {
			const prayerTime = times[i];
			const [hour, minute, second] = prayerTime.split(",").map(Number);

			console.log(`-- Parsed in loop ${hour} ${minute} ${second}`);
			if (!isValidTime(hour, minute, second)) {
				console.warn(`Invalid time: ${hour}:${minute}:${second}`);
				continue; // Skip invalid times
			}

			const trigger = new Date(currentYear, month - 1, day, hour);
			trigger.setMinutes(minute);
			trigger.setSeconds(second);

			if (trigger < new Date(Date.now())) {
				continue;
			}

			console.log("--- received inside scheduler ---");
			// console.log(notificationTime);

			await Notifications.scheduleNotificationAsync({
				identifier: `${date}_${i}`, // Unique identifier for each notification
				content: {
					title: `Prayer Time - ${prayerNames[i]}`,
					body: `It's time for ${prayerNames[i]} prayer on ${date}!`,
				},
				// trigger: {
				// 	date: notificationTime,
				// 	repeats: false,
				// },
				trigger,
			});

			// Log the time notification was set for
			console.log(`${count++}--> ${trigger.toString()}`);
			if (count > 64) {
				break;
			}
		}
	}
};

function isValidDate(year, month, day) {
	return (
		!isNaN(year) &&
		!isNaN(month) &&
		!isNaN(day) &&
		month >= 1 &&
		month <= 12 &&
		day >= 1 &&
		day <= 31
	);
}

function isValidTime(hour, minute, second) {
	return (
		!isNaN(hour) &&
		!isNaN(minute) &&
		!isNaN(second) &&
		hour >= 0 &&
		hour <= 23 &&
		minute >= 0 &&
		minute <= 59 &&
		second >= 0 &&
		second <= 59
	);
}
