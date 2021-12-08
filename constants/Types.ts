import { NavigatorScreenParams } from "@react-navigation/native";
import React from "react";
import { Share, StyleProp, TextStyle, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
export type DrawerParamList = {
	Home: undefined;
	Create: undefined;
	Join?: {
		roomName: string;
	};
};
export type ChatUser = {
	displayName: string;
	id: string;
	profileSvg: string;
	isHost: string;
};
export type RootStackParamList = {
	Chat: { isPrivate: boolean | "Join"; user: User };
	DrawerList: NavigatorScreenParams<DrawerParamList>;
};

export type room = {
	name: string;
	members: ChatUser[];
	isPrivate: boolean;
	membersLength?: number;
};

export type theme = {
	type: "light" | "dark";
	hasOverRidden: boolean;
};
export interface HeaderProps {
	routeName: string;
	canGoBack: () => boolean;
	goBack: () => void;
	toggleDrawer: () => void;
}

export interface OneButtonProps {
	viewStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	Icon?: React.ComponentType<any>;

	onPress?: () => void;
}
export interface BottomSheetProps {
	title: string;
	initialSnapPoint: number;
	visible: boolean;
	onClose: () => void;
}

export interface User {
	name: string;
	roomName: string;
	avatarSvg: string;
}
