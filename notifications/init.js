import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export const initializeNotifications = async () => {
	// Request notification permissions
	const requestNotificationPermission = async () => {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);

		if (existingStatus !== "granted") {
			const { status } = await Permissions.askAsync(
				Permissions.NOTIFICATIONS
			);
			if (status !== "granted") {
				alert("You must allow notifications to receive them.");
				return;
			}
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
