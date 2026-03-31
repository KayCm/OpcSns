import {View,Text, TouchableOpacity} from "react-native";
import WebView from 'react-native-webview';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import GStyles, {NAVIGATOR_HEIGHT, TRUE_ONE_LINE} from "../../../Components/GStyles";
import IconNavBack from "../../../Assets/Svgs/IconNavBack";
import IconMore from "../../../Assets/Svgs/IconMore";
import {useNavigation} from "@react-navigation/native";
import {Video } from 'react-native-video';
import {useQuery} from "@tanstack/react-query/build/modern";
import {R_POST} from "../../../Services/NetRequestService";

function IndexView(props: any) {

   const nav = useNavigation()

    const item = props?.route?.params?.item


    const { isPending, isError, data, error } = useQuery({
        queryKey: ['banner'],
        queryFn: ()=> R_POST('/open-api/mobile/content/material/detail',{id:props?.route?.params?.item?.id}),
    })



    if (isPending)return null

    console.log('data:',data)



    const insets = useSafeAreaInsets();



    // const html = props?.route?.params?.html

    const DetailHeader = () => {
        const insets = useSafeAreaInsets()
        return(<View style={{height:insets.top+NAVIGATOR_HEIGHT,width:'100%',paddingTop:insets.top,backgroundColor:'#ffffff',borderBottomColor:'#00000030',borderBottomWidth:TRUE_ONE_LINE}}>
            <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,GStyles.ph12,{height:NAVIGATOR_HEIGHT,width:'100%'}]}>
                <TouchableOpacity onPress={()=>{
                    nav.goBack()
                }}>
                    <IconNavBack />
                </TouchableOpacity>
                <Text style={{fontSize:18,fontWeight:'800'}}>OPC NEWS</Text>
                <TouchableOpacity style={[GStyles.jc,GStyles.ac,{width:32,height:32}]}>
                    <IconMore />
                </TouchableOpacity>
            </View>
        </View>)
    }

    const VipBanner = () => {
      return(<View style={[GStyles.pa,GStyles.row,GStyles.ac,{bottom:0,left:0,width:'100%',height:54+insets.bottom,backgroundColor:'#123'}]}>

          <View style={[GStyles.jc,GStyles.ac,{flex:1,backgroundColor:'#fcefbd',height:54+insets.bottom}]} >
              <Text style={{fontSize:14,fontWeight:'400',color:'#000'}}>本义为精英VIP专享文章</Text>
          </View>

          <TouchableOpacity style={[GStyles.jc,GStyles.ac,{width:150,height:54+insets.bottom,backgroundColor:'#FFCC00'}]} >
              <Text style={{fontSize:20,fontWeight:'600',color:'#fff'}}>立即开通</Text>
          </TouchableOpacity>



      </View>)
    }

    const DetailWithVideo = () => {

        return(<View>
            <Video
                source={{uri:'https://www.w3schools.com/html/mov_bbb.mp4'}}
                style={{ width: '100%', aspectRatio: 16 / 9 }}
            />
            <View style={[GStyles.ph12]}>
                <Text style={{fontSize:24}}>每天工作2小时，年人500万美元，Dan Koe的"人生操作系统"</Text>
            </View>
        </View>)
    }

    const DetailWithHtml = () => {
      return (<View style={{flex:1}}>
              <View style={[GStyles.ph12]}>
                  <Text style={{fontSize:24}}>{item?.title}</Text>
              </View>
              <WebView source={{ html:data?.content}} style={{ flex: 1,height:200, width: '100%' }} />
        </View>)
    }

    return (
        <View style={{ flex: 1,paddingBottom:54+insets.bottom,backgroundColor:'#fff'}}>
            <DetailHeader />

            {/*<DetailWithHtml />*/}

            {/*<VipBanner />*/}
        </View>
    );
}

export default IndexView;
