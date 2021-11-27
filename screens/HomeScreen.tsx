import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React, { FC, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { DrawerParamList } from "../constants/Types";
import { DrawerActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAccentColor, useTheme } from "../constants/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  interpolate,
  interpolateNode,
  useDerivedValue,
  cond,
  divide,
} from "react-native-reanimated";
import HomePageStyles from "../styles/HomeScreen";
import { AccentText, OneButton, Opacitor } from "../constants/Components";
import { COLORS, vh, vw } from "../constants/Constants";
const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<DrawerParamList, "Home">;
}) => {
  const [accentColor, _] = useAccentColor();
  const translationY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withRepeat(
          withTiming(translationY.value, {
            duration: 2000,
            easing: Easing.linear,
          }),
          -1,
          true
        ),
      },
    ],
  }));
  useEffect(() => {
    translationY.value = -5 * vh;
  }, []);
  return (
    <Opacitor>
      <View style={[HomePageStyles.page]}>
        <View style={HomePageStyles.companyWrapper}>
          <Animated.View style={[animatedStyle, HomePageStyles.iconWrapper]}>
            <Ionicons
              name="chatbox-sharp"
              size={200}
              color="black"
              style={{ color: accentColor }}
            />
          </Animated.View>
          <AccentText style={HomePageStyles.companyText}>One-Chat</AccentText>

          <AccentText
            style={[
              HomePageStyles.companyText,
              { fontSize: 4 * vw, textAlign: "center" },
            ]}
          >
            Best place for One-Time Chats with anyone in the world.
          </AccentText>
        </View>
        <OneButton style={{ bg: accentColor, color: "white" }}>
          Leave Room
        </OneButton>
      </View>
    </Opacitor>
  );
};

export default HomeScreen;
