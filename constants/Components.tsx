import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Switch,
  StyleProp,
  TextStyle,
  ViewStyle,
  Pressable,
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
} from "@react-navigation/native";
import {
  AccentColorProvider,
  ThemeProvider,
  useAccentColor,
  useTheme,
} from "./Context";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { theme } from "./Types";
import ComponentStyles from "../styles/Components";
// @ts-ignore
export const SideBar = (props) => {
  const [theme, setTheme] = useTheme();
  const [accentColor, setAccentColor] = useAccentColor();
  return (
    <Opacitor style={{}}>
      <View style={{ flex: 1, marginTop: 50 }}>
        <View style={ComponentStyles.header}>
          <AccentText style={ComponentStyles.headerTitle}>One-Chat</AccentText>
          <Ionicons name="chatbox-sharp" size={35} color={accentColor} />
        </View>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <View style={ComponentStyles.themeIndicator}>
            <Text
              style={{
                color: theme.type === "light" ? COLORS.dark : COLORS.light,
                fontFamily: "montserrat",
                fontSize: vw * 5,
                marginLeft: 10,
              }}
            >
              {theme.type?.toUpperCase()} Theme
            </Text>
            <Switch
              thumbColor={accentColor}
              value={theme.type === "dark"}
              onValueChange={async (value) => {
                const newTheme: theme = {
                  type: value ? "dark" : "light",
                  hasOverRidden: true,
                };
                // @ts-ignore
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
    </Opacitor>
  );
};

export const Provider: FC = ({ children }) => {
  const [theme, _] = useTheme();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AccentColorProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AccentColorProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
export const Opacitor: FC<{ style?: ViewStyle }> = ({ children }) => {
  const theme = useTheme()[0];
  const opacity = useSharedValue(0);
  const color = useSharedValue(
    theme.type === "dark" ? COLORS.dark : COLORS.light
  );
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: 400,
      }),
      backgroundColor: withTiming(color.value, {
        duration: 400,
        easing: Easing.ease,
      }),
    };
  }, [theme]);
  useEffect(() => {
    opacity.value = 1;
  }, []);
  useEffect(() => {
    color.value = theme.type === "dark" ? COLORS.dark : COLORS.light;
  }, [theme]);
  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          flex: 1,
        },
      ]}
    >
      {children}
    </Animated.View>
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
export const Header: FC<{ routeName: string }> = ({ routeName }) => {
  return (
    <View style={ComponentStyles.headerBanner}>
      <Text>{routeName}</Text>
    </View>
  );
};
