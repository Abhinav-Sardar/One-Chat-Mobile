import { NavigationContainer } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import { DrawerParamList, RootStackParamList } from "./constants/Types";

import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CreateRoom from "./screens/CreateRoom";
import JoinRoom from "./screens/JoinRoom";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { fontConfig, vh, vw } from "./constants/Constants";
import { SideBar } from "./constants/Components";
import { AccentColorProvider } from "./constants/Context";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const DrawerNavigator: FC<
  NativeStackScreenProps<RootStackParamList, "DrawerList">
> = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <SideBar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#bd14ca",
        drawerStatusBarAnimation: "fade",
        drawerPosition: "left",
        drawerActiveTintColor: "#fff",
        drawerInactiveBackgroundColor: "#fff",
        drawerInactiveTintColor: "gray",
        drawerLabelStyle: {
          fontFamily: "montserrat",
          fontSize: 5 * vw,
        },
        drawerItemStyle: {
          borderRadius: 10,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Create"
        component={CreateRoom}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="plus" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Join"
        component={JoinRoom}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbox-sharp" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
const App: FC<NativeStackScreenProps<RootStackParamList, "Chat">> = () => {
  const [fontsLoaded] = useFonts(fontConfig);
  if (fontsLoaded) {
    return (
      <AccentColorProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="DrawerList"
                component={DrawerNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen component={ChatScreen} name={"Chat"} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </AccentColorProvider>
    );
  } else {
    return <AppLoading />;
  }
};

export default App;
