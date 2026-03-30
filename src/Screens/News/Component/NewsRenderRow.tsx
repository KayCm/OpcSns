import {Image, Text, TouchableOpacity, View} from "react-native";
import GStyles, {appSize, TRUE_ONE_LINE} from "../../../Components/GStyles";
import {formatTimeAgo} from "../../../Components/Tools";

function NewsRenderRow({item,onPress}) {

    return (<TouchableOpacity activeOpacity={0.5} onPress={()=>{
        if (onPress)onPress(item)
    }} style={[GStyles.ph12,GStyles.pv10,{backgroundColor:'#fff',marginBottom:5}]}>
        <View style={[GStyles.row,{gap:10}]}>
            <View style={[GStyles.jcBetween,{flex:1}]}>
                <Text style={{fontSize:18}}>{item?.item?.id}-{item?.item?.title}</Text>
                <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween]}>
                    <View style={[GStyles.jc,GStyles.ac,{height:20,paddingHorizontal: appSize(5),backgroundColor:'#F0EBE4',borderRadius:2}]}>
                        <Text style={{color:'#A5885F'}}>已订阅</Text>
                    </View>
                    <View style={[GStyles.row,GStyles.ac,GStyles.jc,{gap:5}]}>
                        <Text>{formatTimeAgo(item?.item?.publishTime)}</Text>
                        <Text>{item?.item?.source}</Text>
                    </View>

                </View>
            </View>
            <Image style={{height:100,width:100,backgroundColor:'#123',borderRadius:5}}/>
        </View>
    </TouchableOpacity>)
}

export default NewsRenderRow
