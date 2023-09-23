// This custom hook useLocalNotification manages the state of your push notifications.

// It sets up listeners for received notifications and responses to notifications.
// When a notification is received, it updates the notification state with the received
// notification data.

import React, { useState, useEffect, useRef } from "react";

import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../notifications/handle-local-notification";

export const useLocalNotification = () => {
	const [expoPushToken, setExpoPushToken] = useState("");
	const [notification, setNotification] = useState({});
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => {
			setExpoPushToken(token || "");
		});

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				setNotification(notification);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(
				(response) => {
					setNotification(response.notification);
				}
			);

		return () => {
			if (notificationListener.current?.remove) {
				notificationListener.current.remove();
			}
			if (responseListener.current?.remove) {
				responseListener.current.remove();
			}
		};
	}, []);

	return { expoPushToken, notification };
};
