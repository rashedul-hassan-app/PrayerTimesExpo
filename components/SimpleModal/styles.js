import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
	},
	modalContent: {
		width: "100%",
		maxHeight: "80%", // This ensures the modal doesn't exceed 80% height
		padding: 20,
		backgroundColor: "white",
		borderRadius: 10,
		overflow: "scroll", // Makes content scrollable if it exceeds modal size
		bottom: 0,
	},
	heroIcon: {
		alignSelf: "center",
		marginBottom: 20,
	},
	header: {
		fontWeight: "bold",
		fontSize: 20,
		marginVertical: 32,
		textAlign: "center",
	},
	closeButton: {
		position: "absolute",
		top: 10,
		right: 10,
		color: "rgb(0,0,0)",
		fontWeight: "bold",
		padding: 8,
	},

	headerText: {
		fontWeight: "bold",
		fontSize: 16,
		color: "#000",
	},

	subscribeButtonContainer: {
		display: "flex",
		width: "100%",
		minHeight: 180,
		flexDirection: "row",
		justifyContent: "center",
		gap: 2,
		marginBottom: 12,
	},
});

export default styles;
