import { useContext, useEffect, useState } from "react";
import React, { createContext, FC } from "react";
import Storage from "@react-native-async-storage/async-storage";
export const AccentColorContext = createContext<[string, any]>([
  "#bd14ca",
  null,
]);
export const AccentColorProvider: FC = ({ children }) => {
  const [accentColor, setAccentColor] = useState<string>("#bd14ca");
  const checkAccentColor = async () => {
    const color = await Storage.getItem("one-chat-accent-color");
    if (!color) {
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
    </AccentColorContext.Provider>
  );
};

export const useAccentColor = () => {
  return useContext(AccentColorContext);
};
