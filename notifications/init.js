import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import * as Device from "expo-device";

export const initializeNotifications = async () => {
	// Request notification permissions
	const requestNotificationPermission = async () => {
		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				const { status } =
					await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				return;
			}
		} else {
			console.log("Must use physical device for Push Notifications");
		}
	};

	// Initialize notifications
	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldShowAlert: true,
			shouldPlaySound: false,
			shouldSetBadge: false,
		}),
	});

	// Get the device token (Expo Push Token) if needed
	const getToken = async () => {
		const { data: token } = await Notifications.getExpoPushTokenAsync();
		console.log("Expo Push Token:", token);
	};

	// Request notification permissions and get the token
	await requestNotificationPermission();
	await getToken();
};
