import {Image, Text, TouchableOpacity, View} from "react-native";
import GStyles, {TRUE_ONE_LINE} from "../../../Components/GStyles";

function NewsRenderRow({item,onPress}) {

    console.log(item)

    return (<TouchableOpacity activeOpacity={0.5} onPress={()=>{
        if (onPress)onPress(item)
    }} style={[GStyles.ph12,GStyles.pv12]}>
        <View style={[GStyles.row,{gap:10,borderBottomWidth:TRUE_ONE_LINE,borderColor:'#00000030',paddingBottom:10}]}>
            <View style={[GStyles.jcBetween,{flex:1}]}>
                <Text style={{fontSize:18}}>{item?.item?.id}-{item?.item?.title}</Text>
                <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween]}>
                    <View style={[GStyles.row,GStyles.ac,GStyles.jc,{gap:5}]}>
                        <View style={[GStyles.jc,GStyles.ac,GStyles.ph10,{height:20,backgroundColor:'red',borderRadius:2}]}>
                            <Text style={{color:'#fff'}}></Text>
                        </View>
                        <Text>1小时前</Text>
                    </View>
                    <Text>Foxs News</Text>
                </View>
            </View>
            <Image style={{height:100,width:100,backgroundColor:'#123',borderRadius:5}}/>
        </View>
    </TouchableOpacity>)
}

export default NewsRenderRow
