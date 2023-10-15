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

import { FontAwesome } from "@expo/vector-icons";
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
				nextPrayerCountdown.minutes +
				":" +
				nextPrayerCountdown.seconds +
				"s"
			);
		} else {
			return nextPrayerCountdown.seconds + " seconds";
		}
	}
};

export default function CoffeeCard({ item, next, countdown, isActive }) {
	const BELL_SIZE = 25;

	return (
		<View style={styles.cardContainer}>
			<View style={styles.cardImageContainer}>
				<Image source={item.image} style={styles.cardImage} />
			</View>

			<View style={styles.textContainer}>
				<Text style={styles.cardTextTitle}>Next in</Text>
				{countdown ? (
					<Text style={styles.countdown}>
						{getCountdownParts(countdown)}
					</Text>
				) : (
					<Text>{"Loading ..."}</Text>
				)}

				<View style={styles.nextPrayerContainer}>
					<Text style={styles.nextPrayer}>{next}</Text>
					<TouchableOpacity style={styles.bellContainer}>
						{isActive ? (
							<FontAwesome
								name="bell-o"
								size={BELL_SIZE}
								color="white"
							/>
						) : (
							<FontAwesome
								name="bell-slash"
								size={BELL_SIZE}
								color="white"
							/>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
