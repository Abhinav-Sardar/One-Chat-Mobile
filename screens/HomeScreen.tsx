import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React, { FC, memo, useEffect, useRef } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { DrawerParamList } from "../constants/Types";
import { useAccentColor, useTheme } from "../constants/Context";
import { Ionicons } from "@expo/vector-icons";
import HomePageStyles from "../styles/HomeScreen.styled";
import { AccentText, OneButton } from "../constants/Components";
import { COLORS, vh, vw } from "../constants/Constants";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<DrawerParamList, "Home">;
}) => {
  const [accentColor, _] = useAccentColor();
  const translateY = useSharedValue<number>(0);
  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-5 * vh, {
          duration: 1000,
          easing: Easing.linear,
        }),
        withTiming(0, {
          duration: 1000,
          easing: Easing.linear,
        })
      ),
      -1,
      true
    );
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  return (
    <View style={[HomePageStyles.page]}>
      <View style={HomePageStyles.companyWrapper}>
        <Animated.View style={animatedStyle}>
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
    </View>
  );
};

export default memo(HomeScreen);
