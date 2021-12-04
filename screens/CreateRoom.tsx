import React, { FC, useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	Button,
	TextInput,
	Keyboard,
	Share,
	Pressable,
	Alert,
	StyleSheet,
} from "react-native";
import { AccentText, BottomSheet, OneButton } from "../constants/Components";
import { CreateRoomStyles } from "../styles/CreateRoom.styled";
import { SvgXml } from "react-native-svg";
import { useAccentColor, useTheme } from "../constants/Context";
import {
	getAvatars,
	MAX_BOTTOM_SHEET_HEIGHT,
	SPRING_CONFIG,
	validateNameAndRoomnName,
	vh,
	vw,
} from "../constants/Constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSharedValue, withSpring } from "react-native-reanimated";
const avatars = getAvatars();
const CreateRoom: FC = () => {
	const [name, setName] = useState<string>("");
	const [roomName, setRoomName] = useState<string>("");
	const top = useSharedValue<number>(MAX_BOTTOM_SHEET_HEIGHT);
	const [currentAvatar, setCurrentAvatar] = useState<string>("");
	const theme = useTheme()[0];
	const hamdleSubmit = () => {
		const status = validateNameAndRoomnName(name, roomName);
		if (typeof status === "string") {
			console.log(status);
		} else {
		}
	};
	useEffect(() => {
		setCurrentAvatar(avatars[0]);
	}, []);
	const accentColor = useAccentColor()[0];
	return (
		<Pressable
			android_disableSound={true}
			onPress={Keyboard.dismiss}
			style={{
				height: "100%",
				width: "100%",
			}}
		>
			<View style={CreateRoomStyles.page}>
				<View style={CreateRoomStyles.field}>
					<AccentText style={CreateRoomStyles.label}>Name</AccentText>
					<TextInput
						placeholder='Enter Your Name...'
						value={name}
						onChangeText={setName}
						placeholderTextColor={"#a8a8a8"}
						autoCompleteType='username'
						returnKeyType='next'
						style={[
							CreateRoomStyles.input,
							{
								color: theme.type === "light" ? "#000" : "#fff",
								backgroundColor: theme.type === "dark" ? "#424242" : "#ededed",
							},
						]}
					/>
				</View>
				<View style={CreateRoomStyles.field}>
					<AccentText style={CreateRoomStyles.label}>Room Name</AccentText>
					<TextInput
						placeholder='Enter Room Name...'
						value={roomName}
						onChangeText={setRoomName}
						placeholderTextColor={"#a8a8a8"}
						returnKeyType='route'
						style={[
							CreateRoomStyles.input,
							{
								color: theme.type === "light" ? "#000" : "#fff",
								backgroundColor: theme.type === "dark" ? "#424242" : "#ededed",
							},
						]}
					/>
				</View>
				<View style={CreateRoomStyles.avatars}>
					<View
						style={[
							CreateRoomStyles.avatar,
							{
								borderColor: accentColor,
								marginBottom: 10,
							},
						]}
					>
						<SvgXml xml={currentAvatar ? currentAvatar : null} height={60} width={60} />
					</View>
					<OneButton
						onPress={() => {}}
						viewStyle={{
							backgroundColor: accentColor,
							width: 46 * vw,
							height: 6 * vh,
						}}
						textStyle={{
							color: "white",
							fontSize: 18,
						}}
						Icon={() => <FontAwesome5 name='user' size={20} color='white' />}
					>
						Choose Avatar
					</OneButton>
				</View>
				<OneButton
					onPress={() => {
						top.value = withSpring(9 * vh, SPRING_CONFIG);
						Keyboard.dismiss();
					}}
					viewStyle={{
						backgroundColor: accentColor,
						width: 46 * vw,
						height: 8 * vh,
						marginTop: 90,
					}}
					textStyle={{
						color: "white",
						fontSize: 18,
					}}
				>
					Create Room
				</OneButton>
			</View>

			<BottomSheet top={top} initialSnapPoint={9 * vh} title='Choose Avatar'>
				<View style={{ flex: 1 }}>
					<Text>Here come the avatars</Text>
				</View>
			</BottomSheet>
		</Pressable>
	);
};

export default CreateRoom;
