import {configureStore} from '@reduxjs/toolkit';
import {persistStore,persistReducer} from 'redux-persist';
import {particleSliceReducer} from './persistedReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
    whitelist: ['appData', 'userInfo'],
};

export const persistedReducer = persistReducer(persistConfig,particleSliceReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware:getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck:false
    })
});

export const persistor = persistStore(store)

