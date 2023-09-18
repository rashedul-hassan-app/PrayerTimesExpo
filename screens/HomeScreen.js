import React from "react";
import { View, Text } from "react-native";
import * as Notifications from "expo-notifications";

const HomeScreen = () => {
	const prayerTimes = {
		fajr: "05:24",
		zuhr: "01:24",
		asr: "06:24",
		magrib: "07:24",
		isha: "09:24",
	};
	return (
		<View className="flex-1 p-5">
			<Text className="text-red-500">Fajr</Text>
			<Text>{prayerTimes.fajr}</Text>

			<Text>zuhr</Text>
			<Text>{prayerTimes.zuhr}</Text>

			<Text>asr</Text>
			<Text>{prayerTimes.asr}</Text>

			<Text>magrib</Text>
			<Text className="text-green-500">{prayerTimes.magrib}</Text>

			<Text>isha</Text>
			<Text>{prayerTimes.isha}</Text>
		</View>
	);
};

export default HomeScreen;
