import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const SeparatorLine = ({ text }) => {
	return (
		<View style={styles.separatorContainer}>
			<View style={styles.separatorLine} />
			<View style={styles.separatorTextContainer}>
				<Text style={styles.separatorText}>{text}</Text>
			</View>
			<View style={styles.separatorLine} />
		</View>
	);
};

export default SeparatorLine;
