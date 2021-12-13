import React, { FC } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { AccentText, OneButton } from "./Components";
import { DrawerContentProps, fieldType } from "./Types";
import ComponentStyles from "../styles/Components.styled";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useAccentColor, useTheme } from "./Context";
import { DrawerContentData, vw } from "./Constants";
export const DrawerContent: FC<DrawerContentProps> = ({
  onFieldSelected,
  onClose,
}) => {
  const theme = useTheme()[0];
  const accentColor = useAccentColor()[0];
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: theme.type === "dark" ? "#1a1a1a" : "#fff",
      }}
    >
      <View style={ComponentStyles.header}>
        <AccentText style={ComponentStyles.headerTitle}>One-Chat</AccentText>
        <Ionicons name="chatbox-sharp" size={35} color={accentColor} />
      </View>
      <View
        style={{
          width: "100%",
          borderWidth: 5,
          borderColor: "pink",
        }}
      >
        {DrawerContentData.map((item) => {
          return (
            <OneButton
              android_ripple={{
                borderless: false,
                color: accentColor,
              }}
              Icon={() => <item.Icon color={accentColor} />}
              onPress={() => onFieldSelected(item.field)}
              viewStyle={{
                justifyContent: "space-around",
                borderWidth: 1.5,
                borderColor: accentColor,

                width: "90%",
                marginVertical: 10,
              }}
            >
              <AccentText>{item.displayName}</AccentText>
            </OneButton>
          );
        })}
      </View>
    </View>
  );
};
