import React, { FC, useState } from "react";
import { Appearance, Dimensions, StatusBar, Text } from "react-native";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";
import { Easing } from "react-native-reanimated";
import { room } from "./Types";
export const vw = Dimensions.get("window").width / 100;
export const vh = Dimensions.get("window").height / 100;
export const Alerts = {
	invalidName: "Invalid Name !",
	invalidRoomName: "Invalid Room Name !",
	NameTooLong: "Name Too long !",
	RoomNameTooLong: "Room Name too long !",
	RoomDoesntExist: "A Room with that Name doesn't exist !",
	RoomAlreadyExist: "A Room with that Name already exist !",
};
export const COLORS: { light: string; dark: string } = {
	light: "#fff",
	dark: "#000",
};
export const fontConfig = {
	poppins: require("../assets/fonts/Poppins-Regular.ttf"),
	raleway: require("../assets/fonts/Raleway-Regular.ttf"),
	quicksand: require("../assets/fonts/Quicksand-Regular.ttf"),
	robboto: require("../assets/fonts/Roboto-Regular.ttf"),
	montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
};
export const getRandomKey = (): string => {
	const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let key = "";
	for (let i = 0; i < 20; i++) {
		key += text.charAt(Math.floor(Math.random() * text.length));
	}
	return key;
};

export function validateNameAndRoomnName(
	name: string,
	roomName: string
): boolean | string {
	if (!name || !name.trim()) {
		return Alerts.invalidName;
	} else if (name.length > 20) {
		return Alerts.NameTooLong;
	} else if (!roomName || !roomName.trim()) {
		return Alerts.invalidRoomName;
	} else if (roomName.length > 20) {
		return Alerts.RoomNameTooLong;
	} else {
		return true;
	}
}

export const MAX_BOTTOM_SHEET_HEIGHT: number =
	100 * vh -
	(StatusBar.currentHeight ? StatusBar.currentHeight : 7 * vh) +
	5 * vh;

export const TransitionConfig = {
	duration: 700,
	easing: Easing.ease,
};

export function getAvatars(): string[] {
	let avartars: string[] = [];
	for (let i = 0; i < 32; i++) {
		const newAvatar = createAvatar(style, {
			height: 60,
			width: 60,
		});
		avartars.push(newAvatar);
	}
	return avartars;
}

export const serverName = "http://192.168.0.103:1919";
export const IsRoomThere: (rooms: room[], room: string) => boolean = (
	rooms,
	room
) => {
	const roomExists = rooms.find((r) => r.name === room);
	return Boolean(roomExists);
};
