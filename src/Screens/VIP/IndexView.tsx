import {View, Text, Image, TouchableOpacity, ImageBackground, Alert} from "react-native";
import GStyles, {appSize, WINDOW_WIDTH} from "../../Components/GStyles";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import DataList3 from '../../Components/DataList3/Index'
import {useRef} from "react";
import {useQuery} from "@tanstack/react-query";
import {R_POST} from "../../Services/NetRequestService";
import TurboImage from "react-native-turbo-image";


function IndexView(props) {

    const inset = useSafeAreaInsets()

    const pagerRef = useRef(null)

    const {navigation,route} = props

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['actHeader'],
        queryFn: ()=> R_POST('/open-api/mobile/activity/banner/list',{
            "pageNum": 1,
            "pageSize": 10
        }),
        gcTime:0
    })

    if (isPending)return null

    if (error){
        return <Text>error</Text>
    }

    const renderHeader = () => {

        console.log(data?.data[0])

        // imageUrl

        return(<View style={[GStyles.ac,GStyles.ph12,GStyles.jcBetween,{height:appSize(260),width:'100%'}]}>

            <TouchableOpacity onPress={()=>{
                navigation.push('ActivityDetail',{id:data?.data[0]?.activityId})
            }} style={[GStyles.ac]}>
                <TurboImage
                    source={{ uri:data?.data[0]?.imageUrl}}
                    style={{width:WINDOW_WIDTH-appSize(24),borderRadius:appSize(5),height:appSize(185),backgroundColor:'#567'}}
                    resizeMode="cover"
                />
                <ImageBackground resizeMode={'center'} style={{alignItems:'center',justifyContent:'center',width:'100%',height:appSize(52)}} imageStyle={{width:appSize(199),height:appSize(52)}}>
                    <Text numberOfLines={1} style={[GStyles.ffb,{fontSize:appSize(16),color:'#121212'}]}>{data?.data[0]?.bannerName}</Text>
                </ImageBackground>
                <Text numberOfLines={1} style={{color:'#8a8a8a'}}>{data?.data[0]?.createTime}</Text>
            </TouchableOpacity>

        </View>)
    }

    const renderRow = ({item}) => {

        console.log(item)

      return(<TouchableOpacity onPress={()=>{
          // ActivityDetailView organizerAvatar

          navigation.push('ActivityDetail',{id:item?.id})

      }} key={item?.id} style={[GStyles.jc,GStyles.ac,{width:(WINDOW_WIDTH)/2,height:appSize(150)}]}>
          <View style={{width:appSize(168)}}>

              <TurboImage
                  source={{ uri:item?.posterUrl}}
                  style={{width:appSize(168),height:appSize(94),borderRadius:appSize(5)}}
                  resizeMode="cover"
              />
              <Text style={{marginTop:appSize(6)}} numberOfLines={1}>{item?.activityName}</Text>
              <Text style={{marginTop:appSize(2)}}>{item?.createTime}</Text>
          </View>
      </TouchableOpacity> )
    }

    const MenuBar = () => {
        return(<View style={[GStyles.jc,{height:appSize(83)}]}>

            <View style={[GStyles.row,GStyles.jc,GStyles.atBase,{gap:appSize(30)}]} >

                    <Text style={[GStyles.ffb,{fontSize:16}]}>活动</Text>

            </View>

        </View> )}

    return(<ImageBackground imageStyle={{width:WINDOW_WIDTH,height:appSize(287)}} source={require('../../Assets/Vip/vipBg.png')} style={{flex:1,paddingTop:inset.top,backgroundColor:'#ffffff'}}>

        <MenuBar />

        <DataList3 key={1} numColumns={2} estimatedItemSize={appSize(150)}  renderHeader={renderHeader} renderRow={renderRow} url={'/open-api/mobile/activity/list'} params={{}} queryKey={'act-list'} />


    </ImageBackground>)
}

export default IndexView;
