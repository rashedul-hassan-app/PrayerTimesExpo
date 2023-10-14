import { StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
import { Dimensions, Platform } from "react-native";
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
		marginTop: -64,
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
		justifyContent: "center",
		alignItems: "flex-start",
		width: "100%", // take full width of the card
	},
	cardTextTitle: {
		fontSize: 24,
		marginVertical: 8,
		color: "white",
		zIndex: 10,
		fontWeight: "bold",
	},
	nextPrayer: {
		fontSize: 18,
		marginVertical: 2,
		color: themeColors.bgLight,
	},
	plusButton: {
		position: "absolute",
		right: 10,
		bottom: 10,
	},
	countdown: {
		fontSize: 40,
		marginVertical: 2,
		color: themeColors.bgLight,
		fontWeight: "bold",
	},
});
