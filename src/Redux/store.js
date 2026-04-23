import {configureStore} from '@reduxjs/toolkit';
import {persistStore,persistReducer} from 'redux-persist';
import {particleSliceReducer} from './persistedReducer';
import {MMKVLoader} from "react-native-mmkv-storage";
export const storage = new MMKVLoader().initialize();
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

