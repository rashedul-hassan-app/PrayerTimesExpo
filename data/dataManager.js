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

export const readDataFromFirebaseUsingKey = async (key) => {
	const dbRef = ref(getDatabase(app));

	try {
		const snapshot = await get(child(dbRef, key));
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

export const returnVersionIfNewUpdateAvailable = async () => {
	const firebaseVersion = await readDataFromFirebaseUsingKey(VERSION);
	console.log(`===== Firebase data ====`);
	console.log(firebaseVersion);
	console.log(typeof firebaseVersion);

	const versionInLS = await loadFromLocalStorageUsingKey(VERSION);
	console.log(`LS v = ${versionInLS} FB v = ${firebaseVersion}`);
	if (firebaseVersion > versionInLS) {
		console.log("new update available");
		return firebaseVersion;
	} else {
		console.log("No new update available");
		return 0;
	}
};

export const applyNewUpdate = async () => {
	const versionToApply = await returnVersionIfNewUpdateAvailable();
	console.log(`ver to apply ${versionToApply}`);
	if (versionToApply) {
		try {
			const fbData = await readDataFromFirebaseUsingKey(PRAYER_TIMES_KEY);
			await saveToLocalStorage(PRAYER_TIMES_KEY, fbData);
			await saveToLocalStorage(VERSION, versionToApply);
			console.warn("New update applied! Version = ", versionToApply);
			return true;
		} catch (err) {
			console.warn("Unable to apply new update to Local storage: ", err);
			return false;
		}
	} else {
		console.log(
			"** Bad update version. No new update applied to Local storage **"
		);
		return false;
	}
};
