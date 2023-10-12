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
	text: {
		color: themeColors.bgDark,
		fontWeight: 400,
		fontSize: 16,
	},
	circleImage: {
		// position: "absolute",
		width: 40,
		height: 40,
		// top: 20,
	},
});
