import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { theme } from '../theme'; // 假设你有主题配置

export const AppNavigator = () => {
    return (
        <NavigationContainer
            // theme={theme.navigationTheme} // 适配深色模式
            linking={{
                prefixes: ['myapp://', 'https://myapp.com'],
                config: {
                    screens: {
                        Home: '',
                        Profile: 'user/:userId',
                    },
                },
            }}>
            {/*<RootNavigator />*/}
        </NavigationContainer>
    );
};
