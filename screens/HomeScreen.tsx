import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React, { FC, memo, useEffect, useRef } from "react";
import { View, Text, Button, TextInput, Animated } from "react-native";
import { DrawerParamList } from "../constants/Types";
import { useAccentColor, useTheme } from "../constants/Context";
import { Ionicons } from "@expo/vector-icons";
import HomePageStyles from "../styles/HomeScreen.styled";
import { AccentText, OneButton } from "../constants/Components";
import { COLORS, vh, vw } from "../constants/Constants";
import { useAnimatedRef } from "react-native-reanimated";

const HomeScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<DrawerParamList, "Home">;
}) => {
  const [accentColor, _] = useAccentColor();
  const translateY = new Animated.Value(0);
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -5 * vh,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
        // resetBeforeIteration: false,
      }
    ).start();
  });

  return (
    <View style={[HomePageStyles.page]}>
      <View style={HomePageStyles.companyWrapper}>
        <Animated.View style={HomePageStyles.iconWrapper}>
          <Animated.View
            style={{
              transform: [
                {
                  translateY,
                },
              ],
            }}
          >
            <Ionicons
              name="chatbox-sharp"
              size={200}
              color="black"
              style={{ color: accentColor }}
            />
          </Animated.View>
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
  );
};

export default memo(HomeScreen);
