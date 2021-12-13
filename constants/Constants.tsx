import React, { FC, useState } from "react";
import { Appearance, Dimensions, StatusBar, Text } from "react-native";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";
import { Easing } from "react-native-reanimated";
import { DrawerContentDataProps, room } from "./Types";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
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
  for (let i = 0; i < 40; i++) {
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
const GifFull =
  '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" data-tip="Close Gifs" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0L24 0 24 24 0 24z"></path><path d="M16 2l5 5v13.993c0 .556-.445 1.007-.993 1.007H3.993C3.445 22 3 21.545 3 21.008V2.992C3 2.444 3.447 2 3.999 2H16zm-3 8h-1v5h1v-5zm-2 0H9c-1.105 0-2 .895-2 2v1c0 1.105.895 2 2 2h1c.552 0 1-.448 1-1v-2H9v1h1v1H9c-.552 0-1-.448-1-1v-1c0-.552.448-1 1-1h2v-1zm6 0h-3v5h1v-2h2v-1h-2v-1h2v-1z"></path></g></svg>';
const GifOutlineXML =
  '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" data-tip="Open Gifs" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0L24 0 24 24 0 24z"></path><path d="M16 2l5 5v13.993c0 .556-.445 1.007-.993 1.007H3.993C3.445 22 3 21.545 3 21.008V2.992C3 2.444 3.447 2 3.999 2H16zm-1 2H5v16h14V8h-4V4zm-2 6v5h-1v-5h1zm-2 0v1H9c-.552 0-1 .448-1 1v1c0 .552.448 1 1 1h1v-1H9v-1h2v2c0 .552-.448 1-1 1H9c-1.105 0-2-.895-2-2v-1c0-1.105.895-2 2-2h2zm6 0v1h-2v1h2v1h-2v2h-1v-5h3z"></path></g></svg>';
export const DrawerContentData: DrawerContentDataProps[] = [
  {
    Icon: ({ color }) => (
      <FontAwesome5 name="user-alt" size={24} color={color} />
    ),
    displayName: "Users In Chat",
    field: "users",
  },
  {
    Icon: ({ color }) => <FontAwesome name="image" size={24} color={color} />,
    displayName: "Images",
    field: "images",
  },
  {
    Icon: ({ color }) => (
      <Ionicons name="md-share-social-outline" size={24} color={color} />
    ),
    displayName: "Share",
    field: "share",
  },
  {
    Icon: ({ color }) => (
      <SvgXml xml={GifOutlineXML} color={color} height={29} width={29} />
    ),
    displayName: "Gifs",
    field: "gifs",
  },
];
