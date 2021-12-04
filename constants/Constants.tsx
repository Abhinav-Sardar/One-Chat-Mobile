import React, { FC, useState } from "react";
import { Appearance, Dimensions, StatusBar, Text } from "react-native";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";
export const vw = Dimensions.get("window").width / 100;
export const vh = Dimensions.get("window").height / 100;
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
export const getAvatars = () => {
  let avatars: string[] = [];
  for (let i = 0; i < 10; i++) {
    const avatar = createAvatar(style);
    avatars.push(avatar);
  }
  return avatars;
};

export function validateNameAndRoomnName(
  name: string,
  roomName: string
): boolean | string {
  if (!name || !roomName.trim()) {
    return "Invalid Name!";
  } else if (name.length > 20) {
    return "Name is too long!";
  } else if (!roomName || !roomName.trim()) {
    return "Invalid Room Name!";
  } else if (roomName.length > 20) {
    return "Room Name is too long!";
  } else {
    return true;
  }
}

export const MAX_BOTTOM_SHEET_HEIGHT: number =
  100 * vh -
  (StatusBar.currentHeight ? StatusBar.currentHeight : 7 * vh) +
  5 * vh;

export const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};
