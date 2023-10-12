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

export default function Circles({ prayerName, prayerTime }) {
	// const icon = prayerIcons[item.toString().toLowerCase()];
	return (
		<View style={styles.container}>
			{/* <Image source={icon} style={styles.circleImage} /> */}
			<Text style={styles.text}>{prayerName}</Text>
			<Text style={styles.text}>{prayerTime}</Text>
		</View>
	);
}
