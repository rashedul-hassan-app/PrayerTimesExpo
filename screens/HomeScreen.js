import React, { useEffect, useState, useRef } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import {
	registerBackgroundTask,
	registerBackgroundTaskToUpdateData,
} from "../notifications/backgroundTask";

import { prayerTimesEnum } from "../data/prayerTimesEnum";
import { appDataPrayerTimes365 as fallBackPrayerTimes365 } from "../data/prayerTimes365";
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
import {
	PRAYER_TIMES_KEY,
	VERSION,
	applyNewUpdate,
	deleteFromLocalStorage,
	get365PrayerDataFromLS,
	loadFromLocalStorageUsingKey,
	saveToLocalStorage,
} from "../data/dataManager";

const HomeScreen = () => {
	const [nextPrayerName, setNextPrayerName] = useState("");
	const [nextPrayerTime, setNextPrayerTime] = useState("");
	const [nextPrayerCountdown, setNextPrayerCountdown] = useState({});
	const [prayerTimes365, setPrayerTimes365] = useState({});
	const [todaysPrayerTimes, setTodaysPrayerTimes] = useState([]);
	const [currentVersion, setCurrentVersion] = useState("x");
	const [isUpdated, setIsUpdated] = useState(false);
	const intervalRef = useRef(null); // Ref to store the current running interval

	const updatePrayerDetails = (data) => {
		if (intervalRef.current) {
			// If there's an existing interval, clear it
			clearInterval(intervalRef.current);
		}

		// Get the next prayer details and update the state
		const nextPrayerName = getNextPrayerName(data);
		const nextPrayerTime = getNextPrayerTime(data);
		setNextPrayerName(nextPrayerName);
		setNextPrayerTime(nextPrayerTime);

		// Set an interval to update the countdown every second
		intervalRef.current = setInterval(() => {
			const countdown = getTimeRemainingUntilTheNextPrayer(data);
			if (countdown) {
				setNextPrayerCountdown(countdown);
			}
		}, 1000);
	};

	const initAppDataFromLSAndUpdateCountdown = async () => {
		try {
			// Read data from local storage
			const data = await get365PrayerDataFromLS();
			const version = await loadFromLocalStorageUsingKey(VERSION);

			// Update the state with the data
			setPrayerTimes365(data);
			setCurrentVersion(version);

			// Use the extracted data to set next prayer details
			updatePrayerDetails(data);
		} catch (error) {
			console.error("Error fetching data:", error);
			console.log("** Saving Fallback data to Local storage... **");
			// Handle error and save fallback data if necessary
		}
	};

	useEffect(() => {
		// On component mount, initialize app data and setup countdown
		initAppDataFromLSAndUpdateCountdown();

		// Cleanup on component unmount: clear any running intervals
		return () => {
			if (intervalRef.current) {
				// On component unmount, clear the interval
				clearInterval(intervalRef.current);
			}
		};
	}, [currentVersion]);

	useEffect(() => {
		// Whenever the prayer times data changes, update the next prayer details
		if (prayerTimes365 && Object.keys(prayerTimes365).length) {
			updatePrayerDetails(prayerTimes365);
		}
	}, [prayerTimes365]);

	/* Foreground: Schedule Notifications */
	useEffect(() => {
		const fetchData = async () => {
			const DAYS_TO_SETUP_PRAYER_TIMES = 2;

			console.log(
				"Setting Foreground Notification for days " +
					DAYS_TO_SETUP_PRAYER_TIMES
			);
			// Call the scheduler
			await scheduleNotificationsOnPhone(DAYS_TO_SETUP_PRAYER_TIMES);
		};

		fetchData();
	}, [prayerTimes365]); // Added dependency

	/* Background Fetch: Schedule Notifications */
	useEffect(() => {
		registerBackgroundTask();
		registerBackgroundTaskToUpdateData();
	}, []);

	/* Notification Permission stuff */
	useEffect(() => {
		initializeNotifications();
	}, []);

	useEffect(() => {
		if (isUpdated) {
			console.log("The data has been updated");
			setIsUpdated(false); // Reset after using it.
		}
	}, [isUpdated]);

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

	const fetchDataFromLS = () => {
		const prayerData = get365PrayerDataFromLS();
		// console.log(prayerData);
	};

	const deleteDataFromLS = async () => {
		await deleteFromLocalStorage();
	};

	/* Update the UI with today's prayer times */
	useEffect(() => {
		const todayKey = getTodaysDatePatternLikeMM_DD();
		const newTodaysPrayerTimes = (prayerTimes365[todayKey] || []).map(
			formatPrayerTimeToAMPM
		);

		// Update the state with the new data
		setTodaysPrayerTimes(newTodaysPrayerTimes);
	}, [prayerTimes365, currentVersion]); // Run only when prayerTimes365 changes

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Text style={{ fontSize: 24, marginBottom: 20 }}>
				{currentVersion}
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
					: null}

				{nextPrayerCountdown.hours > 0 ||
				nextPrayerCountdown.minutes > 0
					? `${nextPrayerCountdown.minutes} : `
					: null}

				{`${nextPrayerCountdown.seconds}`}
			</Text>
			<Button
				title="Check for Update"
				onPress={async () => {
					const result = await applyNewUpdate();
					if (result) {
						await initAppDataFromLSAndUpdateCountdown();
						setIsUpdated(true);
					}
				}}
			/>
			<Button title="Check Local Storage" onPress={fetchDataFromLS} />
			<Button title="DELETE Local Storage" onPress={deleteDataFromLS} />
			<Button
				title="See scheduled Notification Logs"
				onPress={fetchScheduledNotifications}
			/>
		</View>
	);
};

export default HomeScreen;
