import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import {
	getAllNotificationSetupAlready,
	schedulePrayerTimeNotifications,
	clearAllNotifications,
} from "../utils/handle-local-notification";
import { prayerTimesEnum } from "../data/prayerTimesEnum";
import { prayerTimes } from "../data/prayerTimes";
import { prayerTimes365 } from "../data/prayerTimes365";
import * as Notifications from "expo-notifications";
import {
	formatPrayerTimeToAMPM,
	getTodaysDatePatternLikeMM_DD,
	getTodaysDatePatternAsString,
} from "../utils/formatPrayerTime";
import { getNextXDaysOfPrayerTimes } from "../utils/getPrayerTimes";

// Configure how notifications should be handled when the app is in the foreground
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

const HomeScreen = () => {
	useEffect(() => {
		const fetchData = async () => {
			await clearAllNotifications(); // Wait for clearAllNotifications to finish
			schedulePrayerTimeNotifications(getNextXDaysOfPrayerTimes(3)); // Call schedulePrayerTimeNotifications after clearAllNotifications is done
		};

		fetchData();
	}, []);

	const [scheduledNotifications, setScheduledNotifications] = useState([]);

	const fetchScheduledNotifications = async () => {
		try {
			const notifications =
				await Notifications.getAllScheduledNotificationsAsync();
			setScheduledNotifications(notifications);
			console.log("Scheduled Notifications:", notifications);
		} catch (error) {
			console.error("Error fetching scheduled notifications:", error);
		}
	};

	const todayKey = getTodaysDatePatternLikeMM_DD();
	const todaysPrayerTimes = (prayerTimes365[todayKey] || []).map(
		formatPrayerTimeToAMPM
	);
	console.log("todays prayer time");
	console.log(getNextXDaysOfPrayerTimes(3));

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Text style={{ fontSize: 24, marginBottom: 20 }}>
				Today's Prayer Times
			</Text>
			<Text style={{ fontSize: 20, marginBottom: 20 }}>
				{getTodaysDatePatternAsString()}
			</Text>
			<FlatList
				data={todaysPrayerTimes}
				keyExtractor={(item, index) => String(index)}
				renderItem={({ item, index }) => (
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>
						<Text>{Object.keys(prayerTimesEnum)[index]}</Text>
						<Text>{item}</Text>
					</View>
				)}
			/>
			<Button
				title="See scheduled Notification Logs"
				onPress={fetchScheduledNotifications}
			/>
		</View>
	);
};

export default HomeScreen;
