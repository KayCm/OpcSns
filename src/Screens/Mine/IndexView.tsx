import {View, Text, ScrollView, TouchableOpacity} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import GStyles from "../../Components/GStyles";
import { Shadow } from 'react-native-shadow-2';
import {useTranslation} from "react-i18next";

function IndexView() {

   const area = useSafeAreaInsets()

    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };


    return(<View style={{flex:1,paddingTop:area.top}}>
        <ScrollView style={[GStyles.ph12]}>

            <View style={[GStyles.row,GStyles.ac,{marginBottom:10}]}>

                <TouchableOpacity onPress={()=>{
                    changeLanguage('en')
                }}  style={{width:64,height:64,borderRadius:32,backgroundColor:'#123'}}/>


                <View style={{gap:10,marginLeft:10}}>
                    <Text>NickName</Text>
                    <Text>2026-04-15</Text>
                </View>
            </View>

            <Shadow distance={3}>
                <View style={[GStyles.row,GStyles.ac,{borderRadius:5,backgroundColor:'#fff',width:'100%',height:64}]}>
                </View>
            </Shadow>



        </ScrollView>
    </View>)
}

export default IndexView;
