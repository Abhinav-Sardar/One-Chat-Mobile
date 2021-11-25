import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React, { FC } from "react";
import { View, Text, Button } from "react-native";
import { DrawerParamList } from "../constants/Types";
import { DrawerActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAccentColor } from "../constants/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import HomePageStyles from "../styles/HomePage";
const HomeScreen = (
  navigation: NativeStackNavigationProp<DrawerParamList, "Home">
) => {
  const [accentColor, setAccentColor] = useAccentColor();
  const width = useSharedValue(100);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(width.value, {
        duration: 500,
      }),
    };
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={HomePageStyles.page}>
        <Animated.View style={[HomePageStyles.box, animatedStyle]} />
        <Button
          title="CLick ME"
          onPress={() => {
            width.value += 10;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
