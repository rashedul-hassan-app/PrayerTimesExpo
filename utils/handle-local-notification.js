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

export const schedulePushNotification = async () => {
	await Notifications.scheduleNotificationAsync({
		identifier: "review",
		content: {
			title: "Your opinion is important to us!",
			subtitle: "It's been a while since you used the app.",
			body: "Please take a moment to leave a review.",
		},
		trigger: {
			seconds: 2,
		},
	});
};

export const registerForPushNotificationsAsync = async () => {
	let token;

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert("Must use physical device for Push Notifications");
	}

	return token;
};
