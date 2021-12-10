import React, { FC } from "react";
import { Text, View } from "react-native";
import { OneButton } from "./Components";
import { DrawerContentProps, fieldType } from "./Types";
import { FontAwesome5 } from "@expo/vector-icons";
export const DrawerContent: FC<DrawerContentProps> = ({
  onFieldSelected,
  onClose,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <OneButton
        Icon={() => <FontAwesome5 name="user-alt" size={24} color="black" />}
        onPress={() => onFieldSelected("users")}
      >
        Users In Chat
      </OneButton>
    </View>
  );
};
