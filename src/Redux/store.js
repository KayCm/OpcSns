import {configureStore} from '@reduxjs/toolkit';
import {persistStore,persistReducer} from 'redux-persist';
import {particleSliceReducer} from './persistedReducer';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { MMKV } from 'react-native-mmkv';
import {MMKVLoader} from "react-native-mmkv-storage";
// const storage = new MMKV();
// const reduxPersistStorage = {
//     setItem: (key, value) => {
//         storage.set(key, value);
//         return Promise.resolve(true);
//     },
//     getItem: (key) => {
//         const value = storage.getString(key);
//         return Promise.resolve(value);
//     },
//     removeItem: (key) => {
//         storage.delete(key);
//         return Promise.resolve();
//     },
// };

// 1. 初始化 MMKV 实例
const storage = new MMKVLoader().initialize();


export const persistConfig = {
  key: 'root',
  storage: storage,
    // whitelist: ['appData', 'userInfo'],
};

export const persistedReducer = persistReducer(persistConfig,particleSliceReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware:getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck:false
    })
});

export const persistor = persistStore(store)

