import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import News from '../Screens/News/IndexView'
import VIP from '../Screens/VIP/IndexView'
import Map from '../Screens/Map/IndexView'
import Mine from '../Screens/Mine/IndexView'
import {useLinkBuilder} from "@react-navigation/native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import { Text, View } from 'react-native';
import {PlatformPressable} from "@react-navigation/elements";
import {Route} from "@react-navigation/routers";
import { BlurView } from '@sbaiahmed1/react-native-blur';


function AppBottomTabBar({ state, descriptors, navigation }) {
    // const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();
    const insets = useSafeAreaInsets();

    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingBottom: insets.bottom,
          justifyContent: 'center',
          alignItems: 'center',
          height: 64 + insets.bottom,
        }}
      >
        <BlurView
          blurType="light"
          blurAmount={10}
          style={{
            flexDirection: 'row',
            height: 64,
            width: '80%',
            borderRadius: 32,
            borderWidth: 2,
            borderColor: '#12345670',
            padding: 5,
          }}
        >
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
            // let Icon:any = null;
            // switch (label) {
            //     default:
            //     case 'Launch':{
            //         Icon = isFocused ?  <LaunchIconOn /> : <LaunchIcon />
            //         break;
            //     }
            //     case 'Mine':{
            //         Icon = isFocused ?  <MineIconOn /> : <MineIcon />
            //         break;
            //     }
            // }

            return (
              <PlatformPressable
                key={index}
                href={buildHref(route.name, route.params)}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: isFocused ? '#12345670' : '',
                  borderRadius: 30,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {/*{Icon}*/}
                  <Text
                    style={{
                      color: isFocused ? '#ffffff' : '#1C1C1E',
                      // marginTop: 6,
                      fontSize: 12,
                      fontWeight: isFocused ? '600' : '400',
                    }}
                  >
                    {label}
                  </Text>
                </View>
              </PlatformPressable>
            );
          })}
        </BlurView>
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
    return (
        <Tab.Navigator initialRouteName={'NEWS'}
                       tabBar={props => <AppBottomTabBar {...props} />}>
            <Tab.Screen name="NEWS"
                        component={News}
                        options={{ headerShown: true }} />
            <Tab.Screen name="VIP"
                        component={VIP}
                        options={{ headerShown: true }} />
            <Tab.Screen name="MAP"
                        component={Map}
                        options={{ headerShown: false }} />
            <Tab.Screen name="MINE"
                        component={Mine}
                        options={{ headerShown: true }}
            />
        </Tab.Navigator>
    );
}