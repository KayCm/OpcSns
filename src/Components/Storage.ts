import {MMKVLoader} from "react-native-mmkv-storage";
import {createAsyncStoragePersister} from "@tanstack/query-async-storage-persister";
const MMK = new MMKVLoader().initialize()
export const  mmkvStorage = {
    getItem: (key) => {
        const value = MMK.getString(key);
        return value === undefined ? null : value; // getItem should return null if key doesn't exist
    },
    setItem: (key, value) => {
        MMK.setItem(key, value);
    },
    removeItem: (key) => {
        MMK.removeItem(key);
    },
};
export const asyncStoragePersister = createAsyncStoragePersister({
    storage: mmkvStorage,
})
