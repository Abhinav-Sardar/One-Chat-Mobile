import { StyleSheet } from "react-native";
import { vh, vw } from "../constants/Constants";

export const CreateRoomStyles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  field: {
    width: 80 * vw,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 6 * vw,
    fontFamily: "poppins",
  },
  input: {
    width: "100%",
    height: 6 * vh,
    borderRadius: 5,
    fontSize: 17,
    fontFamily: "robboto",
    backgroundColor: "#424242",
    paddingHorizontal: 10,
  },
  avatars: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
