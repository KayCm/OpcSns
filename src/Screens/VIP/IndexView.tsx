import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";
import DataList2 from "../../Components/DataList2/Index";
import GStyles, {appSize, TRUE_ONE_LINE, WINDOW_WIDTH} from "../../Components/GStyles";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {R_POST} from "../../Services/NetRequestService";
import InfiniteList from "../../Components/InfiniteList";
import DataList3 from '../../Components/DataList3/Index'
import Animated from "react-native-reanimated";
import PagerView from "react-native-pager-view";
import {useRef} from "react";


const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
function IndexView() {

    const inset = useSafeAreaInsets()

    const pagerRef = useRef(null)

    const renderHeader = () => {

        return(<View style={[GStyles.ac,GStyles.jcBetween,{height:appSize(320),marginBottom:appSize(30),width:'100%'}]}>

            <View style={[GStyles.ac]}>
                <ImageBackground source={require('../../Assets/Vip/exp1.png')}
                                 style={[GStyles.jc,GStyles.ac,{width:appSize(330),height:appSize(185)}]} >
                    <Image source={require('../../Assets/Vip/play.png')} style={{height:appSize(48),width:appSize(48)}} />


                    <View style={[GStyles.pa,GStyles.ac,GStyles.row,{paddingLeft:appSize(10),bottom:0,height:appSize(44),width:'100%',backgroundColor:'#8a8a8a50'}]}>
                        <Image source={require('../../Assets/Vip/videoview.png')} style={{height:appSize(13),width:appSize(13)}} />
                        <Text style={{marginLeft:appSize(4),color:'#fff',fontSize:appSize(12)}}>11.11W</Text>
                    </View>


                    <TouchableOpacity style={[GStyles.jc,GStyles.ac,{position: 'absolute',right:-appSize(10),bottom:appSize(20),backgroundColor:'#A5885F',width:appSize(76),height:appSize(28)}]} >
                        <Text style={{color:'#fff',fontSize:appSize(14)}}>立即观看</Text>
                    </TouchableOpacity>


                </ImageBackground>



                <ImageBackground source={require('../../Assets/Vip/opc_news.png')} resizeMode={'center'} style={{alignItems:'center',justifyContent:'center',width:'100%',height:appSize(52)}} imageStyle={{width:appSize(199),height:appSize(52)}}>
                    <Text numberOfLines={1} style={[GStyles.ffb,{fontSize:appSize(16),color:'#121212'}]}>AI+OPC 成地方经济新增长极</Text>
                </ImageBackground>
                <Text>2026年03月28日 第10期</Text>
            </View>

            <View style={{alignItems:'center'}}>
                <Image style={{width:appSize(21.45),height:appSize(13.06)}} source={require('../../Assets/Vip/union.png')} />
                <Text style={{color:'#A5885F',marginTop:appSize(10)}}>往期</Text>
            </View>


        </View>)
    }

    const renderRow = ({item}) => {

      return(<View key={item?.id} style={[GStyles.jc,GStyles.ac,{width:(WINDOW_WIDTH)/2,height:appSize(150)}]}>
          <View style={{width:appSize(168)}}>
              <View style={{width:appSize(168),height:appSize(94),backgroundColor:'#567'}} />
              <Text style={{marginTop:appSize(6)}} numberOfLines={1}>{item?.title}</Text>
              <Text style={{marginTop:appSize(2)}}>{item?.id}</Text>
          </View>
      </View> )
    }

    const MenuBar = () => {
        return(<View style={[GStyles.jc,{height:appSize(83)}]}>

            <View style={[GStyles.row,GStyles.jc,GStyles.atBase,{gap:appSize(30)}]} >
                <TouchableOpacity>
                    <Text style={[GStyles.ffb,{fontSize:18,zIndex:2}]}>硬核技术</Text>
                    <Image style={{marginTop:-appSize(8),height:appSize(11),width:appSize(42.52)}} source={require('../../Assets/Vip/menuIcon.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[GStyles.ffb,{fontSize:16}]}>商业落地</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[GStyles.ffb,{fontSize:16}]}>行业前瞻</Text>
                </TouchableOpacity>

            </View>

        </View> )}

    return(<ImageBackground imageStyle={{width:WINDOW_WIDTH,height:appSize(287)}} source={require('../../Assets/Vip/vipBg.png')} style={{flex:1,paddingTop:inset.top,backgroundColor:'#ffffff'}}>

        <MenuBar />

        <AnimatedPagerView ref={pagerRef} style={{ flex: 1, backgroundColor: '' }} onPageSelected={e => {}} initialPage={0}>

            <DataList3 key={1} numColumns={2} estimatedItemSize={appSize(150)}  renderHeader={renderHeader} renderRow={renderRow} url={'/open-api/mobile/home/material/normal/list'} params={{}} queryKey={'normal-list'} />


        </AnimatedPagerView>

    </ImageBackground>)
}

export default IndexView;
