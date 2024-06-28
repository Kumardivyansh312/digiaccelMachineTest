import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login/login';

const Stack = createStackNavigator();
export const navigationRef = createNavigationContainerRef()

const MainNavigationStack = () => {

    return (
        <NavigationContainer ref={navigationRef} >
            <Stack.Navigator screenOptions={{
                headerShown:false
            }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigationStack;