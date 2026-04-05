import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Image, TouchableOpacity, View,Text} from "react-native";
import GStyles, {appSize, NAVIGATOR_HEIGHT, TRUE_ONE_LINE} from "../../Components/GStyles";

function EarnDetailView({navigation,route}) {

    const data = route?.params?.item;

    console.log(route?.params?.item)

    const DetailHeader = () => {
        const insets = useSafeAreaInsets()
        return(<View style={{height:insets.top+NAVIGATOR_HEIGHT,width:'100%',paddingTop:insets.top,backgroundColor:'#ffffff',borderBottomColor:'#00000000',borderBottomWidth:TRUE_ONE_LINE}}>
            <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,GStyles.ph12,{height:NAVIGATOR_HEIGHT,width:'100%'}]}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack()
                }}>
                    <Image source={require('../../Assets/News/detail/detail_back.png')} style={{width:appSize(24),height:appSize(24)}} />
                </TouchableOpacity>

                <View style={{width:appSize(24)}} />

            </View>
        </View>)
    }

    return(<View style={{flex:1,backgroundColor:'#fff'}}>
        <DetailHeader />
        <Text style={[GStyles.ffb,{fontSize:36}]}>{data.title}</Text>
        <Image source={data.img} style={{marginTop:appSize(10),width:'100%',height:appSize(300)}} />
        <Text style={{marginTop:appSize(10),fontSize:14}}>{data.desc}</Text>

    </View>)
}

export default EarnDetailView
