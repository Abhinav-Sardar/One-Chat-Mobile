import { StyleSheet } from "react-native";
import { vw, vh } from "../constants/Constants";
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
    justifyContent: "space-between",
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
    backgroundColor: "white",
    height: 10 * vh,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 6,
    borderWidth: 5,
    borderColor: "#bd14ca",
  },
});
