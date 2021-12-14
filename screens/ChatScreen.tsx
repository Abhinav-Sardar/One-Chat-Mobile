import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Keyboard,
  Pressable,
  TouchableOpacity,
  TextInputState,
  DrawerLayoutAndroid,
  KeyboardAvoidingView,
  TextInput,
  ToastAndroid,
  Vibration,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { AccentText, OneButton } from "../constants/Components";
import { serverName, vw } from "../constants/Constants";
import { useAccentColor, useTheme } from "../constants/Context";
import { ChatUser, fieldType, RootStackParamList } from "../constants/Types";
import ComponentStyles from "../styles/Components.styled";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import io from "socket.io-client";
import { DrawerContent } from "../constants/ChatComponents";
import { ChatStyles } from "../styles/Chat.styled";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ComponentsStyled from "../styles/Components.styled";
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Chat">;
  route: RouteProp<RootStackParamList, "Chat">;
};
const socket = io(serverName);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const ChatScreen: FC<Props> = ({ route, navigation }) => {
  const { isPrivate, user } = route.params;
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [fieldType, setFieldType] = useState<fieldType>(null);
  const theme = useTheme()[0];
  const [text, setText] = useState<string>("");
  // @ts-ignore
  const drawerRef = useRef<DrawerLayoutAndroid>("");
  const [isSheetOpen, setisSheetOpen] = useState<boolean>(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const accentColor = useAccentColor()[0];
  const [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false);
  const height = useSharedValue<number>(0);
  const width = useSharedValue<number>(0);
  const scale = useSharedValue<number>(1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      width: width.value,
      transform: [{ scale: scale.value }],
    };
  });
  const isValidToBeSubmitted = Boolean(text && text.trim());
  function Header(): JSX.Element {
    return (
      <>
        <Pressable
          android_disableSound
          onPress={Keyboard.dismiss}
          style={[
            ComponentStyles.headerBanner,
            {
              backgroundColor:
                theme.type === "dark" ? "rgb(18, 18 , 18)" : "#fff",
              elevation: 5,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              drawerRef.current.openDrawer();
            }}
          >
            <Ionicons
              name="md-reorder-three"
              size={40}
              color={theme.type === "dark" ? "#fff" : "#000"}
              style={{
                marginLeft: 2 * vw,
              }}
            />
          </TouchableOpacity>
          <AccentText
            style={{
              fontSize: 23,
              fontFamily: "quicksand",
            }}
          >
            Room - {user.roomName}
          </AccentText>
          <OneButton
            viewStyle={{
              backgroundColor: "red",
              width: 140,
              height: "75%",
              marginRight: 2 * vw,
            }}
            textStyle={{
              fontSize: 17,
              color: "white",
            }}
            Icon={() => (
              <MaterialIcons name="exit-to-app" size={24} color="white" />
            )}
            onPress={() => {
              // @ts-ignore
              socket.disconnect(true);
              setFieldType(null);
              setText("");
              setUsers([]);
              navigation.navigate("DrawerList", {
                screen: "Home",
              });
            }}
          >
            Exit Room
          </OneButton>
        </Pressable>
      </>
    );
  }

  const socketCode = () => {
    socket.on("room-info", (newUsers: ChatUser[]) => {
      setUsers(newUsers);
    });
  };
  useEffect(() => {
    socket.connect();
    socketCode();

    Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardOpen(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardOpen(false);
    });
    return () => {
      // @ts-ignore
      socket.disconnect(true);
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, []);
  useEffect(() => {
    if (isValidToBeSubmitted) {
      height.value = withTiming(45, {
        duration: 100,
      });
      width.value = withTiming(45, {
        duration: 100,
      });
    } else {
      height.value = withTiming(0, {
        duration: 100,
      });
      width.value = withTiming(0, {
        duration: 100,
      });
    }
  }, [isValidToBeSubmitted]);

  const handleSubmit = useCallback(() => {
    if (!isValidToBeSubmitted) {
      ToastAndroid.showWithGravity(
        "Invalid Message!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      Vibration.vibrate(200);
    } else if (text.length) {
    }
  }, [isValidToBeSubmitted, text]);
  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={70 * vw}
      renderNavigationView={() => (
        <DrawerContent
          onClose={drawerRef.current.closeDrawer}
          onFieldSelected={(field) => {
            setFieldType(field);
            drawerRef.current.closeDrawer();
            setisSheetOpen(true);
          }}
        />
      )}
    >
      <Pressable
        android_disableSound
        onPress={Keyboard.dismiss}
        style={{ flex: 1 }}
      >
        <Header />
        <View style={{ flex: 1 }}>
          <View style={ChatStyles.messages}></View>
          <View
            style={{
              ...ChatStyles.inputSection,
              height: isKeyboardOpen ? "20%" : "15%",
              justifyContent: isValidToBeSubmitted ? "space-around" : "center",
            }}
          >
            <View
              style={{
                ...ChatStyles.inputContainer,
                marginLeft: isValidToBeSubmitted ? 0 : 10,
              }}
            >
              <FontAwesome5
                name="smile"
                size={30}
                style={{
                  marginHorizontal: 5,
                }}
                color={accentColor}
              />
              <TextInput
                placeholder="Say Something..."
                style={{
                  ...ChatStyles.input,
                  color: theme.type === "dark" ? "white" : "black",
                }}
                value={text}
                onChangeText={(text) => setText(text)}
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
              />
            </View>
            <AnimatedPressable
              style={[
                {
                  ...ChatStyles.actionBtn,
                  backgroundColor: accentColor,
                  height: 0,
                  width: 0,
                },
                animatedStyle,
              ]}
              onPressIn={() => {
                scale.value = withTiming(0.7, {
                  duration: 100,
                });
              }}
              onPressOut={() => {
                scale.value = withTiming(1, {
                  duration: 100,
                });
              }}
              onPress={() => {}}
            >
              <Ionicons name="send" size={24} color="white" />
            </AnimatedPressable>
          </View>
        </View>
      </Pressable>
    </DrawerLayoutAndroid>
  );
};

export default ChatScreen;
