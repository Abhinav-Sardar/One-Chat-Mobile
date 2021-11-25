import React, { FC, useState } from "react";
import { Appearance, Dimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "./Types";
import { useAccentColor } from "./Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView } from "@react-navigation/drawer";

export const OneChatLogoXML = `
<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M128 464v-80H56a24 24 0 01-24-24V72a24 24 0 0124-24h400a24 24 0 0124 24v288a24 24 0 01-24 24H24y5.74zM456 80z"></path></svg>`;
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
export const fontConfig = {
  poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  raleway: require("../assets/fonts/Raleway-Regular.ttf"),
  quicksand: require("../assets/fonts/Quicksand-Regular.ttf"),
  robboto: require("../assets/fonts/Roboto-Regular.ttf"),
  montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
};
