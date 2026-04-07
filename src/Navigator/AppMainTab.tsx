import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import News from '../Screens/News/IndexView'
import VIP from '../Screens/VIP/IndexView'
import Earn from '../Screens/Earn/IndexView'
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
import GStyles, {appSize, TRUE_ONE_LINE, WINDOW_WIDTH} from "../Components/GStyles";


function AppBottomTabBar({ state, descriptors, navigation }) {
  // const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const insets = useSafeAreaInsets();
    const { t } = useTranslation();
  return (
    <View
      style={{
        flexDirection: 'row',
        // position: 'absolute',
        // bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff',
        height: appSize(64) + insets.bottom,
        paddingBottom:insets.bottom
      }}>

        <View style={{
            flexDirection: 'row',
            height: appSize(64),
            width: WINDOW_WIDTH,
            backgroundColor:'#fff',
            alignItems:'flex-end',
            borderTopWidth:TRUE_ONE_LINE,
            borderTopColor:'#8a8a8a30'
          }}>
          {state.routes.map((route: Route<any>, index: number) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };
            let Icon:any = null;
            switch (label) {
                default:
                case t('tabs.news'):{
                    Icon = isFocused ? <Image style={{height:appSize(24),width:appSize(24)}} source={require('../Assets/Tabs/news_on.png')} />
                        : <Image style={{height:appSize(24),width:appSize(24)}} source={require('../Assets/Tabs/news_off.png')} />
                    break;
                }
                case t('tabs.vip'):{
                    Icon = isFocused ? <Image style={{height:appSize(24),width:appSize(24)}} source={require('../Assets/Tabs/vip_on.png')} />
                        : <Image style={{height:appSize(24),width:appSize(24)}} source={require('../Assets/Tabs/vip_off.png')} />
                    break;
                }
                case t('tabs.make'):{
                    Icon = isFocused ? <Image style={{height:appSize(24),width:appSize(24)}} source={require('../Assets/Tabs/news_on.png')} />
                        : <Image style={{height:appSize(24),width:appSize(24)}} source={require('../Assets/Tabs/news_on.png')} />
                    break;
                }
                case t('tabs.map'):{
                    Icon = isFocused ? <Image style={{height:appSize(24),width:appSize(24)}} source={require('../Assets/Tabs/map_on.png')} />
                        : <Image style={{height:appSize(24),width:appSize(24)}} source={require('../Assets/Tabs/map_off.png')} />
                    break;
                }
                case t('tabs.mine'):{
                    Icon = isFocused ? <Image style={{height:appSize(24),width:appSize(24)}} source={require('../Assets/Tabs/mine_on.png')} />
                        : <Image style={{height:appSize(24),width:appSize(24)}} source={require('../Assets/Tabs/mine_off.png')} />
                    break;
                }
            }



              if (label == t('tabs.make')){
                  return (<PlatformPressable
                      key={index}
                      href={buildHref(route.name, route.params)}
                      accessibilityState={isFocused ? { selected: true } : {}}
                      accessibilityLabel={options.tabBarAccessibilityLabel}
                      testID={options.tabBarButtonTestID}
                      pressOpacity={1}
                      pressColor={'#00000000'}
                      onPress={onPress}
                      onLongPress={onLongPress}
                      style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          // backgroundColor: isFocused ? 'red' : '',
                          height:appSize(80)
                      }}>
                      <View style={[GStyles.jc,GStyles.ac,{height:appSize(80),width:appSize(64)}]}>
                      <Image style={{width:appSize(56),height:appSize(56)}} source={require('../Assets/Tabs/make.png')} />
                  </View>
                  </PlatformPressable>)
              }



            return (
              <PlatformPressable
                key={index}
                href={buildHref(route.name, route.params)}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                pressOpacity={1}
                pressColor={'#00000000'}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: isFocused ? 'red' : '',
                    height:appSize(64)
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                {Icon}
                <Text style={{
                    color: isFocused ? '#121212' : '#1C1C1E',
                    marginTop: 6,
                    fontSize: 12,
                    fontWeight: isFocused ? '600' : '400',
                  }}>
                  {label}
                </Text>
                </View>
              </PlatformPressable>
            );
          })}
        </View>
    </View>
  );

  // return (<View style={{ flexDirection: 'row',height:64,backgroundColor:'#fff',borderTopColor:'#808080',borderTopWidth:StyleSheet.hairlineWidth }}>
  //         {state.routes.map((route, index) => {
  //             const { options } = descriptors[route.key];
  //             const label =
  //                 options.tabBarLabel !== undefined
  //                     ? options.tabBarLabel
  //                     : options.title !== undefined
  //                         ? options.title
  //                         : route.name;
  //
  //             const isFocused = state.index === index;
  //
  //             const onPress = () => {
  //                 const event = navigation.emit({
  //                     type: 'tabPress',
  //                     target: route.key,
  //                     canPreventDefault: true,
  //                 });
  //
  //                 if (!isFocused && !event.defaultPrevented) {
  //                     navigation.navigate(route.name, route.params);
  //                 }
  //             };
  //
  //             const onLongPress = () => {
  //                 navigation.emit({
  //                     type: 'tabLongPress',
  //                     target: route.key,
  //                 });
  //             };
  //
  //             return (<PlatformPressable key={index} href={buildHref(route.name, route.params)}
  //                                        accessibilityState={isFocused ? { selected: true } : {}}
  //                                        accessibilityLabel={options.tabBarAccessibilityLabel}
  //                                        testID={options.tabBarButtonTestID}
  //                                        onPress={onPress}
  //                                        onLongPress={onLongPress}
  //                                        style={{ flex: 1,justifyContent:'center',alignItems:'center'}}>
  //                     <View style={{height:20,width:20,backgroundColor:'#123'}}></View>
  //                     <Text style={{ color: isFocused ? colors.primary : colors.text,marginTop:5}}>
  //                         {label}
  //                     </Text>
  //                 </PlatformPressable>
  //             );
  //         })}
  //     </View>
  // );
}

export default function AppBottomTab() {
    const Tab = createBottomTabNavigator();
    const { t } = useTranslation();
    return (
        <Tab.Navigator initialRouteName={t('tabs.news')}
                       tabBar={props => <AppBottomTabBar {...props} />}>
            <Tab.Screen name={t('tabs.news')} component={News} options={{ headerShown: false }}/>
            <Tab.Screen name={t('tabs.vip')} component={VIP} options={{ headerShown: false }}/>
            <Tab.Screen name={t('tabs.make')} component={Earn} options={{ headerShown: false }}/>
            <Tab.Screen name={t('tabs.map')} component={Map} options={{ headerShown: false }}/>
            <Tab.Screen name={t('tabs.mine')} component={Mine} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
}

// const Tab = createBottomTabNavigator();
//
// function AppBottomTab(props) {
//
//     const { t } = useTranslation();
//
//     return (<Tab.Navigator initialRouteName={t('tabs.news')} screenOptions={({ route })=>({
//         // animation: 'fade',
//         // config: {
//         //     duration: 150,
//         //     easing: Easing.inOut(Easing.ease),
//         // },
//         tabBarActiveTintColor: '#121212',
//         tabBarInactiveTintColor: '#8a8a8a',
//         // tabBarBackground: () => (
//         //     <BlurView tint="light" intensity={100} style={{flex:1}} />
//         // ),
//         tabBarLabelStyle: {
//             marginTop:2,
//         },
//         tabBarIcon: ({ focused, color, size }) => {
//             let iconSource;
//
//             if (route.name === t('tabs.news')) {
//                 iconSource = focused
//                     ? require('../Assets/Tabs/news_on.png')
//                     :  require('../Assets/Tabs/news_on.png');
//             } else if (route.name === t('tabs.vip')) {
//                 iconSource = focused
//                     ? require('../Assets/Tabs/vip_off.png')
//                     :  require('../Assets/Tabs/vip_off.png');
//             } else if (route.name === t('tabs.map')) {
//                 iconSource = focused
//                     ? require('../Assets/Tabs/map_off.png')
//                     :  require('../Assets/Tabs/map_off.png');
//             } else if (route.name === t('tabs.make')) {
//                 iconSource = focused
//                     ? require('../Assets/Tabs/map_off.png')
//                     :  require('../Assets/Tabs/map_off.png');
//
//                 return <Image style={{height:24,width:24}} source={iconSource} />;
//             } else if (route.name === t('tabs.mine')) {
//                 iconSource = focused
//                     ? require('../Assets/Tabs/mine_off.png')
//                     :  require('../Assets/Tabs/mine_off.png');
//             }
//
//             // You can return any component that you like here!
//             return <Image style={{height:24,width:24}} source={iconSource} />;
//         },
//     })}>
//         <Tab.Screen name={t('tabs.news')} component={enhanceScreen(News,{isNeedSafeArea:false})} options={{ headerShown: false }}/>
//         <Tab.Screen name={t('tabs.vip')} component={enhanceScreen(VIP,{isNeedSafeArea:false})} options={{ headerShown: false }}/>
//         <Tab.Screen name={t('tabs.make')} component={enhanceScreen(Map,{isNeedSafeArea:false})} options={{ headerShown: false }}/>
//         <Tab.Screen name={t('tabs.map')} component={enhanceScreen(Map,{isNeedSafeArea:false})} options={{ headerShown: false }}/>
//         <Tab.Screen name={t('tabs.mine')} component={enhanceScreen(Mine,{isNeedSafeArea:false})} options={{ headerShown: false }}/>
//     </Tab.Navigator>)
// }
// export default AppBottomTab
