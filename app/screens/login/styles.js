import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#fff"
    },
    logoView: {
        flex: 1, padding: 15
    },
    logoImage: {
        height: 45, objectFit: "contain"
    },
    image: {
        height: 300, objectFit: "contain"
    },
    roundView: {
        flex: 1, padding: 20, paddingVertical: 25, backgroundColor: "#f2f3f7", borderTopLeftRadius: 25, borderTopRightRadius: 25
    },
    text:{
        fontFamily:"Rubik Black", fontSize:25, fontWeight:"600" , color:"black"
    },
    forgetPassword:{
        alignSelf: "flex-end", marginTop: 12 
    }
})