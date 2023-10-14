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
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Carousel from "react-native-reanimated-carousel";
// import {
// 	BellIcon,
// 	MapPinIcon,
// 	MagnifyingGlassIcon,
// } from "@heroicons/react/outline";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

// import { themeColors } from "../theme";
// import { categories, coffeeItems } from "../constants";
import CoffeeCard from "../components/coffee-card";
import Circles from "../components/circles";
import styles from "./styles";
import { coffeeItems } from "../constants";
import {
	getNextXDaysOfPrayerTimes,
	getPrayerName,
	getTodaysPrayerTimes,
} from "../utils/getPrayerTimes";
import { get365PrayerDataFromLS } from "../data/dataManager";
import { getTodaysDatePatternAsString } from "../utils/formatPrayerTime";

const PremiumScreen = () => {
	const [todaysPrayerTimes, setTodaysPrayerTimes] = useState();
	const [prayerTimes365, setPrayerTimes365] = useState();

	const renderItem = ({ item, index }) => (
		<View style={styles.item}>
			<Text style={styles.text}>{item.title}</Text>
		</View>
	);

	useEffect(() => {
		async function fetchData() {
			const prayerTimes365 = await get365PrayerDataFromLS();
			setPrayerTimes365(prayerTimes365);

			const timesReceived = getTodaysPrayerTimes(prayerTimes365);
			setTodaysPrayerTimes(timesReceived);
			console.log(timesReceived);
		}

		fetchData();
	}, []);

	return (
		<View style={styles.screen}>
			<StatusBar />
			<Image
				source={require("../assets/images/premium-bg-top.jpg")}
				style={styles.premium_top_bg}
			/>
			<SafeAreaView style={styles.container}>
				<View style={styles.avatar_bell_icon}>
					<Ionicons
						name="person-circle-outline"
						size={42}
						color="black"
					/>
					<View style={styles.location_pin}>
						<FontAwesome5
							name="map-marker-alt"
							size={22}
							color="black"
						/>
						<Text style={styles.title_text}>Watford, UK</Text>
					</View>
					<FontAwesome name="bell-o" size={26} color="black" />
				</View>
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
				{/* Big card */}
			</SafeAreaView>
			<View style={styles.prayerCardContainer}>
				<CoffeeCard item={coffeeItems[0]} />
			</View>
		</View>
	);
};

export default PremiumScreen;
