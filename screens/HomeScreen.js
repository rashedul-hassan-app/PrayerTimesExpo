import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { registerBackgroundTask } from "../notifications/backgroundTask";

import { prayerTimesEnum } from "../data/prayerTimesEnum";
import { prayerTimes365 } from "../data/prayerTimes365";
import * as Notifications from "expo-notifications";
import {
	formatPrayerTimeToAMPM,
	getTodaysDatePatternLikeMM_DD,
	getTodaysDatePatternAsString,
} from "../utils/formatPrayerTime";
import { getNextXDaysOfPrayerTimes } from "../utils/getPrayerTimes";
import { scheduleNotificationsOnPhone } from "../notifications/scheduler";
import { initializeNotifications } from "../notifications/init";

const HomeScreen = () => {
	/* Notification Permission stuff */
	useEffect(() => {
		initializeNotifications();
	}, []);

	/* Foreground: Schedule Notifications */
	useEffect(() => {
		const fetchData = async () => {
			const DAYS_TO_SETUP_PRAYER_TIMES = 2;
			const nextXDays = getNextXDaysOfPrayerTimes(
				DAYS_TO_SETUP_PRAYER_TIMES
			);
			console.log("--- inside FetchData -- x days data --");
			console.log(nextXDays);

			// Call the scheduler
			await scheduleNotificationsOnPhone(DAYS_TO_SETUP_PRAYER_TIMES);
		};

		fetchData();
	}, []);

	/* Background Fetch: Schedule Notifications */
	useEffect(() => {
		registerBackgroundTask();
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

	// Debug logs
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
