import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
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
import { COLORS, fontConfig, vh, vw } from "./constants/Constants";
import * as ScreenOrientation from "expo-screen-orientation";
import { Header, HOC, SideBar, Navigator } from "./constants/Components";
import {
  AccentColorProvider,
  useAccentColor,
  useTheme,
} from "./constants/Context";

import { withTiming } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const DrawerNavigator: FC<
  NativeStackScreenProps<RootStackParamList, "DrawerList">
> = () => {
  const accentColor = useAccentColor()[0];
  const theme = useTheme()[0];

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <SideBar {...props} />}
      backBehavior="initialRoute"
      screenOptions={{
        header: ({
          route: { name },
          navigation: { canGoBack, goBack, toggleDrawer },
        }) => (
          <Header
            routeName={name}
            canGoBack={canGoBack}
            goBack={goBack}
            toggleDrawer={toggleDrawer}
          />
        ),
        drawerActiveBackgroundColor: accentColor,
        drawerStatusBarAnimation: "fade",
        drawerPosition: "left",
        drawerActiveTintColor: "#fff",
        drawerInactiveBackgroundColor: "transparent",
        drawerInactiveTintColor: theme.type === "light" ? "gray" : "white",
        drawerLabelStyle: {
          fontFamily: "montserrat",
          fontSize: 20,
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
  async function setScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }
  useEffect(() => {
    setScreenOrientation();
  }, []);
  if (fontsLoaded) {
    return (
      <HOC>
        <Navigator>
          <Stack.Navigator
            screenOptions={{
              animation: "slide_from_bottom",
            }}
            initialRouteName="DrawerList"
          >
            <Stack.Screen
              name="DrawerList"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen component={ChatScreen} name={"Chat"} />
          </Stack.Navigator>
        </Navigator>
      </HOC>
    );
  } else {
    return <AppLoading />;
  }
};

export default App;
