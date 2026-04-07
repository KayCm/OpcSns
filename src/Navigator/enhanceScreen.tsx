import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, RouteProp } from '@react-navigation/native';

// 定义导航器对象的类型
interface Navigator {
    push: (route: Record<string, any>) => void;
    pop: (n?: number) => void;
    popToTop: () => void;
    replace: (route: Record<string, any>) => void;
    navigate: (routeName: string, params?: object) => void;
    reset: any; // 可以根据实际需要细化类型
    addListener: any;
    dispatch: any;
    dangerouslyGetParent: any;
}

// 定义组件的 Props 类型，假设 Screen 组件接收这些 props
interface ScreenProps {
    navigator: Navigator;
    navigation: NavigationProp<any>;
    route: RouteProp<any, any>;
}

// 定义 enhanceScreen 函数的配置参数类型
interface EnhanceScreenConfig {
    isNeedSafeArea?: boolean;
}

// 定义 NavigationScreen 的 Props 类型
interface NavigationScreenProps {
    navigation: NavigationProp<any>;
    route: RouteProp<any, any>;
}

// 定义 NavigationScreen 的 State 类型
interface NavigationScreenState {
    RingShow: boolean;
}

// 定义 Screen 组件的类型（可以是函数组件或类组件）
type ScreenComponent = React.ComponentType<ScreenProps> & {
    navigationOptions?: any; // 可选，React Navigation 的静态配置
};

// 增强函数
const enhanceScreen = (
    Screen: ScreenComponent | null,
    config: EnhanceScreenConfig = {}
): React.ComponentType<NavigationScreenProps> | null => {
    if (!Screen) return null;

    const { isNeedSafeArea = false } = config;

    let latestTriggerInfo = {
        pageName: '',
        time: 0,
    };

    class NavigationScreen extends React.Component<
        NavigationScreenProps,
        NavigationScreenState
        > {
        constructor(props: NavigationScreenProps) {
            super(props);
            this.state = {
                RingShow: false,
            };
        }

        componentDidMount(): void {
            // 原代码为空，保持
        }

        static navigationOptions = Screen.navigationOptions
            ? (props: any) => {
                let options = Screen.navigationOptions;
                if (typeof Screen.navigationOptions === 'function') {
                    options = Screen.navigationOptions(props);
                }
                return {
                    ...options,
                };
            }
            : {};

        render() {
            const { navigation, route } = this.props;

            // 内部导航辅助函数
            function navigate(pageName: string, param: any = {}, method: string = 'navigate') {
                const now = Date.now();
                if (pageName === latestTriggerInfo.pageName && now - latestTriggerInfo.time < 500) {
                    // 500ms 内不允许连续两次触发相同的路由
                    return;
                }

                latestTriggerInfo = {
                    pageName,
                    time: now,
                };
                (navigation as any)[method](pageName, param);
            }

            const navigator: Navigator = {
                push: (route: Record<string, any>) => {
                    const keys = Object.keys(route);
                    if (keys.length > 0) {
                        const pageName = keys[0];
                        let param = route[pageName];

                        if (param && param.target && param.currentTarget && param.nativeEvent) {
                            // 这种情况一般是 bind 方法，把点击事件当作参数传进来了
                            param = {};
                        }
                        navigate(pageName, param, 'push');
                    }
                },

                pop: (n = 1) => {
                    navigation.pop(n);
                },

                popToTop: () => {
                    navigation.popToTop();
                },

                replace: (route: Record<string, any>) => {
                    let routeName: string | false = false;
                    let params = {};
                    const keys = Object.keys(route);
                    if (keys.length > 0) {
                        routeName = keys[0];
                        params = route[routeName];
                    }
                    if (routeName) {
                        navigate(routeName, params, 'replace');
                    }
                },

                navigate: (routeName: string, params?: object) => {
                    navigate(routeName, params);
                },

                reset: navigation.reset,
                addListener: navigation.addListener,
                dispatch: navigation.dispatch,
                // dangerouslyGetParent: navigation.dangerouslyGetParent,
            };

            const screenDom = (<Screen navigator={navigator} navigation={navigation} route={route} />);

            if (isNeedSafeArea) {
                return <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>{screenDom}</SafeAreaView>;
            } else {
                return screenDom;
            }
        }
    }

    return NavigationScreen;
};

export default enhanceScreen;
