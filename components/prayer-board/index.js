import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput,
	FlatList,
	Dimensions,
	Platform,
} from "react-native";
import styles from "./styles";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { getTodaysDatePatternAsString } from "../../utils/formatPrayerTime";
import Circles from "../circles";
import { getPrayerName } from "../../utils/getPrayerTimes";

export default function PrayerBoard({ todaysPrayerTimes }) {
	return (
		<View style={styles.circlesContainer}>
			<Text style={{ fontSize: 20, marginBottom: 20 }}>
				{getTodaysDatePatternAsString()}
			</Text>
			{todaysPrayerTimes &&
				todaysPrayerTimes.map((item, index) => (
					<Circles
						key={index}
						prayerName={getPrayerName(index)}
						prayerTime={item}
					/>
				))}
		</View>
	);
}
