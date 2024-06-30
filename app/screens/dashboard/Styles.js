import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginHorizontal: 20
    },
    horizontalList: {
        flexGrow: 0,
        height: 250,
        marginBottom: 10,
    },
    verticalList: {
        flex: 1,
    },
    itemProgress: {
        height: 150,
        backgroundColor: 'white',
        marginVertical: 8,
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    item: {
        backgroundColor: 'white',
        paddingRight: 20,
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    itemVertical: {
        backgroundColor: 'white',
        margin: 5,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    title: {
        fontSize: 16,
    },
});