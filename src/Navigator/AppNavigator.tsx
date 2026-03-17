import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppBottomTab from './AppMainTab.tsx';
import Detail from './../Screens/News/Detail/IndexView.tsx'
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
                        options={{ headerShown: true, animation: 'slide_from_right' }}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default AppNavigator
