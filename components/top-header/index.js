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
import { useEffect, useState } from "react";
import {
	loadFromLocalStorageUsingKey,
	saveToLocalStorage,
} from "../../data/dataManager";

const TopHeader = ({ is24h, onClick }) => {
	const [is24hours, setIs24hours] = useState(is24h);

	return (
		<View style={styles.avatar_bell_icon}>
			<Ionicons name="person-circle-outline" size={42} color="black" />
			<View style={styles.location_pin}>
				<FontAwesome5 name="calendar-day" size={22} color="black" />
				<Text style={styles.title_text}>
					{getTodaysDatePatternAsString()}
				</Text>
			</View>
			<TouchableOpacity onPress={onClick}>
				<FontAwesome
					name={is24hours ? "bell" : "bell-o"}
					size={26}
					color="black"
				/>
			</TouchableOpacity>
		</View>
	);
};

export default TopHeader;
