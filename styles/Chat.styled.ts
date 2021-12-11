import { StyleSheet } from "react-native";
import { vw } from "../constants/Constants";

export const ChatStyles = StyleSheet.create({
    messages: {
        borderWidth: 5,
        borderColor: '#000',
    },
    inputSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0099cc',
    },
    plusBtn: {
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 2 * vw,
    },
    inputContainer: {
        borderWidth: 3,
        borderColor: '#bd14ca',
        flexDirection: 'row',
        borderRadius: 20,
        height: '50%',
        alignItems: 'center',
        flex: .95,
        marginRight: 3 * vw

    }
})