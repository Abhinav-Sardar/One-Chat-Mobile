import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { FC, memo, useEffect, useState } from "react";
import Storage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Text,
  Switch,
  StyleProp,
  TextStyle,
  ViewStyle,
  StatusBar,
  Pressable,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Modal,
  View,
} from "react-native";
import Ripple from "react-native-material-ripple";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  MAX_BOTTOM_SHEET_HEIGHT,
  TransitionConfig,
  vh,
  vw,
} from "./Constants";
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
import {
  BottomSheetProps,
  HeaderProps,
  OneButtonProps,
  RootStackParamList,
  theme,
} from "./Types";
import ComponentStyles from "../styles/Components.styled";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
  TouchableHighlight,
} from "react-native-gesture-handler";
import { CreateRoomStyles } from "../styles/CreateRoom.styled";
export const SideBar = (props) => {
  const [theme, setTheme] = useTheme();
  const [accentColor, setAccentColor] = useAccentColor();
  const rotation = useSharedValue<number>(0);
  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rotation.value}deg`,
      },
    ],
  }));
  useEffect(() => {
    rotation.value = withSpring(theme.type === "dark" ? 360 : 0, {
      stiffness: 50,
    });
  }, [theme]);
  return (
    <View
      style={{
        flex: 1,
      }}
    >
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
            <Animated.View style={iconStyle}>
              <FontAwesome5
                name={theme.type === "light" ? "sun" : "moon"}
                size={24}
                color={theme.type === "light" ? "black" : "white"}
              />
            </Animated.View>
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

export const AccentText: FC<{
  style?: StyleProp<TextStyle>;
}> = ({ children, style }) => {
  const accentColor = useAccentColor()[0];
  return (
    <Text
      style={[
        {
          color: accentColor,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export const OneButton: FC<OneButtonProps> = ({
  textStyle,
  viewStyle,
  children,
  Icon,

  onPress,
}) => {
  const theme = useTheme()[0];
  return (
    <Ripple
      rippleOpacity={0.2}
      rippleDuration={500}
      rippleColor={theme.type === "light" ? "black" : "white"}
      style={[ComponentStyles.rippleButton, viewStyle]}
      onPress={onPress}
    >
      <Text style={[ComponentStyles.rippleText, textStyle]}>{children}</Text>
      {Icon && <Icon />}
    </Ripple>
  );
};
export const Header: FC<HeaderProps> = (props) => {
  const { canGoBack, goBack, toggleDrawer, routeName } = props;
  const theme = useTheme()[0];

  return (
    <Pressable
      android_disableSound
      onPress={Keyboard.dismiss}
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
    </Pressable>
  );
};

export const Navigator: FC = ({ children }) => {
  const theme = useTheme()[0];
  return (
    <>
      <NavigationContainer
        theme={
          theme.type === "dark"
            ? DarkTheme
            : {
                ...DefaultTheme,
                colors: {
                  ...DefaultTheme.colors,
                  background: "#fff",
                },
              }
        }
      >
        {children}
      </NavigationContainer>
    </>
  );
};

export const BottomSheet: FC<BottomSheetProps> = memo((props) => {
  const { children, initialSnapPoint, title, visible, onClose } = props;
  const top = useSharedValue<number>(MAX_BOTTOM_SHEET_HEIGHT);
  const theme = useTheme()[0];
  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });
  const trimMax = (value: number) => {
    "worklet";
    return Math.max(value, 0);
  };
  useEffect(() => {
    if (visible) {
      top.value = withTiming(initialSnapPoint, TransitionConfig);
    } else {
      top.value = withTiming(MAX_BOTTOM_SHEET_HEIGHT, TransitionConfig);
    }
  }, [visible]);
  const panGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      translationY: number;
    }
  >({
    onStart: (_, ctx) => {
      ctx.translationY = top.value;
    },
    onEnd: () => {
      if (top.value < initialSnapPoint) {
        top.value = withTiming(0, TransitionConfig);
      } else {
        if (
          top.value >= initialSnapPoint &&
          top.value < initialSnapPoint + 200
        ) {
          top.value = withTiming(initialSnapPoint, TransitionConfig);
        } else {
          runOnJS(onClose)();
        }
      }
    },
    onActive: ({ translationY }, ctx) => {
      top.value = trimMax(ctx.translationY + translationY);
    },
  });
  return (
    <>
      <Animated.View
        style={[
          ComponentStyles.bottomSheet,
          animatedStyle,
          {
            backgroundColor: theme.type === "dark" ? "rgb(1 , 1 , 1)" : "#fff",
          },
        ]}
      >
        <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View style={[ComponentStyles.bottomSheetHeader, {}]}>
            <View />
            <AccentText
              style={{
                ...ComponentStyles.headerTitle,
                marginRight: 0,
                fontSize: 25,
              }}
            >
              {title}
            </AccentText>
            <TouchableOpacity
              onPress={() => {
                top.value = withTiming(
                  MAX_BOTTOM_SHEET_HEIGHT,
                  TransitionConfig
                );
              }}
            >
              <Ionicons
                name="close-sharp"
                size={35}
                color={theme.type === "dark" ? "#fff" : "#000"}
                style={{
                  marginRight: 2 * vw,
                }}
              />
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
        <View
          style={{
            flex: 1,
          }}
        >
          {children}
        </View>
      </Animated.View>
    </>
  );
});
