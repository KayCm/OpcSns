import {View} from "react-native";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import { useQuery } from '@tanstack/react-query';
import { R_POST } from '../Services/NetRequestService.ts';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {MMKVLoader, useMMKVStorage} from "react-native-mmkv-storage";
function AppInitial(props) {

    const nav = useNavigation()

    const appData = useSelector(state => state?.appData);
    const appSettings = new MMKVLoader().withInstanceID("appSettings").initialize();
    const [reviewStatus, setReviewStatus] = useMMKVStorage('isReview', appSettings, 999);
    useEffect(()=>{

        R_POST('/open-api/mobile/publishConfig/status',{platformType:'ios'}).then(res=>{
            console.log('res',res)
            if (res?.code == 200){
                setReviewStatus(res?.data?.publishStatus)
            }
        })

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
