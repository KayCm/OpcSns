import {Image, TouchableOpacity, View, Text, ImageBackground, ScrollView, Platform, Alert} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import GStyles, {appSize, NAVIGATOR_HEIGHT, TRUE_ONE_LINE, WINDOW_WIDTH} from "../../../Components/GStyles";
// import {useQuery} from "@tanstack/react-query";
import {useNavigation} from "@react-navigation/native";
import {getDateInfo} from "../../../Components/Tools";
import {R_POST} from "../../../Services/NetRequestService";
import {useEffect, useRef, useState} from "react";
import {Video, VideoRef} from "react-native-video";
import {SwiperFlatList} from "react-native-swiper-flatlist";
import ImageView from "react-native-image-viewing";
import VideoPlayer from 'react-native-video-controls';


function DetailPostView({route}) {

    // useEffect(()=>{
    //     R_POST('/open-api/mobile/content/material/detail',{id:route?.params?.item?.id}).then(res=>{
    //         console.log(res)
    //         setData(res)
    //     })
    // },[route?.params?.item?.id])

    //
    const insets = useSafeAreaInsets();
    // const navigation = useNavigation()
    // const [data,setData] = useState()
    // const dateObj = getDateInfo('zh')

    // const DetailHeader = () => {
    //
    //     return(<View style={{height:insets.top+NAVIGATOR_HEIGHT,width:'100%',paddingTop:insets.top,borderBottomColor:'#00000000',borderBottomWidth:TRUE_ONE_LINE}}>
    //         <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,GStyles.ph12,{height:NAVIGATOR_HEIGHT,width:'100%'}]}>
    //             <TouchableOpacity onPress={()=>{
    //                 navigation.goBack()
    //             }}>
    //                 <Image source={require('../../../Assets/News/detail/detail_back.png')} style={{width:appSize(24),height:appSize(24)}} />
    //             </TouchableOpacity>
    //             <View style={{width:appSize(24)}} />
    //         </View>
    //     </View>)
    // }



    // return (<View style={{ flex: 1 }}>
    //             <DetailHeader />
    //             {/*<ScrollView>*/}
    //             {/*    <View style={{ paddingHorizontal: appSize(24),paddingBottom:appSize(10)+insets.bottom }}>*/}
    //
    //
    //             {/*    </View>*/}
    //             {/*</ScrollView>*/}
    //         </View>)

    // const insets = useSafeAreaInsets();
    // const item = route?.params?.item
    //
    // const navigation = useNavigation()

    // const { isPending, isError, data, error } = useQuery({
    //     queryKey: [String('detail'+item?.id.toString())],
    //     queryFn: ()=> R_POST('/open-api/mobile/content/material/detail',{id:route?.params?.item?.id}),
    //     staleTime: 1000 * 60 * 60 * 24
    // })
    // //
    // if (isPending)return null

    // return null

    const navigation = useNavigation()
    const [data,setData] = useState()

    const [paused, setPaused] = useState(false); // 控制播放/暂停
    const [videoReady, setVideoReady] = useState(false); // 视频是否已加载

    const [images,setImages] = useState([])

    useEffect(()=>{
        R_POST('/open-api/mobile/content/material/detail',{id:route?.params?.item?.id}).then(res=>{
            console.log(res)
            setData(res)

            var arr = []
            if (res?.data?.contentType == 'image'){
                res?.data?.medias.map((value,index)=>{
                    arr.push({uri:value?.fileUrl})
                })
                console.log('arr',arr)
                setImages(arr)
            }

        })
    },[])



    const dateObj = getDateInfo('zh')

    const DetailHeader = () => {

        return(<View style={{height:insets.top+NAVIGATOR_HEIGHT,width:'100%',paddingTop:insets.top,borderBottomColor:'#00000000',borderBottomWidth:TRUE_ONE_LINE}}>
            <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,GStyles.ph12,{height:NAVIGATOR_HEIGHT,width:'100%'}]}>
                <TouchableOpacity onPress={()=>{
                    navigation.goBack()
                }}>
                    <Image source={require('../../../Assets/News/detail/detail_back.png')} style={{width:appSize(24),height:appSize(24)}} />
                </TouchableOpacity>
                <View style={{width:appSize(24)}} />
            </View>
        </View>)
    }

    const [showModal, setShowModal] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);


    var videoRef = useRef<VideoRef>(null);
    const enterFullscreen = () => {
        if (videoRef.current) {
            // 检查是否存在 setFullScreen (v6.3.0+)
            if (typeof videoRef.current.setFullScreen === 'function') {
                videoRef.current.setFullScreen(true);
            }
            // 检查是否存在 enterFullscreen (v6+)
            else if (typeof videoRef.current.enterFullscreen === 'function') {
                videoRef.current.enterFullscreen();
            }
            // 降级方案：检查老方法 (v5)
            else if (typeof videoRef.current.presentFullscreenPlayer === 'function') {
                videoRef.current.presentFullscreenPlayer();
            } else {
                console.warn('当前版本的 react-native-video 不支持任何已知的全屏方法。');
            }
        } else {
            console.warn('视频组件尚未就绪，请稍后重试。');
        }
    };

    return ( <View style={{ flex: 1 }}>
          <DetailHeader />
          <ScrollView>
            <View style={{ paddingHorizontal: appSize(24),paddingBottom:appSize(10)+insets.bottom }}>
              {/*<Shadow distance={3}>*/}
              <View
                style={{
                  paddingHorizontal: appSize(25),
                  paddingBottom: appSize(20),
                  backgroundColor: '#fff',
                  width: '100%',
                  marginTop: appSize(65),
                }}
              >

                <View
                  style={[
                    GStyles.row,
                    GStyles.ac,
                    GStyles.jcBetween,
                    {
                      height: appSize(70),
                      marginBottom: appSize(20),
                      width: '100%',
                      borderBottomColor: '#123',
                      borderBottomWidth: 1,
                    },
                  ]}
                >
                  <ImageBackground
                    source={require('../../../Assets/News/news_bg.png')}
                    style={[
                      GStyles.row,
                      GStyles.jc,
                      {
                        alignItems: 'flex-end',
                        height: appSize(28),
                        width: appSize(98),
                      },
                    ]}
                  >
                    <Text style={[GStyles.ffh11,{ color: '#000' }]}>NEXA</Text>
                    <Text style={[GStyles.ffh11,{ color: '#A5885F' }]}>
                      简讯
                    </Text>
                  </ImageBackground>

                  <View
                    style={[
                      GStyles.row,
                      GStyles.jc,
                      GStyles.ac,
                      {
                        width: appSize(55),
                        height: appSize(28),
                        backgroundColor: '#F0EBE4',
                        borderColor: '#E0CAAA',
                        borderWidth: 1,
                      },
                    ]}
                  >
                    <View
                      style={{
                        alignItems: 'flex-end',
                        paddingRight: appSize(3),
                      }}
                    >
                      <Text
                        style={[{ fontSize: appSize(9), backgroundColor: '' }]}
                      >
                        {dateObj?.weekday}
                      </Text>
                      <Text
                        style={[{ fontSize: appSize(9), backgroundColor: '' }]}
                      >
                        {dateObj?.month}
                      </Text>
                    </View>

                    <View
                      style={{
                        height: appSize(20),
                        width: 1,
                        backgroundColor: '#E0CAAA',
                      }}
                    />

                    <Text
                      style={{
                          fontSize: appSize(18),
                          fontWeight: '600',
                          paddingLeft: appSize(5)
                        }}>
                      {dateObj?.day}
                    </Text>
                  </View>
                </View>

                {/*<Text>{data?.data?.material?.title}</Text>*/}
                  <TouchableOpacity onPress={()=>{
                      enterFullscreen()
                  }}>
                <Text style={{ lineHeight: appSize(30) }}>
                  {data?.data?.title}
                    {/*{data?.data?.material?.contentType}*/}
                </Text>
                  </TouchableOpacity>

                  {data?.data?.contentType=='video' &&( <VideoPlayer
                      // ref={ ref => {
                      //     videoRef = ref
                      // } }
                      source={{uri:data?.data?.medias[0]?.fileUrl}}
                      poster={data?.data?.coverImage}
                      paused={paused} // 控制暂停
                      controls={false} // 隐藏系统默认控制栏
                      disableVolume = {true}
                      isFullscreen={fullscreen}
                      fullscreen={fullscreen}
                      onEnterFullscreen={()=>{
                          setFullscreen(true)
                      }}
                      onExitFullscreen={()=>{
                          setFullscreen(false)
                      }}
                      // fullscreenOrientation="landscape"
                      // fullscreenAutorotate={false}
                      disableBack={true}
                      disableSeekbar={true}
                      toggleResizeModeOnFullscreen={true}
                      // toggleResizeModeOnFullscreen={true}
                      // resizeMode="contain" // 视频画面显示模式
                      style={{ width: '100%', aspectRatio: 16 / 9,borderRadius:5,marginTop:appSize(10)}}
                  />)}

                  {data?.data?.contentType == 'image' && (
                      <SwiperFlatList
                          autoplay={true}
                          autoplayDelay={5}
                          autoplayLoop
                          loop
                          style={{width:WINDOW_WIDTH-appSize(100), borderRadius:appSize(5),marginTop:appSize(10),height: appSize(200)}}
                          getItemLayout={(data, index) => (
                              {length: WINDOW_WIDTH-appSize(100), offset: (WINDOW_WIDTH-appSize(100)) * index, index: index}
                          )}
                          // showPagination
                          data={data?.data?.medias}
                          renderItem={({ item,index }) => (
                              <TouchableOpacity key={index} onPress={()=>{
                                  setShowModal(true)
                              }}>

                              <Image
                                  source={{uri:item?.fileUrl}}
                                  // resizeMode={'c'}
                                  style={{
                                      backgroundColor: '#123',
                                      height: appSize(200),
                                      width: WINDOW_WIDTH-appSize(100),
                                  }}
                              />
                              </TouchableOpacity>
                          )}

                          />
                  )}


              </View>
              {/*</Shadow>*/}
            </View>
          </ScrollView>

        <ImageView
            images={images}
            imageIndex={0}
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
        />

        </View>);
}

export default DetailPostView
