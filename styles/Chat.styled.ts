import { StyleSheet } from "react-native";

export const ChatStyles = StyleSheet.create({
    messages: {
        height: '90%',
        borderWidth: 5,
        borderColor: '#000',
    },
    inputSection: {
        height: '10%',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})