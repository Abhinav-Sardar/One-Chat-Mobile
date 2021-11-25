import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { vw } from "./Constants";
// @ts-ignore
export const SideBar = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={drawerStyles.header}>
          <Text style={drawerStyles.headerTitle}>One-Chat</Text>
          <Ionicons name="chatbox-sharp" size={35} color={"#bd14ca"} />
        </View>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    </SafeAreaView>
  );
};
const drawerStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 8 * vw,
    color: "#bd14ca",
    fontFamily: "raleway",
    marginRight: 2 * vw,
  },
});
