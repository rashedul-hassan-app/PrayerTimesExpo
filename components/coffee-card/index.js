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
import { prayerIcons, themeColors } from "../../constants";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

const getCountdownParts = (nextPrayerCountdown) => {
	if (nextPrayerCountdown) {
		if (nextPrayerCountdown.hours > 0) {
			return (
				nextPrayerCountdown.hours +
				":" +
				nextPrayerCountdown.minutes +
				":" +
				nextPrayerCountdown.seconds
			);
		} else if (nextPrayerCountdown.minutes > 0) {
			return (
				nextPrayerCountdown.minutes + ":" + nextPrayerCountdown.seconds
			);
		} else {
			return nextPrayerCountdown.seconds;
		}
	}
};

export default function CoffeeCard({ item, next, countdown }) {
	return (
		<View style={styles.cardContainer}>
			<View style={styles.cardImageContainer}>
				<Image source={item.image} style={styles.cardImage} />
			</View>

			<View style={styles.textContainer}>
				<Text style={styles.cardTextTitle}>Next</Text>
				<Text style={styles.nextPrayer}>{next}</Text>
				{countdown ? (
					<Text style={styles.countdown}>
						{getCountdownParts(countdown)}
					</Text>
				) : (
					<Text>{"Loading ..."}</Text>
				)}
			</View>
		</View>
	);
}
