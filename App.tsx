/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './src/Components/i18n';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/Navigator/AppNavigator.tsx';
import {asyncStoragePersister} from "./src/Components/Storage";
import {QueryClient} from "@tanstack/react-query";
import {StatusBar} from "react-native";
import { store} from './src/Redux/store'
import { Provider } from 'react-redux';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
        },
    },
})

function App() {
    // const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaProvider>
            <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}
                                        onSuccess={() => {
                                            console.log('缓存恢复成功')
                                        }}
                                        onError={(error) => {
                                            console.log('缓存恢复失败:', error);
                                            // 可以在这里实现错误恢复逻辑
                                        }}>
              <Provider store={store}>
                <StatusBar barStyle={'light-content'} />
                <AppNavigator />
              </Provider>
            </PersistQueryClientProvider>
        </SafeAreaProvider>
    );
}


export default App;
