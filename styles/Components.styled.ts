import { StyleSheet } from "react-native";
import { vw, vh } from "../constants/Constants";
import { StatusBar } from "react-native";

export default StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 8 * vw,
    fontFamily: "raleway",
    marginRight: 2 * vw,
  },
  themeIndicator: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  rippleButton: {
    height: 7.5 * vh,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    width: 40 * vw,
    borderRadius: 6,
    paddingHorizontal: 2 * vw,
  },
  rippleText: {
    fontFamily: "montserrat",
    fontSize: 20,
  },
  headerBanner: {
    elevation: 6,
    // @ts-ignore
    height:
      (StatusBar.currentHeight ? StatusBar.currentHeight : 7 * vh) + 5 * vh,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
