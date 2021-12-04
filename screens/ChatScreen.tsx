import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { View, Text } from "react-native";
import { RootStackParamList } from "../constants/Types";
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Chat">;
  route: RouteProp<RootStackParamList, "Chat">;
};
const ChatScreen: FC<Props> = ({ route }) => {
  return (
    <View>
      <Text>{route.params.isPrivate}</Text>
    </View>
  );
};

export default ChatScreen;
