import {View} from "react-native";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import { useQuery } from '@tanstack/react-query';
import { R_POST } from '../Services/NetRequestService.ts';
import AsyncStorage from "@react-native-async-storage/async-storage";

function AppInitial(props) {

    const nav = useNavigation()

    const appData = useSelector(state => state?.appData);
    useEffect(()=>{

        console.log('props',props)
        console.log('appData',appData)

        AsyncStorage.getAllKeys().then(keys => {
            console.log('AsyncStorage Key:', keys);
        });

        if (appData?.token){
            global.token = appData.token;
            // nav.replace('AppBottomTab')
            nav.reset({
                index: 0,
                routes: [{ name: 'AppBottomTab' }],
            });
        }else {
            // nav.replace('Login')
            nav.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });

        }

    },[appData])

    return(<View />)
}

export default AppInitial
