import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import News from '../Screens/News/IndexView'
import VIP from '../Screens/VIP/IndexView'
import Map from '../Screens/Map/IndexView'
import Mine from '../Screens/Mine/IndexView'
import {useLinkBuilder} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Easing, Image, Platform, Text, View} from 'react-native';
import {PlatformPressable} from "@react-navigation/elements";
import {Route} from "@react-navigation/routers";
import { BlurView } from '@sbaiahmed1/react-native-blur';
import { Shadow } from 'react-native-shadow-2';
import {useTranslation} from "react-i18next";
import enhanceScreen from "./enhanceScreen";


// function AppBottomTabBar({ state, descriptors, navigation }) {
//   // const { colors } = useTheme();
//   const { buildHref } = useLinkBuilder();
//   const insets = useSafeAreaInsets();
//
//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         position: 'absolute',
//         bottom: 0,
//         width: '100%',
//         paddingBottom: insets.bottom,
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: 64 + insets.bottom,
//       }}
//     >
//       <Shadow distance={3}>
//         <BlurView
//           blurType="light"
//           blurAmount={10}
//           style={{
//             flexDirection: 'row',
//             height: 64,
//             width: 300,
//             borderRadius: 32,
//             // borderWidth: 2,
//             borderColor: 'red',
//             padding: 5,
//           }}
//         >
//           {state.routes.map((route: Route<any>, index: number) => {
//             const { options } = descriptors[route.key];
//             const label =
//               options.tabBarLabel !== undefined
//                 ? options.tabBarLabel
//                 : options.title !== undefined
//                 ? options.title
//                 : route.name;
//
//             const isFocused = state.index === index;
//
//             const onPress = () => {
//               const event = navigation.emit({
//                 type: 'tabPress',
//                 target: route.key,
//                 canPreventDefault: true,
//               });
//
//               if (!isFocused && !event.defaultPrevented) {
//                 navigation.navigate(route.name, route.params);
//               }
//             };
//
//             const onLongPress = () => {
//               navigation.emit({
//                 type: 'tabLongPress',
//                 target: route.key,
//               });
//             };
//             // let Icon:any = null;
//             // switch (label) {
//             //     default:
//             //     case 'Launch':{
//             //         Icon = isFocused ?  <LaunchIconOn /> : <LaunchIcon />
//             //         break;
//             //     }
//             //     case 'Mine':{
//             //         Icon = isFocused ?  <MineIconOn /> : <MineIcon />
//             //         break;
//             //     }
//             // }
//
//             return (
//               <PlatformPressable
//                 key={index}
//                 href={buildHref(route.name, route.params)}
//                 accessibilityState={isFocused ? { selected: true } : {}}
//                 accessibilityLabel={options.tabBarAccessibilityLabel}
//                 testID={options.tabBarButtonTestID}
//                 pressOpacity={1}
//                 pressColor={'#00000000'}
//                 onPress={onPress}
//                 onLongPress={onLongPress}
//                 style={{
//                   flex: 1,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   backgroundColor: isFocused ? 'red' : '#ffffff00',
//                   borderRadius: 30,
//                 }}
//               >
//                 {/*<View*/}
//                 {/*  style={{*/}
//                 {/*    flex: 1,*/}
//                 {/*    justifyContent: 'center',*/}
//                 {/*    alignItems: 'center',*/}
//                 {/*  }}*/}
//                 {/*>*/}
//                 {/*{Icon}*/}
//                 <Text
//                   style={{
//                     color: isFocused ? '#ffffff' : '#1C1C1E',
//                     // marginTop: 6,
//                     fontSize: 12,
//                     fontWeight: isFocused ? '600' : '400',
//                   }}
//                 >
//                   {label}
//                 </Text>
//                 {/*</View>*/}
//               </PlatformPressable>
//             );
//           })}
//         </BlurView>
//       </Shadow>
//     </View>
//   );
//
//   // return (<View style={{ flexDirection: 'row',height:64,backgroundColor:'#fff',borderTopColor:'#808080',borderTopWidth:StyleSheet.hairlineWidth }}>
//   //         {state.routes.map((route, index) => {
//   //             const { options } = descriptors[route.key];
//   //             const label =
//   //                 options.tabBarLabel !== undefined
//   //                     ? options.tabBarLabel
//   //                     : options.title !== undefined
//   //                         ? options.title
//   //                         : route.name;
//   //
//   //             const isFocused = state.index === index;
//   //
//   //             const onPress = () => {
//   //                 const event = navigation.emit({
//   //                     type: 'tabPress',
//   //                     target: route.key,
//   //                     canPreventDefault: true,
//   //                 });
//   //
//   //                 if (!isFocused && !event.defaultPrevented) {
//   //                     navigation.navigate(route.name, route.params);
//   //                 }
//   //             };
//   //
//   //             const onLongPress = () => {
//   //                 navigation.emit({
//   //                     type: 'tabLongPress',
//   //                     target: route.key,
//   //                 });
//   //             };
//   //
//   //             return (<PlatformPressable key={index} href={buildHref(route.name, route.params)}
//   //                                        accessibilityState={isFocused ? { selected: true } : {}}
//   //                                        accessibilityLabel={options.tabBarAccessibilityLabel}
//   //                                        testID={options.tabBarButtonTestID}
//   //                                        onPress={onPress}
//   //                                        onLongPress={onLongPress}
//   //                                        style={{ flex: 1,justifyContent:'center',alignItems:'center'}}>
//   //                     <View style={{height:20,width:20,backgroundColor:'#123'}}></View>
//   //                     <Text style={{ color: isFocused ? colors.primary : colors.text,marginTop:5}}>
//   //                         {label}
//   //                     </Text>
//   //                 </PlatformPressable>
//   //             );
//   //         })}
//   //     </View>
//   // );
// }

// export default function AppBottomTab() {
//     const Tab = createBottomTabNavigator();
//     const { t } = useTranslation();
//     return (
//         <Tab.Navigator initialRouteName={'News'}
//                        tabBar={props => <AppBottomTabBar {...props} />}>
//             {/*<Tab.Screen name={t('tabs.news')}*/}
//             {/*            component={News}*/}
//             {/*            options={{ headerShown: false }} />*/}
//             {/*<Tab.Screen name={t('tabs.vip')}*/}
//             {/*            component={VIP}*/}
//             {/*            options={{ headerShown: true }} />*/}
//             {/*<Tab.Screen name={t('tabs.map')}*/}
//             {/*            component={Map}*/}
//             {/*            options={{ headerShown: false }} />*/}
//             {/*<Tab.Screen name={t('tabs.mine')}*/}
//             {/*            component={Mine}*/}
//             {/*            options={{ headerShown: false }}*/}
//             {/*/>*/}
//             <Tab.Screen name={'News'}
//                         component={News}
//                         options={{ headerShown: false }} />
//             <Tab.Screen name={'VIP'}
//                         component={VIP}
//                         options={{ headerShown: false }} />
//             <Tab.Screen name={'Map'}
//                         component={Map}
//                         options={{ headerShown: false }} />
//             <Tab.Screen name={'Mine'}
//                         component={Mine}
//                         options={{ headerShown: false }} />
//         </Tab.Navigator>
//     );
// }

const Tab = createBottomTabNavigator();

function AppBottomTab(props) {

    const { t } = useTranslation();

    return (<Tab.Navigator initialRouteName={t('tabs.news')} screenOptions={({ route })=>({
        // animation: 'fade',
        // config: {
        //     duration: 150,
        //     easing: Easing.inOut(Easing.ease),
        // },
        tabBarActiveTintColor: '#d81e06',
        tabBarInactiveTintColor: '#8a8a8a',
        // tabBarBackground: () => (
        //     <BlurView tint="light" intensity={100} style={{flex:1}} />
        // ),
        tabBarLabelStyle: {
            marginTop:12,
        },
        tabBarIcon: ({ focused, color, size }) => {
            let iconSource;

            // if (route.name === '首页') {
            //     iconSource = focused
            //         ? require('../Resources/Common/Tabs/index_on.png')
            //         :  require('../Resources/Common/Tabs/index.png');
            // } else if (route.name === '动态') {
            //     iconSource = focused
            //         ? require('../Resources/Common/Tabs/rec_on.png')
            //         :  require('../Resources/Common/Tabs/rec.png');
            // } else if (route.name === '消息') {
            //     iconSource = focused
            //         ? require('../Resources/Common/Tabs/msg_on.png')
            //         :  require('../Resources/Common/Tabs/msg.png');
            // } else if (route.name === '我的') {
            //     iconSource = focused
            //         ? require('../Resources/Common/Tabs/mine_on.png')
            //         :  require('../Resources/Common/Tabs/mine.png');
            // }

            // You can return any component that you like here!
            return <Image style={{marginTop:10,height:24,width:24,backgroundColor:'#123',borderRadius:5}} source={iconSource} />;
        },
    })}>
        <Tab.Screen name={t('tabs.news')} component={enhanceScreen(News,{isNeedSafeArea:false})} options={{ headerShown: false }}/>
        <Tab.Screen name={t('tabs.vip')} component={enhanceScreen(VIP,{isNeedSafeArea:false})} options={{ headerShown: false }}/>
        <Tab.Screen name={t('tabs.map')} component={enhanceScreen(Map,{isNeedSafeArea:false})} options={{ headerShown: false }}/>
        <Tab.Screen name={t('tabs.mine')} component={enhanceScreen(Mine,{isNeedSafeArea:false})} options={{ headerShown: false }}/>
    </Tab.Navigator>)
}
export default AppBottomTab
