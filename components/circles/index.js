import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Dimensions,
	Platform,
	FlatList,
} from "react-native";
import React from "react";
import { styles } from "./styles";

import {
	Feather,
	Ionicons,
	FontAwesome,
	FontAwesome5,
} from "@expo/vector-icons";
import { prayerIcons } from "../../constants";
import { formatPrayerTimeTo24H } from "../../utils/formatPrayerTime";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function Circles({
	prayerName,
	prayerTime,
	isActive,
	is24h,
	nextPrayerIsTomorrow,
}) {
	// override active state if next prayer is tomorrow
	if (nextPrayerIsTomorrow) {
		isActive = false;
	}

	return (
		<View
			style={[
				styles.nextPrayerContainer,
				isActive ? styles.active : null,
				nextPrayerIsTomorrow ? styles.fade : null,
			]}
		>
			<Text style={styles.nextPrayerName}>{prayerName}</Text>
			<View style={styles.borderLine}></View>
			<Text style={styles.nextPrayerTime}>
				{is24h
					? formatPrayerTimeTo24H(prayerTime)
					: prayerTime.split(" ")[0]}
			</Text>
			<View style={[styles.amPm, is24h ? styles.hide : null]}>
				<Text style={styles.amPmText}>
					{prayerTime.split(" ")[1].toUpperCase()}
				</Text>
			</View>
		</View>
	);
}
