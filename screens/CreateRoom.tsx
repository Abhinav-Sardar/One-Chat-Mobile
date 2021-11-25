import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import { DrawerParamList } from "../constants/Types";

const CreateRoom = (
  navigation: NativeStackNavigationProp<DrawerParamList, "Create">
) => {
  return (
    <View>
      <Text>Create a room</Text>
    </View>
  );
};

export default CreateRoom;
