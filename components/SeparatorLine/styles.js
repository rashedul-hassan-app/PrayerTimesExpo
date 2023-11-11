import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	separatorContainer: {
		marginTop: 24,
		marginBottom: 4,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	separatorLine: {
		flex: 1,
		height: 1,
		backgroundColor: "rgba(0,0,0,0.2)",
	},
	separatorTextContainer: {
		paddingHorizontal: 10, // Adjust as needed
		backgroundColor: "#FFF", // Match this with the background color of your app
	},
});

export default styles;
