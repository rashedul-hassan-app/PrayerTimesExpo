import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PremiumScreen from "../screens/PremiumScreen";
import { Dimensions, LogBox, Platform, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { themeColors } from "../constants";

import {
	AntDesign,
	Ionicons,
	MaterialIcons,
	FontAwesome5,
} from "@expo/vector-icons";
import BaseScreen from "../screens/BaseScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ios = Platform.OS == "ios";
LogBox.ignoreLogs([
	"Non-serializable values were found in the navigation state",
]);

export default function AppNavigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					contentStyle: { backgroundColor: "white" },
				}}
			>
				{/* <Stack.Screen
					name="HomeScreen"
					component={HomeScreen}
					options={{ headerShown: true }}
				/> */}
				<Stack.Screen
					name="PremiumScreen"
					component={HomeTabs}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const HomeTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarShowLabel: false,
				tabBarIcon: ({ focused }) => menuIcons(route, focused),
				tabBarStyle: {
					marginBottom: 20,
					height: 75,
					alignItems: "center",

					borderRadius: 100,
					marginHorizontal: 20,
					backgroundColor: themeColors.bgLight,
				},
				tabBarItemStyle: {
					marginTop: ios ? 10 : 0,
					// marginBottom: ios ? -20 : 0,

					display: "flex",
					// backgroundColor: "red",
					justifyContent: "center",
					alignItems: "center",
					alignContent: "center",
					height: 50,
				},
			})}
		>
			<Tab.Screen name="home" component={PremiumScreen} />
			<Tab.Screen name="favourite" component={HomeScreen} />
			<Tab.Screen name="cart" component={BaseScreen} />
		</Tab.Navigator>
	);
};

const menuIcons = (route, focused) => {
	let icon;
	const ICON_SIZE = 24;
	if (route.name === "home") {
		icon = focused ? (
			<AntDesign
				name="clockcircle"
				size={ICON_SIZE}
				color={themeColors.bgLight}
			/>
		) : (
			<AntDesign name="clockcircleo" size={ICON_SIZE} color={"white"} />
		);
	} else if (route.name === "favourite") {
		icon = focused ? (
			<MaterialIcons
				name="favorite"
				size={ICON_SIZE}
				color={themeColors.bgLight}
			/>
		) : (
			<MaterialIcons
				name="favorite-outline"
				size={ICON_SIZE}
				color={"white"}
			/>
		);
	} else if (route.name === "cart") {
		icon = focused ? (
			<FontAwesome5
				name="calendar-day"
				size={ICON_SIZE}
				color={themeColors.bgLight}
			/>
		) : (
			<FontAwesome5
				name="calendar-check"
				size={ICON_SIZE}
				color={"white"}
			/>
		);
	}

	let buttonStyle = focused ? styles.tabIconContainer : {};
	return (
		<View
			style={[buttonStyle, { backgroundColor: focused ? "white" : "" }]}
		>
			{icon}
		</View>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		marginBottom: 20,
		height: 195,
		alignItems: "center",
		borderRadius: 100,
		marginHorizontal: 20,
		backgroundColor: themeColors.bgLight,
	},
	tabBarItem: {
		marginTop: ios ? 30 : 0,
	},
	tabIconContainer: {
		// flex: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
		padding: 13,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	// Add more styles as needed
});
