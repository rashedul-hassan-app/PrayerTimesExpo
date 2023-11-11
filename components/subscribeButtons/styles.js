import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		paddingLeft: 16,
		borderWidth: 2,
		marginTop: 32,
		marginHorizontal: 4,
		padding: 8,
		borderRadius: 12,
		textAlign: "center",
		minWidth: "30%",
	},
	text: {
		fontWeight: "normal",
		marginLeft: 8,
		marginRight: 8,
		marginBottom: 8,
		fontSize: 20,
		textAlign: "center",
	},
	subType: {
		textAlign: "center",
		marginTop: 12,
	},
	price: {
		fontSize: 24,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 12,
		textAlign: "center",
	},
	orangeBg: {
		backgroundColor: "rgb(255 249 239)",
		borderColor: "orange",
	},
	greenBg: {
		backgroundColor: "rgb(224, 255, 222)",
		borderColor: "rgb(180, 219, 180)",
	},
	blueBg: {
		backgroundColor: "rgb(217, 239, 254)",
		borderColor: "rgb(153, 204, 255)",
	},
	recommendedBox: {
		position: "absolute",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		top: -18,
		backgroundColor: "rgb(254, 153, 0)",
		padding: 8,
		borderRadius: 12,
		alignSelf: "center",
		// marginHorizontal: 0,
	},
	recommendedText: {
		color: "white",
		fontSize: 12,
		textAlign: "center",
		fontWeight: "bold",
	},
	buynowButton: {
		display: "flex",
		flexDirection: "row",
		backgroundColor: "#4CAF50", // A nice green color
		paddingHorizontal: 24,
		paddingVertical: 10,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		marginTop: 12,
		marginBottom: 4,
		alignSelf: "center",
		backgroundColor: "rgba(0,0,0,0.7)",
	},
	buynowButtonText: {
		color: "white",
		fontSize: 12,
		fontWeight: "bold",
	},
});

export default styles;
