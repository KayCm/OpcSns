import {View, Text, TouchableOpacity, Image} from "react-native";
import WebView from 'react-native-webview';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import GStyles, {appSize, NAVIGATOR_HEIGHT, TRUE_ONE_LINE, WINDOW_HEIGHT} from "../../../Components/GStyles";
import IconNavBack from "../../../Assets/Svgs/IconNavBack";
import IconMore from "../../../Assets/Svgs/IconMore";
import {useNavigation} from "@react-navigation/native";
import {Video } from 'react-native-video';
import {useQuery} from "@tanstack/react-query";
import {R_POST} from "../../../Services/NetRequestService";
import LinearGradient from 'react-native-linear-gradient';
import {useRef} from "react";

function IndexView(props: any) {

   // const nav = useNavigation()

    const Nav = props?.navigation
    const item = props?.route?.params?.item

    const insets = useSafeAreaInsets();

    // 注入的 JavaScript 代码：等待页面加载完成后，在顶部添加标题栏
    const webViewRef = useRef(null)

    const detailQueryId = 'detail'+item?.id.toString()

    const { isPending, isError, data, error } = useQuery({
        queryKey: [[String('detail'+props?.route?.params?.item?.id.toString())]],
        queryFn: ()=> R_POST('/open-api/mobile/content/material/detail',{id:props?.route?.params?.item?.id}),
        staleTime: 1000 * 60 * 60 * 24
    })

    if (isPending)return null

    console.log('data:',data?.data)
    const mockHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <style>
        body {
            padding: 0 0rem;
            color: #333;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        img {
            width: 90vw;
        }
    </style>
    <script>
        (function () {
            // 设计稿宽度（通常为 375 或 750）
            const BASE_WIDTH = 375;
            // 基准根字体大小（一般设为 16，方便计算；也可以设为 100，则 1rem = 100px）
            const BASE_FONT_SIZE = 16;
            // 限制最大根字体（可选，防止超大屏幕文字过大）
            const MAX_ROOT_FONT_SIZE = 24;
            // 限制最小根字体（可选）
            const MIN_ROOT_FONT_SIZE = 12;

            function setRem() {
                // 获取当前视口宽度（取逻辑像素，即 CSS 像素）
                let clientWidth = window.innerWidth;
                // 根据比例计算根字体大小
                let rem = (clientWidth / BASE_WIDTH) * BASE_FONT_SIZE;
                // 应用上下限
                if (rem > MAX_ROOT_FONT_SIZE) rem = MAX_ROOT_FONT_SIZE;
                if (rem < MIN_ROOT_FONT_SIZE) rem = MIN_ROOT_FONT_SIZE;
                // 设置根元素字体
                document.documentElement.style.fontSize = rem + 'px';
            }

            // 页面加载时设置
            setRem();
            // 监听窗口大小变化（加上防抖，避免频繁触发）
            let timer = null;
            window.addEventListener('resize', function () {
                if (timer) clearTimeout(timer);
                timer = setTimeout(setRem, 50);
            });
            // 监听屏幕旋转（部分 Android 需要）
            window.addEventListener('orientationchange', setRem);
            // 页面显示时（例如从后台切回）再确认一次
            window.addEventListener('pageshow', function (e) {
                if (e.persisted) setRem();
            });
        })();
    </script>
    </head>
    <body>
    `+data?.data?.material?.content+`</body></html>`;
    const title= data?.data?.material?.title
    const author = data?.data?.material?.author
    const createTime= data?.data?.material?.createTime
    const summary= data?.data?.material?.summary
    var headerHtml = `<div><div style="font-size: 1.75rem;line-height: 2rem;font-weight: bold;">${title}</div><div style="font-size: 0.75rem;display: flex;color: #999"><p style="margin-right: 1rem;">${createTime}</p><p style="margin-right: 1rem;">${author}</p></div></div>`
    if (data?.data?.material?.summary) headerHtml = `<div><div style="font-size: 1.5rem;line-height: 2rem;font-weight: bold;">${title}</div><div style="font-size: 0.75rem;display: flex;color: #999"><p style="margin-right: 1rem;">${createTime}</p><p style="margin-right: 1rem;">${author}</p></div> <div style="position: relative;margin-top: 1rem;font-size: 1rem;background-color: #f4f4f4;padding: 1.25rem 0.75rem;padding-bottom:0.75rem;border-radius: 4px;"><div style="position: absolute;top: -12px;left: 0.75rem;font-size: 1rem;font-weight: 500;"><span style="font-weight: 300;color: #666;">|</span> 概 <span style="font-weight: 300;color: #666;">|</span> 要 <span style="font-weight: 300;color: #666;">|</span></div><div style="font-size: 0.875rem;line-height: 1.5rem;color: #000000;">${summary}</div></div></div>`
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

    const DetailHeader = () => {
        const insets = useSafeAreaInsets()
        return(<View style={{height:insets.top+NAVIGATOR_HEIGHT,width:'100%',paddingTop:insets.top,backgroundColor:'#ffffff',borderBottomColor:'#00000000',borderBottomWidth:TRUE_ONE_LINE}}>
            <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,GStyles.ph12,{height:NAVIGATOR_HEIGHT,width:'100%'}]}>
                <TouchableOpacity onPress={()=>{
                    Nav.goBack()
                }}>
                    <Image source={require('../../../Assets/News/detail/detail_back.png')} style={{width:appSize(24),height:appSize(24)}} />
                </TouchableOpacity>
                <View style={{width:appSize(24)}} />
                {/*<TouchableOpacity style={[GStyles.jc,GStyles.ac,{width:32,height:32}]}>*/}
                {/*    <Image source={require('../../../Assets/News/detail/detail_more.png')} style={{width:appSize(24),height:appSize(24)}} />*/}
                {/*</TouchableOpacity>*/}
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
      return (<View style={[GStyles.ph16,{flex:1}]}>
              <WebView source={{ html:mockHtml}}
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

    return (<View style={{ flex: 1,paddingBottom:54+insets.bottom,backgroundColor:'#fff'}}>
            <DetailHeader />

            <DetailWithHtml />

            {/*<View style={{*/}
            {/*    position: 'absolute',*/}
            {/*    bottom: 0,*/}
            {/*    left: 0,*/}
            {/*    width: '100%',*/}
            {/*    height: (WINDOW_HEIGHT * 2) / 3, // 覆盖三分之二高度*/}
            {/*    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // 半透明黑色，可自定义*/}
            {/*}} >*/}
            {/*    <LinearGradient*/}
            {/*        colors={[*/}
            {/*            'rgba(255, 255, 255, 0)',   // 完全透明（白色，alpha=0）*/}
            {/*            'rgba(255, 255, 255, 1)',   // 纯白色（alpha=1）*/}
            {/*        ]}*/}
            {/*        // 关键：locations 控制过渡位置，[0, 0.5] 表示前半段透明，后半段白色*/}
            {/*        locations={[0, 0.5]}*/}
            {/*        // 垂直渐变：从上到下*/}
            {/*        start={{ x: 0.5, y: 0 }}*/}
            {/*        end={{ x: 0.5, y: 1 }}*/}
            {/*        style={{flex:1}}*/}
            {/*    >*/}
            {/*        /!* 这里可以放置你的内容 *!/*/}
            {/*    </LinearGradient>*/}
            {/*</View>*/}

            {/*<VipBanner />*/}
        </View>);
}

export default IndexView;
