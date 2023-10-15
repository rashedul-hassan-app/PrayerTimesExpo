import { StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
import { Dimensions, Platform } from "react-native";
const ios = Platform.OS == "ios";
import { themeColors } from "../../constants";

export const styles = StyleSheet.create({
	cardContainer: {
		width: "60%", // Adjust width as required
		height: "90%", // Adjust height as required
		backgroundColor: themeColors.bgDark,
		borderRadius: 32,
		overflow: "visible",
		alignItems: "center",
		padding: 15,
		paddingHorizontal: 25,

		position: "relative",

		shadowColor: themeColors.bgDark,
		shadowRadius: 25,
		shadowOffset: { width: 0, height: 40 },
		shadowOpacity: 0.6,
	},
	cardImageContainer: {
		marginTop: "-40%",
		marginBottom: 4,
		shadowColor: "black",
		shadowRadius: 30,
		shadowOffset: { width: 0, height: 40 },
		shadowOpacity: 0.8,
	},
	cardImage: {
		width: 120, // Adjust width as required
		height: 120, // Adjust height as required
	},
	textContainer: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "flex-start",
		width: "100%",
		// height: "75%",
		// gap: 16,
		marginTop: 4,
		marginBottom: 4,
		// backgroundColor: "red",
		// marginVertical: 8,
	},
	cardTextTitle: {
		fontSize: 22,
		marginBottom: 8,
		color: "rgba(255, 255, 255, 0.9)",
		zIndex: 10,
		fontWeight: "bold",
	},
	nextPrayerContainer: {
		backgroundColor: "rgba(255,255,255,0.2)",
		borderRadius: "50%",
		paddingHorizontal: 8,
		padding: 5,
		marginVertical: 1,
		borderColor: "white",

		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
	},
	nextPrayer: {
		fontSize: 24,
		marginVertical: 2,
		color: "rgba(255,255,255,0.9)",
		fontWeight: "bold",
		paddingHorizontal: 16,
		paddingVertical: 4,
	},
	bellContainer: {
		padding: 10,
		backgroundColor: themeColors.bgDark,
		// backgroundColor: "red",
		borderRadius: "50%",
		marginRight: 16,
	},
	plusButton: {
		position: "absolute",
		right: 10,
		bottom: 10,
	},
	countdown: {
		fontSize: 40,
		marginVertical: 2,
		color: "white",
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
		width: "100%",
		letterSpacing: 2,

		...Platform.select({
			ios: {
				shadowColor: "#000",
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.5,
				shadowRadius: 2,
			},
			android: {
				elevation: 3,
			},
		}),
	},
});
