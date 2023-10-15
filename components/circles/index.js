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

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function Circles({ prayerName, prayerTime, isActive }) {
	// const icon = prayerIcons[item.toString().toLowerCase()];
	return (
		<View
			style={[
				styles.nextPrayerContainer,
				isActive ? styles.active : null,
			]}
		>
			<Text style={styles.nextPrayerName}>{prayerName}</Text>
			<View style={styles.borderLine}></View>
			<Text style={styles.nextPrayerTime}>
				{prayerTime.split(" ")[0].toUpperCase()}
			</Text>
			<View style={styles.amPm}>
				<Text style={styles.amPmText}>{prayerTime.split(" ")[1]}</Text>
			</View>
		</View>
	);
}
