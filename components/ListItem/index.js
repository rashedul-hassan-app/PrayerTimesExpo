// List item mostly used within the Modal sheet
import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const ListItem = ({ icon, text, size = 24 }) => {
	return (
		<View style={styles.container}>
			<AntDesign name="checkcircleo" size={size} color="green" />
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};

export default ListItem;
