import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="News"
            screenOptions={({ route }) => ({
                headerShown: false, // 隐藏 Tab 层级的 Header，由子 Stack 控制
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string;

                    // if (route.name === 'HomeTab') {
                    //     iconName = focused ? 'home' : 'home-outline';
                    // } else if (route.name === 'MarketTab') {
                    //     iconName = focused ? 'grid' : 'grid-outline';
                    // } else if (route.name === 'OrderTab') {
                    //     iconName = focused ? 'list' : 'list-outline';
                    // } else if (route.name === 'MineTab') {
                    //     iconName = focused ? 'person' : 'person-outline';
                    // } else {
                    //     iconName = 'help-circle-outline';
                    // }

                    //return <Ionicons name={iconName} size={size} color={color} />;

                    return null
                },
                tabBarActiveTintColor: '#007AFF', // 选中颜色
                tabBarInactiveTintColor: '#8e8e93', // 未选中颜色
                tabBarStyle: {
                    paddingBottom: 5, // 适配 iPhone 底部安全区
                    paddingTop: 5,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            })}
        >
            {/*<Tab.Screen*/}
            {/*    name="News"*/}
            {/*    component={NewsStack}*/}
            {/*    options={{ title: 'NEWS' }}*/}
            {/*/>*/}
            {/*<Tab.Screen*/}
            {/*    name="Vip"*/}
            {/*    component={VIPStack}*/}
            {/*    options={{ title: 'VIP' }}*/}
            {/*/>*/}
            {/*<Tab.Screen*/}
            {/*    name="Map"*/}
            {/*    component={MapStack}*/}
            {/*    options={{ title: 'MAP' }}*/}
            {/*/>*/}
            {/*<Tab.Screen*/}
            {/*    name="Mine"*/}
            {/*    component={MineStack}*/}
            {/*    options={{ title: 'MINE' }}*/}
            {/*/>*/}
        </Tab.Navigator>
    );
};
