import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		position: "relative",
		backgroundColor: "white",
	},
	container: {
		flex: 1,
	},
	text: {
		fontSize: 16,
		color: "blue",
	},
	premium_top_bg: {
		position: "absolute",
		width: "100%",
		top: 5,
		opacity: 10,
		height: 220,
	},
	avatar_bell_icon: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginHorizontal: 12,
		padding: 4,
	},
	location_pin: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
	title_text: {
		fontSize: 20,
	},
	carousel_container: {
		marginTop: 16,
		paddingTop: 2,
	},
	carousel: {
		overflow: "visible",
	},
	slide_style: {
		alignItems: "center",
	},
	prayerCardContainer: {
		flex: 1,
		// display: "flex",
		// flex: "flex-end",
		flexDirection: "column",
		gap: 20,
		justifyContent: "flex-end", // push content towards the bottom
		alignItems: "center", // center content horizontally
		marginTop: 48,
		marginBottom: "10%", // adjust this value if you need more/less space from the bottom
		// backgroundColor: "red",
		overflow: "visible",
	},
	circlesContainer: {
		marginTop: 32,
		flex: 1,
		// flexBasis: "auto",
		flexWrap: "wrap",
		justifyContent: "center",
		// alignItems: "center",
		flexDirection: "row",
		gap: 10,
		// backgroundColor: "red",
	},
});

export default styles;
