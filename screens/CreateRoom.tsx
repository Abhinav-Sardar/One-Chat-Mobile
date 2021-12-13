import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Keyboard,
  Share,
  Pressable,
  Alert,
  StyleSheet,
  FlatList,
  Modal,
  VirtualizedList,
  ToastAndroid,
  ActivityIndicator,
  Vibration,
} from "react-native";
import { AccentText, BottomSheet, OneButton } from "../constants/Components";
import io from "socket.io-client";
import { CreateRoomStyles } from "../styles/CreateRoom.styled";
import { SvgXml } from "react-native-svg";
import { useAccentColor, useTheme } from "../constants/Context";
import {
  Alerts,
  getAvatars,
  getRandomKey,
  IsRoomThere,
  MAX_BOTTOM_SHEET_HEIGHT,
  serverName,
  TransitionConfig,
  validateNameAndRoomnName,
  vh,
  vw,
} from "../constants/Constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import { room, RootStackParamList } from "../constants/Types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
const avatars = getAvatars();
const socket = io(serverName);

const CreateRoom: FC<{
  navigation: NativeStackNavigationProp<RootStackParamList, "DrawerList">;
}> = ({ navigation }) => {
  const [name, setName] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);
  const theme = useTheme()[0];
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const hamdleSubmit = () => {
    const status = validateNameAndRoomnName(name, roomName);
    if (typeof status === "string") {
      ToastAndroid.showWithGravity(
        status,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      Vibration.vibrate(100);
    } else {
      socket.connect();
      socket.emit("rooms");
      socket.on("rooms-back", (rooms: room[]) => {
        socket.removeAllListeners("rooms-back");
        if (IsRoomThere(rooms, roomName)) {
          // @ts-ignore
          socket.disconnect(true);
          ToastAndroid.showWithGravity(
            Alerts.RoomAlreadyExist,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        } else {
          Vibration.vibrate(1000);
          socket.disconnect();
          setIsSheetOpen(false);
          setName("");
          setRoomName("");
          navigation.navigate("Chat", {
            isPrivate: false,
            user: {
              name,
              // @ts-ignore
              avatarSvg: currentAvatar,
              roomName,
            },
          });
        }
      });
    }
  };
  useEffect(() => {
    setCurrentAvatar(avatars[0]);
  }, []);
  const accentColor = useAccentColor()[0];
  return (
    <Pressable
      android_disableSound={true}
      onPress={Keyboard.dismiss}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <View style={CreateRoomStyles.page}>
        <View style={CreateRoomStyles.field}>
          <AccentText style={CreateRoomStyles.label}>Name</AccentText>
          <TextInput
            placeholder="Enter Your Name..."
            value={name}
            onChangeText={setName}
            placeholderTextColor={"#a8a8a8"}
            autoCompleteType="username"
            returnKeyType="next"
            style={[
              CreateRoomStyles.input,
              {
                color: theme.type === "light" ? "#000" : "#fff",
                backgroundColor: theme.type === "dark" ? "#424242" : "#ededed",
              },
            ]}
          />
        </View>
        <View style={CreateRoomStyles.field}>
          <AccentText style={CreateRoomStyles.label}>Room Name</AccentText>
          <TextInput
            placeholder="Enter Room Name..."
            value={roomName}
            onChangeText={setRoomName}
            placeholderTextColor={"#a8a8a8"}
            returnKeyType="route"
            style={[
              CreateRoomStyles.input,
              {
                color: theme.type === "light" ? "#000" : "#fff",
                backgroundColor: theme.type === "dark" ? "#424242" : "#ededed",
              },
            ]}
          />
        </View>
        <View style={CreateRoomStyles.avatars}>
          <View style={CreateRoomStyles.avatar}>
            <SvgXml xml={currentAvatar ? currentAvatar : null} />
          </View>
          <OneButton
            onPress={() => {
              setIsSheetOpen(true);
            }}
            viewStyle={{
              backgroundColor: accentColor,
              width: 46 * vw,
              height: 6 * vh,
            }}
            textStyle={{
              color: "white",
              fontSize: 18,
            }}
            Icon={() => <FontAwesome5 name="user" size={20} color="white" />}
          >
            Choose Avatar
          </OneButton>
        </View>
        <OneButton
          onPress={hamdleSubmit}
          viewStyle={{
            backgroundColor: accentColor,
            width: 46 * vw,
            height: 8 * vh,
            marginTop: 60,
          }}
          textStyle={{
            color: "white",
            fontSize: 18,
          }}
        >
          Create Room
        </OneButton>
      </View>

      <BottomSheet
        initialSnapPoint={20 * vh}
        title="Choose An Avatar"
        visible={isSheetOpen}
        onClose={() => {
          setIsSheetOpen(false);
        }}
      >
        <FlatList
          data={avatars}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={CreateRoomStyles.avatarsWrapperStyle}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  setCurrentAvatar(item);
                  setIsSheetOpen(false);
                }}
                style={{
                  ...CreateRoomStyles.avatar,
                  borderWidth: 2,
                  marginHorizontal: 5,
                  marginVertical: 3,
                  borderColor: currentAvatar === item ? accentColor : "yellow",
                }}
              >
                <SvgXml xml={item} />
              </Pressable>
            );
          }}
          numColumns={4}
        />
      </BottomSheet>
    </Pressable>
  );
};

export default CreateRoom;
