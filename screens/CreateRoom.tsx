import React, { FC, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Keyboard,
  Share,
  Pressable,
} from "react-native";
import { AccentText, BottomSheet, OneButton } from "../constants/Components";
import { CreateRoomStyles } from "../styles/CreateRoom.styled";
import { SvgXml } from "react-native-svg";
import { useAccentColor, useTheme } from "../constants/Context";
import { getAvatars, vh, vw } from "../constants/Constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateRoom: FC = () => {
  const [name, setName] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [avatars, setAvatars] = useState<string[]>([]);
  const [currentAvatar, setCurrentAvatar] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const theme = useTheme()[0];
  useEffect(() => {
    const initAvatars = getAvatars();
    setAvatars(initAvatars);
    setCurrentAvatar(initAvatars[0]);
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
      <View
        style={[
          CreateRoomStyles.page,
          {
            opacity: isModalOpen ? 0.5 : 1,
          },
        ]}
      >
        <View style={CreateRoomStyles.field}>
          <AccentText style={CreateRoomStyles.label}>Name</AccentText>
          <TextInput
            placeholder="Enter Your Name..."
            value={name}
            onChangeText={setName}
            placeholderTextColor={"#a8a8a8"}
            maxLength={20}
            autoCompleteType="username"
            returnKeyType="join"
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
            maxLength={20}
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
          <SvgXml
            xml={currentAvatar ? currentAvatar : null}
            height={50}
            width={50}
          />
          <OneButton
            onPress={() => setIsModalOpen(!isModalOpen)}
            viewStyle={{
              backgroundColor: accentColor,
              width: 50 * vw,
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
      </View>

      <BottomSheet
        initialSnapPoint={20 * vh}
        onClose={() => setIsModalOpen(false)}
        title=""
        visible={isModalOpen}
      >
        <Text>NONON</Text>
      </BottomSheet>
    </Pressable>
  );
};

export default CreateRoom;
