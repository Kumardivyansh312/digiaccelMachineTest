
import { Box, Button, Icon, Input, Pressable } from 'native-base';
import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Styles } from './styles';
import { GlobalStyles } from '../../helpers/GlobalStyleSheet';

const LoginScreen = ({ navigation }) => {
    const [show, setShow] = useState(false);
    const [checked, setChecked] = React.useState(false);
    return (
        <View style={Styles.container}>
            <View style={Styles.logoView}>
                <Image source={require('../../assets/images/digi_logo.png')} style={Styles.logoImage} />
                <View style={GlobalStyles.center}>
                    <Image source={require('../../assets/images/18383.jpg')} style={Styles.image} />
                </View>
            </View>
            <View style={Styles.roundView}>
                <Text style={Styles.text}>Sign-in</Text>
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
                <TouchableOpacity style={Styles.forgetPassword}>
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
                        Sign-in
                </Button>

            </View>
        </View>
    );
};


export default LoginScreen;


