import { StyleSheet } from "react-native";
import { vh, vw } from "../constants/Constants";

const HomePageStyles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  companyWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  companyText: {
    fontFamily: "raleway",
    fontSize: 15 * vw,
  },
  iconWrapper: {
    width: "100%",
    alignItems: "center",
  },
});
export default HomePageStyles;
