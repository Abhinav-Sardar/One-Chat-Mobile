import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import { DrawerParamList } from "../constants/Types";

const CreateRoom = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<DrawerParamList, "Create">;
}) => {
  return (
    <View>
      <Text onPress={() => navigation.navigate("Home")} style={{ margin: 20 }}>
        Create a room
      </Text>
    </View>
  );
};

export default CreateRoom;
