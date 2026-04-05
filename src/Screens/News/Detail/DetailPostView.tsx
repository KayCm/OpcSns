import {Image, TouchableOpacity, View, Text, ImageBackground} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import GStyles, {appSize, NAVIGATOR_HEIGHT, TRUE_ONE_LINE} from "../../../Components/GStyles";
import {useQuery} from "@tanstack/react-query";
import {R_POST} from "../../../Services/NetRequestService";
import { Shadow } from 'react-native-shadow-2';
import {getDateInfo} from "../../../Components/Tools";

function DetailPostView({navigation,route}) {

    const insets = useSafeAreaInsets();
    const item = route?.params?.item

    const { isPending, isError, data, error } = useQuery({
        queryKey: [String('detail'+item?.id.toString())],
        queryFn: ()=> R_POST('/open-api/mobile/content/material/detail',{id:route?.params?.item?.id}),
        staleTime: 1000 * 60 * 60 * 24
    })
    //
    if (isPending)return null

    const dateObj = getDateInfo('zh')

    const DetailHeader = () => {

        return(<View style={{height:insets.top+NAVIGATOR_HEIGHT,width:'100%',paddingTop:insets.top,borderBottomColor:'#00000000',borderBottomWidth:TRUE_ONE_LINE}}>
            <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,GStyles.ph12,{height:NAVIGATOR_HEIGHT,width:'100%'}]}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack()
                }}>
                    <Image source={require('../../../Assets/News/detail/detail_back.png')} style={{width:appSize(24),height:appSize(24)}} />
                </TouchableOpacity>
                <View style={{width:appSize(24)}} />
            </View>
        </View>)
    }

    return(<LinearGradient colors={['#F0EBE4', '#ffffff']} style={{flex:1}}>
        <View style={{flex:1}}>
        <DetailHeader />

        <View style={{paddingHorizontal:appSize(24)}}>
            {/*<Shadow distance={3}>*/}
                <View style={{paddingHorizontal:appSize(25),paddingBottom:appSize(30),backgroundColor:'#fff',width:'100%',marginTop:appSize(65)}}>
                    <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,{height:appSize(70),marginBottom:appSize(20),width:'100%',borderBottomColor:'#123',borderBottomWidth:1}]}>

                        <ImageBackground source={require('../../../Assets/News/news_bg.png')} style={[GStyles.row,GStyles.jc,{alignItems:'flex-end',height:appSize(28),width:appSize(98)}]}>
                            <Text style={[GStyles.ffh1,{color:'#000'}]}>NEXA</Text>
                            <Text style={[GStyles.ffh1,{color:'#A5885F'}]}>简讯</Text>
                        </ImageBackground>

                        <View style={[GStyles.row,GStyles.jc,GStyles.ac,{width:appSize(55),height:appSize(28),backgroundColor:'#F0EBE4',borderColor:'#E0CAAA',borderWidth:1}]} >

                            <View style={{alignItems:'flex-end',paddingRight:appSize(3)}}>
                                <Text style={[{fontSize:appSize(9),backgroundColor:''}]}>{dateObj?.weekday}</Text>
                                <Text style={[{fontSize:appSize(9),backgroundColor:''}]}>{dateObj?.month}</Text>
                            </View>

                            <View style={{height:appSize(20),width:1,backgroundColor:'#E0CAAA'}} />

                            <Text style={[GStyles.ffh1,{fontSize:appSize(18),fontWeight:'600',paddingLeft: appSize(5)}]}>{dateObj?.day}</Text>
                        </View>

                    </View>

                    {/*<Text>{data?.data?.material?.title}</Text>*/}
                    <Text style={{lineHeight:appSize(30)}}>{data?.data?.material?.content}</Text>
                </View>
            {/*</Shadow>*/}
        </View>






        </View>
    </LinearGradient>)
}

export default DetailPostView
