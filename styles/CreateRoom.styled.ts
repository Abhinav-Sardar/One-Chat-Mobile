import { StyleSheet } from "react-native";
import { vh, vw } from "../constants/Constants";

export const CreateRoomStyles = StyleSheet.create({
	page: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	field: {
		width: 80 * vw,
		alignItems: "flex-start",
		marginVertical: 25,
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
		marginTop: 15,
	},
	avatar: {
		height: 90,
		width: 90,
		borderRadius: 50,
		borderWidth: 1.5,
		alignItems: "center",
		justifyContent: "center",
	},
	avatarsWrapperStyle: {
		alignItems: "center",
	},
});
