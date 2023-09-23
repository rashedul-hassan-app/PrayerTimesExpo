import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { registerBackgroundTask } from "../notifications/backgroundTask";

import { prayerTimesEnum } from "../data/prayerTimesEnum";
import { prayerTimes365 } from "../data/prayerTimes365";
import * as Notifications from "expo-notifications";
import {
	formatPrayerTimeToAMPM,
	getTodaysDatePatternLikeMM_DD,
	getTodaysDatePatternAsString,
} from "../utils/formatPrayerTime";
import {
	getNextPrayerName,
	getNextPrayerTime,
	getTimeRemainingUntilTheNextPrayer,
	getNextXDaysOfPrayerTimes,
} from "../utils/getPrayerTimes";
import { scheduleNotificationsOnPhone } from "../notifications/scheduler";
import { initializeNotifications } from "../notifications/init";

const HomeScreen = () => {
	const [nextPrayerName, setNextPrayerName] = useState("");
	const [nextPrayerTime, setNextPrayerTime] = useState("");
	const [nextPrayerCountdown, setNextPrayerCountdown] = useState({});

	/* Init Prayer times for UI */
	// useEffect(() => {
	// 	setNextPrayerName(getNextPrayerName());
	// 	setNextPrayerTime(getNextPrayerTime());
	// 	setNextPrayerCountdown(getTimeRemainingUntilTheNextPrayer());
	// }, []);
	useEffect(() => {
		const updateCountdown = () => {
			// Calculate the countdown every second
			const countdown = getTimeRemainingUntilTheNextPrayer();
			if (countdown) {
				setNextPrayerCountdown(countdown);
			}
		};

		// Update the countdown every second
		const intervalId = setInterval(updateCountdown, 1000);

		// Initial data fetching
		setNextPrayerName(getNextPrayerName());
		setNextPrayerTime(getNextPrayerTime());

		// Cleanup the interval when the component unmounts
		return () => {
			clearInterval(intervalId);
		};
	}, [getNextPrayerName(), getNextPrayerTime()]);

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
			// console.log("--- inside FetchData -- x days data --");
			// console.log(nextXDays);

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
	// console.log("todays prayer time");
	// console.log(getNextXDaysOfPrayerTimes(3));

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
			<TouchableOpacity>
				<Text style={{ fontSize: 24, marginBottom: 20 }}>
					Next prayer: - {nextPrayerName}
				</Text>
			</TouchableOpacity>
			<Text style={{ fontSize: 24, marginBottom: 20 }}>
				{nextPrayerTime}
			</Text>
			<Text style={{ fontSize: 24, marginBottom: 20 }}>
				{nextPrayerCountdown.hours > 0
					? `${nextPrayerCountdown.hours} : `
					: ""}

				{nextPrayerCountdown.hours > 0 ||
				nextPrayerCountdown.minutes > 0
					? `${nextPrayerCountdown.minutes} : `
					: ""}

				{`${nextPrayerCountdown.seconds}`}
			</Text>
			<Button
				title="See scheduled Notification Logs"
				onPress={fetchScheduledNotifications}
			/>
		</View>
	);
};

export default HomeScreen;
