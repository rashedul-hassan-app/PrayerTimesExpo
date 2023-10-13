// we will be using this dummy data,
// don't worry, you can find this data in the git repo
// you can find the git repo link in the description ;)
export const themeColors = {
	// bgColor: opacity=> `rgba(145, 73, 0, ${opacity})`,
	// bgColor: opacity=> `rgba(65, 2, 0, ${opacity})`,
	bgColor: (opacity) => `rgba(112, 66, 20, ${opacity})`,
	bgLight: "#d4a574",
	bgDark: "#8c5319",
	text: "#3C2A21",
};

export const prayerIcons = {
	sehri: require("../assets/images/prayerIcons/sehri.png"),
	fajr: require("../assets/images/prayerIcons/fajr.png"),
	sunrise: require("../assets/images/prayerIcons/sunrise.png"),
	zuhr: require("../assets/images/prayerIcons/zuhr.png"),
	asr: require("../assets/images/prayerIcons/asr.png"),
	magrib: require("../assets/images/prayerIcons/magrib.png"),
	isha: require("../assets/images/prayerIcons/isha.png"),
};
export const categories = [
	{
		id: 1,
		title: "Cappuccino",
	},
	{
		id: 2,
		title: "Latte",
	},
	{
		id: 3,
		title: "Espresso",
	},
	{
		id: 4,
		title: "Mocha",
	},
	{
		id: 5,
		title: "Americano",
	},
];

export const coffeeItems = [
	{
		id: 1,
		name: "Black Coffee",
		price: "25.50",
		volume: "116 ml",
		stars: "4.6",
		image: require("../assets/images/coffee1.png"),
		desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
	},

	{
		id: 2,
		name: "Cappuccino",
		price: "15.50",
		volume: "110 ml",
		stars: "4.3",
		image: require("../assets/images/coffee2.png"),
		desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
	},

	{
		id: 3,
		name: "Espresso",
		price: "30.00",
		volume: "100 ml",
		stars: "4.0",
		image: require("../assets/images/coffee1.png"),
		desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
	},

	{
		id: 4,
		name: "Latte",
		price: "10.30",
		volume: "80 ml",
		stars: "3.5",
		image: require("../assets/images/coffee2.png"),
		desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
	},

	{
		id: 5,
		name: "Mocha",
		price: "23.10",
		volume: "120 ml",
		stars: "4.7",
		image: require("../assets/images/coffee1.png"),
		desc: "The taste of coffee can vary depending on factors such as the type of beans, roast level, brewing method, and the addition of any flavors or sweeteners.",
	},
];