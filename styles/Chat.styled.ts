import { StyleSheet } from "react-native";
import { vw } from "../constants/Constants";

export const ChatStyles = StyleSheet.create({
    messages: {
        borderWidth: 5,
        borderColor: '#000',
        flex: 1
    },
    inputSection: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0099cc',
    },
    actionBtn: {
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 1.5 * vw,
        height: 45,
        width: 45,

    },
    inputContainer: {
        borderWidth: 2.5,
        borderColor: '#bd14ca',
        flexDirection: 'row',
        borderRadius: 100,
        height: 45,
        alignItems: 'center',
        flex: 1,
    },
    input: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 5,
        fontFamily: 'montserrat',
        fontSize: 19,

    }
})
