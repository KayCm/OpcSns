import {Image, TouchableOpacity, View, Text, ImageBackground, ScrollView, Platform} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import GStyles, {appSize, NAVIGATOR_HEIGHT, TRUE_ONE_LINE} from "../../../Components/GStyles";
import {useQuery} from "@tanstack/react-query";
import {R_POST} from "../../../Services/NetRequestService";
import { Shadow } from 'react-native-shadow-2';
import {getDateInfo} from "../../../Components/Tools";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Video} from "react-native-video";

function DetailPostView({route}) {

    const insets = useSafeAreaInsets();
    const item = route?.params?.item

    const navigation = useNavigation()

    // const { isPending, isError, data, error } = useQuery({
    //     queryKey: [String('detail'+item?.id.toString())],
    //     queryFn: ()=> R_POST('/open-api/mobile/content/material/detail',{id:route?.params?.item?.id}),
    //     staleTime: 1000 * 60 * 60 * 24
    // })
    // //
    // if (isPending)return null

    const [data,setData] = useState()


    useEffect(()=>{
        R_POST('/open-api/mobile/content/material/detail',{id:route?.params?.item?.id}).then(res=>{
            console.log(res)
            setData(res)
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

    return (
      <LinearGradient colors={['#F0EBE4', '#ffffff']} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <DetailHeader />
          <ScrollView>
            <View style={{ paddingHorizontal: appSize(24),paddingBottom:appSize(10)+insets.bottom }}>
              {/*<Shadow distance={3}>*/}
              <View
                style={{
                  paddingHorizontal: appSize(25),
                  paddingBottom: appSize(30),
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
                <Text style={{ lineHeight: appSize(30) }}>
                  {data?.data?.title}
                    {/*{data?.data?.material?.contentType}*/}
                </Text>

                  {data?.data?.contentType=='video' &&( <Video
                      // source={{uri:data?.data?.medias[0]?.fileUrl}}
                      source={{uri:'https://vps-sg-aws-opc.43046721.xyz/profile/upload/2026/04/07/%E4%B8%80%E4%BA%BA%E5%85%AC%E5%8F%B8OS%E7%B3%BB%E7%B5%B1%E5%86%8D%E6%AC%A1%E5%8D%87%E7%B4%9A%EF%BC%8C%E6%89%93%E9%80%A0AI%E5%93%A1%E5%B7%A5%E5%85%A8%E8%87%AA%E5%8B%95%E7%82%BA%E4%BD%A0%E5%B7%A5%E4%BD%9C%E8%B3%BA%E9%8C%A2%EF%BC%8CAI%E6%99%82%E4%BB%A3%E4%BA%BA%E4%BA%BA%E5%BF%85%E9%A0%88%E5%AD%B8%E6%9C%83%E7%9A%84%E6%96%B0%E5%B7%A5%E4%BD%9C%E8%8C%83%E5%BC%8F%EF%BC%8C%E8%AE%93%E4%BD%A0%E7%9A%84%E5%96%AE%E4%BD%8D%E6%99%82%E9%96%93%E5%83%B9%E5%80%BC%E7%BF%BB%E5%80%8D_20260407083137A004.mp4'}}
                      style={{ width: '100%', aspectRatio: 16 / 9,borderRadius:5,marginTop:appSize(10) }}
                  />)}




              </View>
              {/*</Shadow>*/}
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    );
}

export default DetailPostView
