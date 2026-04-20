import {View, Text, TouchableOpacity, Image, Alert} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import GStyles, {appSize, NAVIGATOR_HEIGHT, TRUE_ONE_LINE} from "../../Components/GStyles";
import {useQuery} from "@tanstack/react-query";
import {R_POST} from "../../Services/NetRequestService";
import WebView from "react-native-webview";
import {useRef} from "react";
import {useSelector} from "react-redux";

function ActivityDetailView(props) {

   // const userInfo = useSelector(state => state?.userInfo);

    const webViewRef = useRef(null)

    const userInfo = useSelector(state => state?.userInfo);


    // String('events'+route?.params?.id.toString())

    const { isPending,isLoading, isError, data, error } = useQuery({
        queryKey: [String('events'+props?.route?.params?.id.toString())],
        queryFn: ()=> R_POST('/open-api/mobile/activity/detail',{id:props?.route?.params?.id},{},true),
        gcTime:0
    })

    if (isPending)return null

    if (isLoading)return <Text>Loading</Text>

    if (error) return <Text>{error.message}</Text>

    const {navigation,route} = props

    console.log('data',route?.params?.id.toString())
    console.log('data',data)

    const DetailHeader = () => {
        const insets = useSafeAreaInsets()
        return(<View style={{height:insets.top+NAVIGATOR_HEIGHT,width:'100%',paddingTop:insets.top,backgroundColor:'#ffffff',borderBottomColor:'#00000000',borderBottomWidth:TRUE_ONE_LINE}}>
            <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,GStyles.ph12,{height:NAVIGATOR_HEIGHT,width:'100%'}]}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack()
                }}>
                    <Image source={require('../../Assets/News/detail/detail_back.png')} style={{width:appSize(24),height:appSize(24)}} />
                </TouchableOpacity>


                <View style={{width:appSize(24)}} />

                {/*<TouchableOpacity style={[GStyles.jc,GStyles.ac,{width:32,height:32}]}>*/}
                {/*    <Image source={require('../../../Assets/News/detail/detail_more.png')} style={{width:appSize(24),height:appSize(24)}} />*/}
                {/*</TouchableOpacity>*/}
            </View>
        </View>)
    }

// https://vps-sg-aws-opc.43046721.xyz/profile/upload/2026/04/03/avatar_20260403082919A021.png

    // <div style="color: #0faa3a;font-weight: bolder;height:22px;font-size:1.25rem;margin-top:10px">价格:${data?.data?.registrationFee}</div>
    var headerHtml = `<div><img src="${data?.data?.posterUrl}" style="border-radius: 5px" alt="" width="100%" height="200"><div style="font-size:1.35rem; font-weight:600;margin-top: 20px; color:#000;">${data?.data?.activityName}</div><div style="color:#8a8a8a;height:22px;font-size:0.85rem;margin-top:10px;display: flex;align-items: center;gap:6px"><img src="https://vps-sg-aws-opc.43046721.xyz/profile/upload/2026/04/03/time_20260403083710A023.png" alt="" width="16px" height="16px">活动时间:${data?.data?.activityTime||'进行中'}</div><div style="color:#8a8a8a;height:22px;font-size:0.85rem;margin-top: 10px;display: flex;align-items: center;gap:6px"><img src="https://vps-sg-aws-opc.43046721.xyz/profile/upload/2026/04/03/local_20260403083629A022.png" alt="" width="16px" height="16px">${data?.data?.address}</div><div style="color:#8a8a8a;height:22px;font-size:0.85rem;margin-top: 10px;display: flex;align-items: center;gap:6px"><img src="https://vps-sg-aws-opc.43046721.xyz/profile/upload/2026/04/03/avatar_20260403082919A021.png" alt="" width="16px" height="16px"> ${data?.data?.organizerName}</div></div>`

    const injectScript = () => {
        webViewRef.current.injectJavaScript(`
          (function() {
            const titleBar = document.createElement('div');
            titleBar.id = 'injected-header';
            titleBar.innerHTML = '`+headerHtml+`';
            document.body.insertBefore(titleBar, document.body.firstChild);
          })();
        `);
    };

    const DetailWithHtml = () => {
        return (<View style={[{flex:1}]}>
            <WebView source={{ html:data?.data?.activityDetail}}
                     ref={webViewRef}
                     onLoad={injectScript}
                     showsHorizontalScrollIndicator={false}
                     showsVerticalScrollIndicator={false}
                     style={{ flex: 1,backgroundColor:'', width: '100%' }}
                // injectedJavaScript={injectTitleScript}
                     originWhitelist={['*']}
                     javaScriptEnabled={true}
                     domStorageEnabled={true}
            />
            {/*<WebView source={{uri:'https://www.baidu.com'}} style={{ flex: 1,height:200, width: '100%' }} />*/}
        </View>)
    }

    const SubmmitBar = () => {

        return(<View style={[GStyles.jc,GStyles.ac,{width:'100%',height:appSize(64)+useSafeAreaInsets().bottom,backgroundColor:'#fff'}]}>
            <TouchableOpacity onPress={()=>{

                if (userInfo?.email){
                    Alert.alert('报名成功')
                }else{
                    navigation.navigate('Login')
                }


            }} style={[GStyles.jc,GStyles.ac,{width:appSize(220),marginTop:-useSafeAreaInsets().bottom,height:appSize(44),backgroundColor:'#a5885f'}]}>
                <Text style={{color:'#fff',fontSize:appSize(18)}}>立即报名</Text>
            </TouchableOpacity>
        </View>)

    }

    return(<View style={{flex:1,backgroundColor:'#fff'}}>
        <DetailHeader />
        <DetailWithHtml />
        <SubmmitBar />
    </View>)
}

export default ActivityDetailView;
