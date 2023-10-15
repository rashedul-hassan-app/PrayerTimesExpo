import { StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
import { Dimensions, Platform } from "react-native";
import { themeColors } from "../../constants";

export const styles = StyleSheet.create({
	container: {
		borderRadius: 60,
		backgroundColor: themeColors.bgLight,
		// width: 70,
		width: "33%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "brown",

		shadowColor: "brown",
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 20 },
		shadowOpacity: 0.2,

		margin: 2,
	},
	prayerTime: {
		color: "white",
		fontWeight: "bold",
		fontSize: 20,
	},
	prayerName: {
		color: "brown",
		fontWeight: 800,
		fontSize: 18,
	},
	circleImage: {
		// position: "absolute",
		width: 40,
		height: 40,
		// top: 20,
	},
	nextPrayerContainer: {
		// backgroundColor: "rgba(255,255,255,0.2)",
		backgroundColor: themeColors.bgDark,
		opacity: 0.9,
		borderRadius: "10%",
		// paddingHorizontal: 12,
		padding: 5,
		// marginVertical: 3,
		borderColor: "white",

		display: "flex",
		flexDirection: "column",
		// justifyContent: "",
		alignItems: "center",
		flexWrap: "wrap",
		// width: "100%",

		shadowColor: "black",
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.4,
	},
	nextPrayerName: {
		fontSize: 15,
		marginVertical: 2,
		color: "rgba(255,255,255,0.9)",
		fontWeight: "bold",
		paddingHorizontal: 16,
		paddingVertical: 4,
	},
	nextPrayerTime: {
		fontSize: 23,
		marginVertical: 2,
		color: "rgba(255,255,255,0.9)",
		fontWeight: "bold",
		paddingHorizontal: 16,
		paddingVertical: 4,
		fontWeight: "bold",
	},
	borderLine: {
		height: 1,
		width: "33%",
		backgroundColor: "white",
		border: "1px solid rgba(255,255,255)",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	active: {
		opacity: 1,
		backgroundColor: themeColors.selected,

		shadowColor: themeColors.selected,
		shadowRadius: 15,
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.8,
	},
	amPm: {
		position: "absolute",
		top: "33%",
		right: 4,
	},
	amPmText: {
		fontSize: 18,
		color: "rgba(255,255,255,0.5)",
		fontWeight: "700",
	},
});
