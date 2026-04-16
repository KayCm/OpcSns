import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppBottomTab from './AppMainTab.tsx';
import Detail from './../Screens/News/Detail/IndexView.tsx'
import Login from '../Screens/UserManager/Login/IndexView'
import Register from '../Screens/UserManager/Register/IndexView'
import ForgetPassword from '../Screens/UserManager/ForgetPassWord/IndexView'
import ResetPassword from '../Screens/UserManager/ResetPassWord/IndexView'
import AppInitial from '../Screens/AppInitial'

import CommunityList from '../Screens/Map/CommunityListView'

import Search from '../Screens/News/Search/IndexView.tsx'

const Stack = createNativeStackNavigator();

import About from './../Screens/Mine/About/IndexView'
import Purchase from './../Screens/Mine/Purchase/IndexView'
import Faq from './../Screens/Mine/Faq/IndexView'
import FeedBack from './../Screens/Mine/FeedBack/IndexView'
import Settings from './../Screens/Mine/Settings/IndexView'
import ProfileSettings from './../Screens/Mine/ProfileSettings/IndexView'
import enhanceScreen from "./enhanceScreen";
import ActivityDetailView from "../Screens/Events/ActivityDetailView";
import EarnDetailView from "../Screens/Earn/EarnDetailView";
import DetailPostView from "../Screens/News/Detail/DetailPostView";
import EditPwdView from "../Screens/Mine/ProfileSettings/EditPwdView";
import EditNameView from "../Screens/Mine/ProfileSettings/EditNameView";
import AgreementView from '../Screens/UserManager/AgreementView.tsx';
import LanguageView from "../Screens/Mine/Settings/LanguageView";

const AppNavigator = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AppInitial">
          <Stack.Group>
            <Stack.Screen
              name="AppBottomTab"
              component={AppBottomTab}
              options={{ headerShown: false, animation: 'fade' }}
            />

            <Stack.Screen
              name="AppInitial"
              component={AppInitial}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />

            <Stack.Screen
              name="Search"
              component={Search}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />

            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />

            <Stack.Screen
              name="DetailPost"
              component={DetailPostView}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />

            <Stack.Screen
              name="ActivityDetail"
              component={ActivityDetailView}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />

            <Stack.Screen
              name="EarnDetail"
              component={EarnDetailView}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />

            <Stack.Screen
              name="CommunityList"
              component={CommunityList}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />

            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false, animation: 'slide_from_bottom' }}
            />

            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="ForgetPassword"
              component={ForgetPassword}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />

            <Stack.Screen
              name="ProfileSettings"
              component={ProfileSettings}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />

            <Stack.Screen
              name="EditName"
              component={EditNameView}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />

            <Stack.Screen
              name="EditPwd"
              component={EditPwdView}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />

            <Stack.Screen
              name="Agreement"
              component={AgreementView}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />

            <Stack.Screen
              name="About"
              component={About}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="Purchase"
              component={Purchase}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="Faq"
              component={Faq}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="FeedBack"
              component={FeedBack}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="Language"
              component={LanguageView}
              options={{ headerShown: false, animation: 'slide_from_right' }}
            />
          </Stack.Group>

          {/*<Stack.Group screenOptions={{ presentation: 'modal' }}>*/}
          {/*    <Stack.Screen*/}
          {/*        name="Login"*/}
          {/*        component={Login}*/}
          {/*        options={{ headerShown: false,animation: 'slide_from_bottom' }}*/}
          {/*    />*/}
          {/*</Stack.Group>*/}
        </Stack.Navigator>
      </NavigationContainer>
    );
};
export default AppNavigator
