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

export default function CoffeeCard({ item }) {
	// const navigation = useNavigation();
	// item.image = prayerIcons.asr;
	return (
		<View style={styles.cardContainer}>
			<View style={styles.cardImageContainer}>
				<Image source={item.image} style={styles.cardImage} />
			</View>

			<View style={styles.textContainer}>
				<Text style={styles.cardTextTitle}>Coming up</Text>
				<Text style={styles.cardText}>Sehri</Text>
				<Text style={styles.cardText}>Sunrise</Text>
			</View>
		</View>
	);
}
