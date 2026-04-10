import {View, Text, ImageBackground, Image, FlatList, TouchableOpacity, Alert} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import GStyles, {appSize, WINDOW_WIDTH} from "../../Components/GStyles";
import TurboImage from "react-native-turbo-image";
import {useSelector} from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import DataList3 from "../../Components/DataList3/Index";
import {COLORS} from "../../Components/Constant";

function IndexView({navigation,route}) {

    const inset = useSafeAreaInsets()

    const userInfo = useSelector(state => state?.userInfo);

    const Hearder = () => {
        return(<View style={[GStyles.jc,{height:appSize(64)}]}>
            <View style={[GStyles.row,GStyles.jc,GStyles.ac,{gap:appSize(30)}]} >
                <Text style={[GStyles.ffb,{fontSize:24}]}>赚钱薪计划</Text>
            </View>
        </View> )}

    const InfoBar = () => {

        return(<View style={[GStyles.row,GStyles.ac,GStyles.ph16,{gap:appSize(10)}]}>

            <TurboImage
                source={{ uri:userInfo?.avatar}}
                style={{ width: appSize(68), height: appSize(68),borderRadius:appSize(34) }}
                resizeMode="cover"
            />
            <View style={[GStyles.jcBetween,{ paddingVertical: appSize(3),height: appSize(68),flex:1}]}>
                <Text style={{fontSize:appSize(18),fontWeight:'600',color:COLORS.FONTBLACK}}>你好～{userInfo?.username}</Text>

                <View style={{}}>
                    <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween]}>
                        <Text style={{fontSize:appSize(12),color:COLORS.FONTBLACK}}>成长值 Lv.2</Text>
                        <Text style={{fontSize:appSize(12),color:COLORS.FONTBLACK}}>111/200</Text>
                    </View>

                    <View style={{marginTop:appSize(4)}}>
                        <View style={{height:appSize(20),borderWidth:1,borderColor:'#1C1A17',width:'100%',}}>
                            <View style={{height:appSize(20)-2,width:'50%',backgroundColor:'#a5885f'}} />
                        </View>
                    </View>
                </View>


            </View>


        </View>)

    }

    const FinanceBar = ()=>{


        return(<View style={[GStyles.ac,GStyles.ph16,{width:'100%',height:appSize(140),marginTop:appSize(10)}]}>

            <ImageBackground source={require('../../Assets/earn/Financial.png')} style={[GStyles.pa,GStyles.ac,GStyles.flexEnd,{zIndex:2,width:appSize(180),height:appSize(35)}]}>
                <Text style={[GStyles.ffb,{fontSize:appSize(18)}]} >本月财报</Text>
            </ImageBackground>

            <ImageBackground source={require('../../Assets/earn/midBg.png')} style={[GStyles.row,{width:'100%',height:appSize(120),borderRadius:appSize(5),marginTop:appSize(20)}]}>

                <View style={[GStyles.jc,GStyles.ac,{flex:1,gap:appSize(10)}]}>
                    <Text style={[GStyles.ffb,{fontSize:18,color:'#000'}]}>3000</Text>
                    <Text style={{color:'#909090'}}>总收入</Text>
                </View>

                <View style={[GStyles.jc,GStyles.ac,{flex:1,gap:appSize(10)}]}>
                    <Text style={[GStyles.ffb,{fontSize:18,color:'#000'}]}>3000</Text>
                    <Text style={{color:'#909090'}}>总支出</Text>
                </View>


                <View style={[GStyles.jc,GStyles.ac,{flex:1,gap:appSize(10)}]}>
                    <Text style={[GStyles.ffb,{fontSize:18,color:'#000'}]}>3000</Text>
                    <Text style={{color:'#909090'}}>净利润</Text>
                </View>
            </ImageBackground>




        </View>)

    }

    const renderHeader = ()=>{


        return (<View>
            <InfoBar />
            <FinanceBar />

            <View style={{width:'100%',alignItems:'center',marginTop:appSize(10)}}>
                <Text style={[GStyles.ffb,{color:'#a5885f'}]}>赚钱计划</Text>
                {/*<Image sytle={{width:32.5,height:20,backgroundColor:'#123'}} source={require('../../Assets/Vip/union.png')} />*/}
            </View>
        </View>)

    }

    const dataList = [
        {title:'MSN兼职',desc:'每单300元起，需面试',img:require('../../Assets/earn/1.png')},
        {title:'抖音小店',desc:'1v1陪练代教，稳定副业',img:require('../../Assets/earn/2.png')},
        {title:'网易伏羲',desc:'每单0.7元',img:require('../../Assets/earn/3.png')},
        {title:'专业人才招聘',desc:'具体查看详情',img:require('../../Assets/earn/4.png')},
    ]

    const renderRow = ({item}) => {

        return(<View key={item?.id} style={[GStyles.jc,GStyles.ac,{width:(WINDOW_WIDTH)/2,height:appSize(150)}]}>
            <TouchableOpacity onPress={()=>{
                //EarnDetail
                // navigation.push('EarnDetail',{item:item})
                Alert.alert('敬请期待！')
            }} style={{width:appSize(168)}}>
                <Image source={item?.img} style={{width:appSize(168),height:appSize(94),borderRadius:appSize(5)}} />
                <Text style={[GStyles.ffh11,{color:'#1C1A17',fontSize:appSize(14),marginTop:appSize(6)}]} numberOfLines={1}>{item?.title}</Text>
                <Text style={{fontSize:appSize(12),color:'#828282',marginTop:appSize(2)}}>{item?.desc}</Text>
            </TouchableOpacity>
        </View> )
    }

    //F0EBE4
    return(<ImageBackground  style={{flex:1}} source={require('../../Assets/earn/earnBg.png')}>
        <View style={{flex:1,paddingTop:inset.top}}>
            <Hearder />

            <FlatList style={{flex:1}}
                      contentContainerStyle={{width: '100%',}}
                      data={dataList}
                      numColumns={2}
                      ListHeaderComponent={renderHeader}
                      renderItem={renderRow} />

            {/*<DataList3 key={1} numColumns={2} estimatedItemSize={appSize(150)}  renderHeader={renderHeader} renderRow={renderRow} url={'/open-api/mobile/home/material/normal/list'} params={{}} queryKey={'normal-list'} />*/}
        </View>
        </ImageBackground>)
}

export default IndexView;
