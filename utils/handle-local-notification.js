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
import { prayerTimes } from "../data/prayerTimes"; // Import your prayer times data
export const clearAllNotifications = async () => {
	await Notifications.cancelAllScheduledNotificationsAsync();
};

export const useClearNotificationsOnOpen = () => {
	useEffect(() => {
		// Call the clearAllNotifications function when the component mounts
		clearAllNotifications();
		console.log("== All notifications cleared ==");
	}, []);
};

export const schedulePrayerTimeNotifications = async () => {
	// Iterate over the prayer times and schedule notifications for each
	for (const prayer in prayerTimes) {
		const time = prayerTimes[prayer];
		await Notifications.scheduleNotificationAsync({
			identifier: prayer,
			content: {
				title: `Prayer Time - ${prayer}`,
				body: `It's time for ${prayer} prayer!`,
			},
			trigger: {
				hour: parseInt(time.split(":")[0], 10),
				minute: parseInt(time.split(":")[1], 10),
				repeats: true, // Set to true to repeat the notification daily
			},
		});
	}
};

// export const registerForPushNotificationsAsync = async () => {
// 	let token;

// 	if (Platform.OS === "android") {
// 		await Notifications.setNotificationChannelAsync("default", {
// 			name: "default",
// 			importance: Notifications.AndroidImportance.MAX,
// 			vibrationPattern: [0, 250, 250, 250],
// 			lightColor: "#FF231F7C",
// 		});
// 	}

// 	if (Device.isDevice) {
// 		const { status: existingStatus } =
// 			await Notifications.getPermissionsAsync();
// 		let finalStatus = existingStatus;
// 		if (existingStatus !== "granted") {
// 			const { status } = await Notifications.requestPermissionsAsync();
// 			finalStatus = status;
// 		}
// 		if (finalStatus !== "granted") {
// 			alert("Failed to get push token for push notification!");
// 			return;
// 		}
// 		token = (await Notifications.getExpoPushTokenAsync()).data;
// 		console.log(token);
// 	} else {
// 		alert("Must use physical device for Push Notifications");
// 	}

// 	return token;
// };
