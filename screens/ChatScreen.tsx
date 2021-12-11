import { Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { AccentText, OneButton } from "../constants/Components";
import { serverName, vw } from "../constants/Constants";
import { useAccentColor, useTheme } from "../constants/Context";
import { ChatUser, fieldType, RootStackParamList } from "../constants/Types";
import ComponentStyles from "../styles/Components.styled";
import { MaterialIcons } from "@expo/vector-icons";
import io from "socket.io-client";
import { DrawerContent } from "../constants/ChatComponents";
import { ChatStyles } from "../styles/Chat.styled";
import { FontAwesome5 } from "@expo/vector-icons";
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Chat">;
  route: RouteProp<RootStackParamList, "Chat">;
};
const socket = io(serverName);
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
          <AccentText
            style={{
              fontSize: 23,
              fontFamily: "quicksand",
              marginLeft: 2 * vw,
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
      setUsers(() => newUsers);
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
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header />,
    });
  }, []);

  const handleSubmit = () => {};
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
        <View style={{ flex: 1 }}>
          <View
            style={{
              ...ChatStyles.messages,
              height: isKeyboardOpen ? "80%" : "85%",
            }}
          ></View>
          <View
            style={{
              ...ChatStyles.inputSection,
              height: isKeyboardOpen ? "20%" : "15%",
            }}
          >
            <OneButton
              Icon={() => <AntDesign name="plus" size={24} color="white" />}
              viewStyle={{
                ...ChatStyles.plusBtn,
                backgroundColor: accentColor,
              }}
              onPress={() => {
                drawerRef.current.openDrawer();
                Keyboard.dismiss();
              }}
            />
            <View style={ChatStyles.inputContainer}>
              <FontAwesome5 name="smile" size={24} color={accentColor} />
              <TextInput placeholder="Say Something..." />
            </View>
          </View>
        </View>
      </Pressable>
    </DrawerLayoutAndroid>
  );
};

export default ChatScreen;
