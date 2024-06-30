import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login/login';
import DashboardScreen from '../screens/dashboard/dashboard';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons"
import EvilIcons from "react-native-vector-icons/FontAwesome"
import VideoPlayerScreen from '../screens/videoPlayer/videoPlayer';
import VideoPlayerAloneScreen from '../screens/videoPlayerScreen/videoPlayerScreen';

const Stack = createStackNavigator();
export const navigationRef = createNavigationContainerRef()

export const screenOptions = ({ navigation }) => ({
    headerStyle: {
        backgroundColor: 'black',
    },
    gestureDirection: "horizontal",
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTintColor: '#fff', // Set the color of the icons and text    
    headerLeft: () => (
        <TouchableOpacity onPress={() => {}} style={{ marginLeft: 10 }}>
            <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
    ),
    headerTitle: () => (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold',color:"white" }}>Learning Hub</Text>
        </View>
    ),
    headerRight: () => (
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => alert('Notification')} style={{ marginRight: 10 }}>
                <Ionicons name="notifications" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('user')} style={{ marginRight: 10 }}>
                <EvilIcons name="user-circle-o" size={24} color="white" />
            </TouchableOpacity>
            
        </View>
    ),
});

const MainNavigationStack = () => {

    return (
        <NavigationContainer ref={navigationRef}  >
            <Stack.Navigator screenOptions={{
                animationEnabled: true,
            }} >
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                 }} />
                <Stack.Screen name='DashbardScreen' component={DashboardScreen} options={screenOptions} />
                <Stack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} options={screenOptions} />
                <Stack.Screen name="VideoPlayerAloneScreen" component={VideoPlayerAloneScreen} options={{
                    headerShown:false
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigationStack;