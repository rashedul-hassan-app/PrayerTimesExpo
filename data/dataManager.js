import AsyncStorage from "@react-native-async-storage/async-storage";
import { appDataPrayerTimes365 } from "./prayerTimes365";

import { firebaseConfig } from "../firebaseConfig"; // Import your Firebase configuration
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import "firebase/database";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getDatabase, ref, onValue, child, get } from "firebase/database";

export const VERSION = "version";
export const FIRST_TIME_APPUSE_VERSION_STRING = "0";
export const PRAYER_TIMES_KEY = "prayerTimes365";

/** This function reads data from Local storage and returns a JSON ds
 * On first App use, if a Version string is not found in the LS
 * - Initial App Data with 365 days of prayer time is saved to LS
 */
export const get365PrayerDataFromLS = async () => {
	const versionData = await loadFromLocalStorageUsingKey(VERSION);
	console.log(`Version data found = ${versionData}`);

	if (versionData != -1) {
		// we have found data from LS, handle them
		// Make a fetch call to Firebase to check if newer version of data available
		// If no new data available, return the current Local storage data
		// If new data available, update Version string with Firebase
		// And download new data, and update local storage with new data
		// And return this new data
		console.log("-- came to -1");
		const prayerData = await loadFromLocalStorageUsingKey(PRAYER_TIMES_KEY);
		console.log("======");
		// console.log(JSON.stringify(prayerData));
		return prayerData;
	} else {
		console.log("-- came to Else");
		// no previous data found, use App data to initialise the app for first time use
		await saveToLocalStorage(VERSION, FIRST_TIME_APPUSE_VERSION_STRING);
		await saveToLocalStorage(PRAYER_TIMES_KEY, appDataPrayerTimes365);
		return appDataPrayerTimes365;
	}
};

export const loadFromLocalStorageUsingKey = async (key) => {
	try {
		const storedData = await AsyncStorage.getItem(key);
		if (storedData) {
			return JSON.parse(storedData);
		} else {
			// Return -1 when no data is found
			return -1;
		}
	} catch (error) {
		console.error("Error loading version data:", error);
		return -1; // Handle errors by returning -1
	}
};

export const saveToLocalStorage = async (key, dataToSave) => {
	try {
		await AsyncStorage.setItem(key, JSON.stringify(dataToSave));
	} catch (error) {
		console.error(
			`Error saving data for ${key} to local storage failed with error:`,
			error
		);
	}
};

export const deleteFromLocalStorage = async () => {
	try {
		await AsyncStorage.clear();
		console.log("Local storage cleared successfully");
	} catch (error) {
		console.error("Error clearing local storage:", error);
	}
};

const app = initializeApp(firebaseConfig);

export const checkCurrentVersionNumberFromFirebase = async () => {
	const dbRef = ref(getDatabase(app));

	try {
		const snapshot = await get(child(dbRef, "version"));
		if (snapshot.exists()) {
			const data = snapshot.val();
			return data; // Return the data
		} else {
			console.log("No data available");
			return null;
		}
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const checkForNewDataUpdate = async () => {
	const firebaseVersion = await checkCurrentVersionNumberFromFirebase();
	console.log(`===== Firebase data ====`);
	console.log(firebaseVersion);

	const versionInLS = await loadFromLocalStorageUsingKey(VERSION);
	console.log(`LS v = ${versionInLS} FB v = ${firebaseVersion}`);
	if (firebaseVersion > versionInLS) {
		console.log("new update available");
	} else {
		console.log("No new update available");
	}
};
