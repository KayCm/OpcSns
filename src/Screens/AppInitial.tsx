import {View} from "react-native";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";

function AppInitial(props) {

    const nav = props?.navigation

    const appData = useSelector(state => state?.appData);

    useEffect(()=>{

        console.log(props)

        if (appData?.token){
            nav.replace('AppBottomTab')
        }else {
            nav.replace('Login')
        }

    },[appData])

    return(<View />)
}

export default AppInitial
