import React, { FC, useState } from "react";
import { Appearance, Dimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "./Types";
import { useAccentColor } from "./Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView } from "@react-navigation/drawer";
export const vw = Dimensions.get("window").width / 100;
export const vh = Dimensions.get("window").height / 100;
export const screens = {
  home: "Home",
  chat: "Chat",
  create: "Create",
  join: "Join",
  customize: "Customize",
  publicRooms: "Public-Rooms",
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
