// List item mostly used within the Modal sheet
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const SubscribeButtons = ({ subType, icon, price, subtitle }) => {
	const isGreen = subtitle.toLowerCase() === "one time";
	const isActive = subtitle.toLowerCase() === "monthly";
	const isBlue = subtitle.toLowerCase() === "yearly";

	return (
		<View
			style={[
				styles.container,
				isGreen ? styles.greenBg : null,
				isBlue ? styles.blueBg : null,
				isActive ? styles.orangeBg : null,
			]}
		>
			{isActive && (
				<View style={styles.recommendedBox}>
					<Text style={styles.recommendedText}>Popular</Text>
				</View>
			)}
			<Text style={styles.subType}>{subType}</Text>
			<Text style={styles.icon}>{icon}</Text>
			<Text style={styles.price}>{price}</Text>
			<Text style={styles.subtitle}>{subtitle}</Text>

			<TouchableOpacity
				style={styles.buynowButton}
				onPress={() => console.log("Subscribe button pressed")}
			>
				<Text style={styles.buynowButtonText}>BUY</Text>
			</TouchableOpacity>
		</View>
	);
};
export default SubscribeButtons;
