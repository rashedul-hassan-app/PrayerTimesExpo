import { useLocalNotification } from "../hooks/useLocalNotification";
import * as Notifications from "expo-notifications";
import { schedulePushNotification } from "../utils/handle-local-notification";
import { Button } from "react-native";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default HomeScreen = () => {
	useLocalNotification();
	const handleLocalPushNotification = async () => {
		await schedulePushNotification();
	};
	return (
		<Button
			title="Press to schedule a notification"
			onPress={handleLocalPushNotification}
		/>
	);
};
