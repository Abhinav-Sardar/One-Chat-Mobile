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
	FlatList,
	Modal,
	VirtualizedList,
	ToastAndroid,
	ActivityIndicator,
} from "react-native";
import { AccentText, BottomSheet, OneButton } from "../constants/Components";
import io from "socket.io-client";
import { CreateRoomStyles } from "../styles/CreateRoom.styled";
import { SvgXml } from "react-native-svg";
import { useAccentColor, useTheme } from "../constants/Context";
import {
	avatars,
	getRandomKey,
	MAX_BOTTOM_SHEET_HEIGHT,
	TransitionConfig,
	validateNameAndRoomnName,
	vh,
	vw,
} from "../constants/Constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";

const CreateRoom: FC = () => {
	const [name, setName] = useState<string>("");
	const [roomName, setRoomName] = useState<string>("");
	const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
	const theme = useTheme()[0];
	const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
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
					<View style={CreateRoomStyles.avatar}>
						<SvgXml xml={currentAvatar ? currentAvatar : null} />
					</View>
					<OneButton
						onPress={() => {
							setIsSheetOpen(true);
						}}
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
					onPress={() => {}}
					viewStyle={{
						backgroundColor: accentColor,
						width: 46 * vw,
						height: 8 * vh,
						marginTop: 60,
					}}
					textStyle={{
						color: "white",
						fontSize: 18,
					}}
				>
					Create Room
				</OneButton>
			</View>

			<BottomSheet
				initialSnapPoint={20 * vh}
				title='Choose An Avatar'
				visible={isSheetOpen}
				onClose={() => {
					setIsSheetOpen(false);
				}}
			>
				<FlatList
					data={avatars}
					keyExtractor={(_, index) => index.toString()}
					contentContainerStyle={CreateRoomStyles.avatarsWrapperStyle}
					renderItem={({ item }) => {
						return (
							<Pressable
								onPress={() => {
									setCurrentAvatar(item);
									setIsSheetOpen(false);
								}}
								style={{
									...CreateRoomStyles.avatar,
									borderWidth: 2,
									borderColor:
										currentAvatar === item
											? accentColor
											: theme.type === "dark"
											? "#fff"
											: "#000",
								}}
							>
								<SvgXml xml={item} />
							</Pressable>
						);
					}}
					numColumns={4}
				/>
			</BottomSheet>
		</Pressable>
	);
};

export default CreateRoom;
