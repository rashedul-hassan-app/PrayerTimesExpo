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
import {
	Ionicons,
	FontAwesome,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { getTodaysDatePatternAsString } from "../../utils/formatPrayerTime";
import { useEffect, useState } from "react";
import {
	loadFromLocalStorageUsingKey,
	saveToLocalStorage,
} from "../../data/dataManager";

const TopHeader = ({ onModalClick, is24h, on24hClick }) => {
	const [is24hours, setIs24hours] = useState(is24h);

	return (
		<View style={styles.avatar_bell_icon}>
			<TouchableOpacity onPress={onModalClick}>
				<MaterialCommunityIcons
					name="crown-circle-outline"
					size={42}
					color="black"
				/>
			</TouchableOpacity>

			<View style={styles.location_pin}>
				<FontAwesome5 name="calendar-day" size={22} color="black" />
				<Text style={styles.title_text}>
					{getTodaysDatePatternAsString()}
				</Text>
			</View>
			<TouchableOpacity onPress={on24hClick}>
				<MaterialCommunityIcons
					name="hours-24"
					size={36}
					color="black"
				/>
			</TouchableOpacity>
		</View>
	);
};

export default TopHeader;
