import React, { useEffect } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { schedulePrayerTimeNotifications } from "../utils/handle-local-notification";
import { prayerTimesEnum } from "../data/prayerTimesEnum";
import { prayerTimes } from "../data/prayerTimes";
import { prayerTimes365 } from "../data/prayerTimes365";
import * as Notifications from "expo-notifications";
import {
	getTodaysDatePatternLikeMM_DD,
	getTodaysDatePatternAsString,
	getNext64PrayerTimes,
} from "../utils/getNext64PrayerTimes";

// Configure how notifications should be handled when the app is in the foreground
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

// Helper function to format prayer time from H, MM, S to HH:MM AM/PM
function formatPrayerTime(time) {
	const [hours, minutes] = time.split(",").map(Number);
	const period = hours < 12 ? "AM" : "PM";
	const formattedHours = (((hours + 11) % 12) + 1)
		.toString()
		.padStart(2, "0");
	const formattedMinutes = minutes.toString().padStart(2, "0");
	return `${formattedHours}:${formattedMinutes} ${period}`;
}

const HomeScreen = () => {
	useEffect(() => {
		schedulePrayerTimeNotifications();
		console.log(Object.entries(prayerTimes));
	}, []);

	const todayKey = getTodaysDatePatternLikeMM_DD();
	const todaysPrayerTimes = (prayerTimes365[todayKey] || []).map(
		formatPrayerTime
	);
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
				title="Schedule Prayer Time Notifications"
				onPress={() => schedulePrayerTimeNotifications()}
			/>
		</View>
	);
};

export default HomeScreen;
