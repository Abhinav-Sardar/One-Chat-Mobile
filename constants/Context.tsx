import { useContext, useEffect, useState } from "react";
import React, { createContext, FC } from "react";
import Storage from "@react-native-async-storage/async-storage";
import { StatusBar, useColorScheme } from "react-native";
import { theme } from "./Types";
import { EventRegister } from "react-native-event-listeners";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";

export const AccentColorContext = createContext<[string, any]>([
  "#bd14ca",
  null,
]);
export const AccentColorProvider: FC = ({ children }) => {
  const [accentColor, setAccentColor] = useState<string>("#bd14ca");
  const checkAccentColor = async () => {
    const color = await Storage.getItem("one-chat-accent-color");
    if (!color || color === "" || !color.trim()) {
      await Storage.setItem("one-chat-accent-color", accentColor);
    } else {
      setAccentColor(color);
    }
  };
  useEffect(() => {
    checkAccentColor();
  }, []);
  return (
    <AccentColorContext.Provider value={[accentColor, setAccentColor]}>
      {children}
      <StatusBar
        animated
        barStyle={"light-content"}
        backgroundColor={accentColor}
      />
    </AccentColorContext.Provider>
  );
};

export const useAccentColor = () => useContext(AccentColorContext);

export const ThemeContext = createContext<
  [theme, React.Dispatch<React.SetStateAction<theme>>]
>([{ hasOverRidden: false, type: "light" }, () => {}]);
export const ThemeProvider: FC = ({ children }) => {
  const phoneTheme = useColorScheme();
  const [theme, setTheme] = useState<theme>({
    hasOverRidden: false,
    type: phoneTheme || "light",
  });
  const checkTheme = async () => {
    const theme = await Storage.getItem("one-chat-theme");
    if (!theme || theme === "" || !theme.trim()) {
      await Storage.setItem(
        "one-chat-theme",
        JSON.stringify({
          type: phoneTheme || "light",
          hasOverRidden: false,
        })
      );
    } else {
      const parsedTheme = JSON.parse(theme);

      if (parsedTheme.hasOverRidden === false) {
        setTheme({
          type: phoneTheme || "light",
          hasOverRidden: false,
        });
      } else {
        setTheme(parsedTheme);
      }
    }
  };
  useEffect(() => {
    checkTheme();
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
