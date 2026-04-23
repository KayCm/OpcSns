import {Image, Text, TouchableOpacity, View} from "react-native";
import GStyles, {appSize, TRUE_ONE_LINE} from "../../../Components/GStyles";
import {formatTimeAgo} from "../../../Components/Tools";
import TurboImage from "react-native-turbo-image/src/TurboImage";
import {COLORS} from "../../../Components/Constant";
import {storage} from "../../../Redux/store";
import {useEffect} from "react";

function NewsRenderRow({item,readList,onPress}) {


    // const getArr = () => {
    //     const jsonString = storage.getString('readListKey');
    //     if (jsonString) {
    //         const parsedArray = JSON.parse(jsonString);
    //         return parsedArray;
    //     }else{
    //         return []
    //     }
    // }
    //
    //
    // const saveUserList = (id) => {
    //     const arr = getArr()
    //     const jsonString = JSON.stringify(arr.push(id));
    //     storage.set('readListKey', jsonString);
    // };




    return (<TouchableOpacity activeOpacity={0.5} onPress={()=>{
        if (onPress)onPress(item)
    }} style={[GStyles.ph12,GStyles.jc,{backgroundColor:'#fff',marginBottom:5,height:appSize(112)}]}>

        <View style={[GStyles.row]}>
            <View style={[GStyles.jcBetween,{flex:1,paddingRight:appSize(18),height: appSize(80)}]}>

                <Text numberOfLines={2} ellipsizeMode="tail" style={[GStyles.ffh11,{color:readList?.includes(item?.item?.id)?'#8a8a8a':COLORS.FONTBLACK,fontSize:appSize(14)}]}>{item?.item?.title?.replace(/\r?\n|\r/g, '')}</Text>
                <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween]}>
                    <View style={[GStyles.row,GStyles.ac,GStyles.jc,{gap:5}]}>
                        <Text style={{fontSize:appSize(13),color:'#909090'}}>{formatTimeAgo(item?.item?.onlineTime)}</Text>
                    </View>

                    <Text style={{fontSize:appSize(13),color:'#909090'}}>{item?.item?.author}</Text>
                    {/*<View style={[GStyles.jc,GStyles.ac,{height:20,paddingHorizontal: appSize(5),backgroundColor:'#F0EBE4',borderRadius:2}]}>*/}
                    {/*    <Text style={{color:'#A5885F'}}>已订阅</Text>*/}
                    {/*</View>*/}

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
