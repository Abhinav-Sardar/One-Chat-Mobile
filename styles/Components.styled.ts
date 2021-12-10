import { StyleSheet } from "react-native";
import { vw, vh, MAX_BOTTOM_SHEET_HEIGHT } from "../constants/Constants";
import { StatusBar } from "react-native";

export default StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "center",
		width: "100%",
	},
	headerTitle: {
		fontSize: 40,
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

		height:
			(StatusBar.currentHeight ? StatusBar.currentHeight : 7 * vh) + 5 * vh,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	bottomSheet: {
		position: "absolute",
		height: MAX_BOTTOM_SHEET_HEIGHT,
		left: 0,
		right: 0,
		bottom: 0,
		width: 100 * vw,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		backgroundColor: "rgb(18 , 18, 18)",
		zIndex: 3
	},
	bottomSheetHeader: {
		height: 10 * vh,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderWidth: 2,
		borderColor: "gray",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});
