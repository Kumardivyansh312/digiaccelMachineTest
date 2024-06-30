
import { Box, Button, HStack, Icon, Input, Pressable } from 'native-base';
import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const LoginScreen = ({ navigation }) => {
    const [show, setShow] = useState(false);
    const [checked, setChecked] = React.useState(false);
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ flex: 1, padding: 15 }}>
                <Image source={require('../../assets/images/digi_logo.png')} style={{ height: 45, objectFit: "contain" }} />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Image source={require('../../assets/images/18383.jpg')} style={{ height: 300, objectFit: "contain" }} />
                </View>
            </View>
            <View style={{ flex: 1, padding: 20, paddingVertical: 25, backgroundColor: "#f2f3f7", borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                <Text style={{fontFamily:"Rubik Black", fontSize:25, fontWeight:"600" , color:"black"}}>Sign-in</Text>
                <Box alignItems="center">
                    <Input
                        mx="3"
                        size="2xl"
                        shadow={1}
                        placeholder="Enter email or username"
                        w="100%"
                        borderColor={"white"}
                        borderRadius={10}
                        backgroundColor={"white"}
                        mt={5} />
                    <Input
                        backgroundColor={"white"}
                        w="100%"
                        shadow={1}
                        mt={5}
                        mx="3"
                        borderColor={"white"}
                        size="2xl"
                        borderRadius={10}
                        type={show ? "text" : "password"}
                        InputRightElement={
                            <Pressable onPress={() => setShow(!show)} pr={3}>
                                <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} color="muted.400" />
                            </Pressable>}
                        placeholder="Password" />


                </Box>
                <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 12 }}>
                    <Text style={{ color: "blue" }}>Forgot password ?</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", marginTop: 30 }}>
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        // status={'checked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                    <Text style={{ width: "90%" }}>By signing up, you agree to our <Text style={{ color: "blue" }}>terms of service</Text> and <Text style={{ color: "blue" }}>privacy policy.</Text></Text>
                </View>

                <Button colorScheme={"blue"} borderRadius={10} mt={5} _text={{fontFamily:"Rubik Bold"}} size={"lg"} style={{}} onPress={() => {
                    navigation.navigate("DashbardScreen")
                }}>
                    {/* <Text style={{ fontFamily: "Rubik-Bold" }}> */}
                        Sign-in
                    {/* </Text> */}
                </Button>

            </View>
        </View>
    );
};


export default LoginScreen;


