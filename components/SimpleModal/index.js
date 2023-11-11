// SimpleModal.js
import React from "react";
import { View, Modal, TouchableOpacity, Text, Button } from "react-native";
import styles from "./styles";
import ListItem from "../ListItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SubscribeButtons from "../subscribeButtons";
import SeparatorLine from "../SeparatorLine";

const SimpleModal = ({ isVisible, onClose }) => {
	const handleBackdropPress = () => {
		onClose(); // Calls the function to close the modal
	};

	const handleModalContentPress = (e) => {
		e.stopPropagation(); // Prevents the backdrop's onPress from being triggered
	};
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}
		>
			<TouchableOpacity
				style={styles.backdrop}
				activeOpacity={1}
				onPress={handleBackdropPress}
			>
				<View
					style={styles.modalContent}
					onStartShouldSetResponder={() => true} // This is necessary to stop propagation
					onResponderTerminationRequest={() => false} // Prevents responder release on new touch
					onPress={handleModalContentPress}
				>
					<View style={styles.closeButton}>
						<AntDesign
							onPress={onClose}
							name="close"
							size={24}
							color="black"
						/>
					</View>
					<Text style={styles.header}>Become a Premium user</Text>
					{/* <View style={styles.iconContainer}> */}
					<MaterialCommunityIcons
						name="crown-circle-outline"
						size={142}
						color="green"
						style={styles.heroIcon}
					/>
					{/* </View> */}
					<ListItem text="Cool visual Themes" />
					<ListItem text="Ad-free experience" />
					<ListItem text="Supporting the community" />
					<ListItem text="Cover development costs" />

					<SeparatorLine text={"SELECT PLAN"} />

					<View style={styles.subscribeButtonContainer}>
						<SubscribeButtons
							subType={"Bronze"}
							price={"0.99"}
							subtitle={"One time"}
						/>
						<SubscribeButtons
							subType={"Diamond"}
							price={"2.99"}
							subtitle={"Monthly"}
						/>
						<SubscribeButtons
							subType={"Platinum"}
							price={"49.99"}
							subtitle={"Yearly"}
						/>
					</View>
				</View>
			</TouchableOpacity>
		</Modal>
	);
};

export default SimpleModal;
