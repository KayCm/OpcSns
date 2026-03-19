import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppBottomTab from './AppMainTab.tsx';
import Detail from './../Screens/News/Detail/IndexView.tsx'
import Login from './../Screens/Login/IndexView'
import Register from './../Screens/Register/IndexView'
const Stack = createNativeStackNavigator();



const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AppBottomTab">
                <Stack.Group>
                    <Stack.Screen
                        name="AppBottomTab"
                        component={AppBottomTab}
                        options={{ headerShown: false, animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name="Detail"
                        component={Detail}
                        options={{ headerShown: false, animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={Register}
                        options={{ headerShown: false,animation: 'slide_from_bottom' }}
                    />
                </Stack.Group>


                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: false,animation: 'slide_from_bottom' }}
                    />
                </Stack.Group>

            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default AppNavigator
