import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { FC, useEffect, useState } from "react";
import Storage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  View,
  Text,
  Switch,
  StyleProp,
  TextStyle,
  ViewStyle,
  StatusBar,
  Pressable,
  TouchableNativeFeedback,
  Animated,
} from "react-native";
import Ripple from "react-native-material-ripple";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, vh, vw } from "./Constants";
import AsyncStoage from "@react-native-async-storage/async-storage";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from "@react-navigation/native";
import {
  AccentColorProvider,
  ThemeProvider,
  useAccentColor,
  useTheme,
} from "./Context";
import { HeaderProps, RootStackParamList, theme } from "./Types";
import ComponentStyles from "../styles/Components.styled";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native-gesture-handler";
// @ts-ignore
export const SideBar = (props) => {
  const [theme, setTheme] = useTheme();
  const [accentColor, setAccentColor] = useAccentColor();

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <View style={ComponentStyles.header}>
        <AccentText style={ComponentStyles.headerTitle}>One-Chat</AccentText>
        <Ionicons name="chatbox-sharp" size={35} color={accentColor} />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <View style={ComponentStyles.themeIndicator}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              flex: 0.8,
            }}
          >
            <FontAwesome5
              name={theme.type === "light" ? "sun" : "moon"}
              size={24}
              color={theme.type === "light" ? "black" : "white"}
              style={{}}
            />
            <Text
              style={{
                fontSize: 4.5 * vw,
                fontFamily: "montserrat",
                color: theme.type === "light" ? "black" : "white",
              }}
            >
              {theme.type === "light" ? "Light" : "Dark"} Theme
            </Text>
          </View>

          <Switch
            thumbColor={accentColor}
            style={{
              flex: 0.4,
            }}
            value={theme.type === "dark"}
            onValueChange={async (value) => {
              const newTheme: theme = {
                type: value ? "dark" : "light",
                hasOverRidden: true,
              };
              setTheme(newTheme);
              await AsyncStoage.setItem(
                "one-chat-theme",
                JSON.stringify(newTheme)
              );
            }}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export const HOC: FC = ({ children }) => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AccentColorProvider>{children}</AccentColorProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export const AccentText: FC<{ style?: StyleProp<TextStyle> }> = ({
  children,
  style,
}) => {
  const accentColor = useAccentColor()[0];
  return <Text style={[{ color: accentColor }, style]}>{children}</Text>;
};

export const OneButton: FC<{ style: { color: string; bg: string } }> = ({
  style,
  children,
}) => {
  return (
    <Ripple
      rippleOpacity={0.2}
      rippleDuration={500}
      rippleColor="#fff"
      style={[ComponentStyles.rippleButton, { backgroundColor: style.bg }]}
    >
      <Text
        style={[
          ComponentStyles.rippleText,
          {
            color: style.color,
          },
        ]}
      >
        {children}
      </Text>
    </Ripple>
  );
};
export const Header: FC<HeaderProps> = (props) => {
  const { canGoBack, goBack, toggleDrawer, routeName } = props;
  const theme = useTheme()[0];

  return (
    <View
      style={[
        ComponentStyles.headerBanner,
        {
          backgroundColor: theme.type === "dark" ? "rgb(18, 18 , 18)" : "#fff",
          elevation: 5,
        },
      ]}
    >
      {routeName !== "Home" && (
        <TouchableOpacity onPress={goBack}>
          <Ionicons
            name="ios-arrow-back"
            size={30}
            color={theme.type === "dark" ? "#fff" : "#000"}
            style={{
              marginLeft: 2 * vw,
            }}
          />
        </TouchableOpacity>
      )}
      <AccentText
        style={{
          fontSize: vw * 6,
          fontFamily: "quicksand",
          marginLeft: routeName !== "Home" ? 0 : vw * 5,
        }}
      >
        {routeName}
      </AccentText>
      <TouchableOpacity onPress={toggleDrawer}>
        <Ionicons
          name="md-reorder-three"
          size={40}
          color={theme.type === "dark" ? "#fff" : "#000"}
          style={{
            marginRight: 2 * vw,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export const Navigator: FC = ({ children }) => {
  const theme = useTheme()[0];
  const accentColor = useAccentColor()[0];
  return (
    <>
      <NavigationContainer
        theme={
          theme.type === "dark"
            ? DarkTheme
            : {
                ...DefaultTheme,
                colors: { ...DefaultTheme.colors, background: "#fff" },
              }
        }
      >
        {children}
      </NavigationContainer>
      <StatusBar
        animated
        barStyle={"light-content"}
        backgroundColor={accentColor}
      />
    </>
  );
};
