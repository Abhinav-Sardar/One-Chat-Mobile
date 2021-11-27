import { NavigatorScreenParams } from "@react-navigation/native";
import { screens } from "./Constants";
export type DrawerParamList = {
  Home: undefined;
  Create: undefined;
  Join?: {
    roomName: string;
  };
};
export type ChatUser = {
  displayName: string;
  id: string;
  profileSvg: string;
  isHost: string;
};
export type RootStackParamList = {
  Chat: { isPrivate: boolean | "Join" };
  DrawerList: NavigatorScreenParams<DrawerParamList>;
};

export type room = {
  name: string;
  members: ChatUser[];
  isPrivate: boolean;
  membersLength?: number;
};

export type theme = {
  type: "light" | "dark" | undefined | null;
  hasOverRidden: boolean;
};
