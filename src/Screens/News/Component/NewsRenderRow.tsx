import {Image, Text, TouchableOpacity, View} from "react-native";
import GStyles, {appSize, TRUE_ONE_LINE} from "../../../Components/GStyles";
import {formatTimeAgo} from "../../../Components/Tools";
import TurboImage from "react-native-turbo-image/src/TurboImage";

function NewsRenderRow({item,onPress}) {

    return (<TouchableOpacity activeOpacity={0.5} onPress={()=>{
        if (onPress)onPress(item)
    }} style={[GStyles.ph12,GStyles.jc,{backgroundColor:'#fff',marginBottom:5,height:appSize(112)}]}>

        <View style={[GStyles.row]}>
            <View style={[GStyles.jcBetween,{flex:1,paddingRight:appSize(18),height: appSize(80)}]}>

                <Text numberOfLines={3} style={[GStyles.ffh3,{fontSize:appSize(14)}]}>{item?.item?.title?.replace(/\r?\n|\r/g, '')}</Text>
                <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween]}>

                    <Text style={{fontSize:appSize(12)}}>{item?.item?.author}</Text>
                    {/*<View style={[GStyles.jc,GStyles.ac,{height:20,paddingHorizontal: appSize(5),backgroundColor:'#F0EBE4',borderRadius:2}]}>*/}
                    {/*    <Text style={{color:'#A5885F'}}>已订阅</Text>*/}
                    {/*</View>*/}
                    <View style={[GStyles.row,GStyles.ac,GStyles.jc,{gap:5}]}>

                        <Text style={{fontSize:appSize(12)}}>{formatTimeAgo(item?.item?.onlineTime)}</Text>
                    </View>
                </View>

            </View>

            {item?.item?.coverImage && <TurboImage
                source={{ uri:item?.item?.coverImage}}
                style={{ width: appSize(108), height: appSize(80),borderRadius:appSize(5) }}
                resizeMode="cover"/> }

        </View>

    </TouchableOpacity>)
}

//

export default NewsRenderRow
