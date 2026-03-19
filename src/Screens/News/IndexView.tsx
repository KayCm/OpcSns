import {View, Text, TouchableOpacity, TextInput, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/persistedReducer';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import GStyles, {NAVIGATOR_HEIGHT, TRUE_ONE_LINE} from "../../Components/GStyles";
import IconAvatar from "../../Assets/Svgs/IconAvatar";
import IconSearch from "../../Assets/Svgs/IconSearch";
import DataList from "../../Components/DataList";

function IndexView() {
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const particleUserInfo = useSelector(state => state?.userInfo);

    const NewsHeader = () => {
        const insets = useSafeAreaInsets()
        return(<View style={{height:insets.top+NAVIGATOR_HEIGHT,width:'100%',paddingTop:insets.top,backgroundColor:'#ffffff',borderBottomColor:'#00000030',borderBottomWidth:TRUE_ONE_LINE}}>
            <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,GStyles.ph12,{height:NAVIGATOR_HEIGHT,width:'100%'}]}>
                <Text style={{fontSize:18,fontWeight:'800'}}>OPC NEWS</Text>
                <View style={[GStyles.row,GStyles.ac,GStyles.ac,{gap:10}]}>
                    <IconSearch />
                    <IconAvatar />
                </View>
            </View>
        </View>)
    }


    function renderRow(item) {
        return (<TouchableOpacity activeOpacity={0.5} onPress={()=>{
            navigation.navigate('Detail')
        }} style={[GStyles.ph12,GStyles.pv12]}>
            <View style={[GStyles.row,{gap:10,borderBottomWidth:TRUE_ONE_LINE,borderColor:'#00000030',paddingBottom:10}]}>
                <View style={[GStyles.jcBetween,{flex:1}]}>
                    <Text style={{fontSize:18}}>{item?.item?.id}-{item?.item?.volumeInfo?.title}</Text>
                    <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween]}>
                        <View style={[GStyles.row,GStyles.ac,GStyles.jc,{gap:5}]}>
                            <View style={[GStyles.jc,GStyles.ac,{height:20,width:40,backgroundColor:'red',borderRadius:2}]}>
                                <Text style={{color:'#fff'}}>VIP</Text>
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

    const renderHeader = () => {

        return(<View style={[GStyles.ph12,{marginTop:10}]}>
            <View style={{height:160,width:'100%',backgroundColor:'#213',borderRadius:2}}>

            </View>

            <View style={{width:'100%',borderRadius:2,gap:10,marginTop:10}}>
                {[1,2,3].map((value, index, array)=>{

                    return(<View key={index}>
                        <Text numberOfLines={3} style={{fontSize:12}}><Text style={{backgroundColor:'red',borderRadius:2,color:'#fff'}}> HOT </Text> 3月19日，外交部发言人林剑回应美情报官员所谓“中国大陆并未计划在2027年‘入侵’台湾”的说法，明确台湾问题是中国内政，不容外部干涉，要求美方恪守一个中国原则，停止炒作“中国威胁论</Text>
                    </View>)

                })}
            </View>


        </View>)
    }

    return (
      <View style={{ flex: 1 }}>

          <NewsHeader />

          <DataList renderHeader={renderHeader} renderRow={renderRow} />




      </View>);
}

export default IndexView;
