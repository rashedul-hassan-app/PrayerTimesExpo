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

export default function PrayerBoard({
	todaysPrayerTimes,
	nextPrayerName,
	is24h,
	nextPrayerIsTomorrow,
}) {
	return (
		<View style={styles.circlesContainer}>
			{todaysPrayerTimes &&
				todaysPrayerTimes.map((item, index) => (
					<Circles
						key={index}
						prayerName={getPrayerName(index)}
						prayerTime={item}
						isActive={nextPrayerName === getPrayerName(index)}
						is24h={is24h}
						nextPrayerIsTomorrow={nextPrayerIsTomorrow}
					/>
				))}
		</View>
	);
}
