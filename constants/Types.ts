import { NavigatorScreenParams } from "@react-navigation/native";
import React, { FC } from "react";
import { PressableProps, Share, StyleProp, TextStyle, ViewStyle } from "react-native";
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
export type HeaderProps = {
	routeName: string;
	canGoBack: () => boolean;
	goBack: () => void;
	toggleDrawer: () => void;
};

export interface OneButtonProps extends PressableProps {
	viewStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	Icon?: FC;

	onPress: () => void;

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

export type fieldType = "images" | "gifs" | "share" | "users" | null;

export interface DrawerContentProps {
	onClose: () => void;
	onFieldSelected: (field: fieldType) => void
}

interface BaseMessage<T> {

	content: string,
	profilePic: string,
	accentColor: string,
	created_at: Date,
	author: string,
	className: 'Incoming' | 'Outgoing',
	id: string,
	type: T,
}
export interface TextMessage extends BaseMessage<'text'> { }
export interface ImageMessage extends BaseMessage<'image'> {
	caption: string,
}
export interface GifMessage extends BaseMessage<'gif'> {
	caption: string,
	preview_url: string,
}
export interface ReplyTextMessage extends BaseMessage<'reply_text'> { };
export interface ReplyImageMessage extends BaseMessage<'reply_image'> {
	caption: string,

};
export interface ReplyGifMessage extends BaseMessage<'reply_gif'> {
	caption: string,
	preview_url: string,
};

export type DrawerContentDataProps = {
	displayName: string;
	field: fieldType;
	Icon: (props: { color: string }) => JSX.Element;
}