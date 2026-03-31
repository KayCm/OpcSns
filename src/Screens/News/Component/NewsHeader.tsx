import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SwiperFlatList} from "react-native-swiper-flatlist/index";
import GStyles, {appSize, TRUE_ONE_LINE, WINDOW_WIDTH} from "../../../Components/GStyles";
import {useQuery} from "@tanstack/react-query";
import {R_POST} from "../../../Services/NetRequestService";

function NewsHeader({BannerClick,HotInfoClick}) {

    // /open-api/mobile/home/banner/list

    const { isPending, isError, data:bannerDatra, error } = useQuery({
        queryKey: ['banner'],
        queryFn: ()=> R_POST('/open-api/mobile/home/banner/list'),
    })

    const { isPending:isTopPending, isError:isTopError, data:topData, error:topError } = useQuery({
        queryKey: ['topNews'],
        queryFn: ()=> R_POST('/open-api/mobile/home/material/top/list'),
    })


    const News = () => {
      return(<View style={[GStyles.ph12,{ width: '100%', borderRadius: 2, gap: 10, marginTop: 20 }]}>
          {topData?.data?.map((value, index, array) => {

              if (index>2)return null

              return (
                  <TouchableOpacity onPress={()=>{
                      if (HotInfoClick)HotInfoClick(value)
                  }} key={index}>
                      <Text numberOfLines={3} style={{ fontSize: 14,lineHeight: 20 }}>
                          <View
                              style={{
                                  backgroundColor: 'red',
                                  borderRadius: 10,
                                  overflow: 'hidden',
                                  paddingHorizontal:4,
                                  justifyContent:'center',
                                  alignItems: 'center',
                              }}
                          >
                              <Text style={{ fontSize: 10,color:'#fff',fontWeight:'600' }}>HOT</Text>
                          </View>{' '}
                          {value?.title}
                      </Text>
                  </TouchableOpacity>
              );
          })}
      </View>)
    }

    const NewsCard = ({style}) => {

        return(<View style={{...style}}>
            <Text numberOfLines={3} style={[GStyles.ffb,{fontSize: 14,lineHeight: 20 }]}>
                <View
                    style={{
                        backgroundColor: 'red',
                        // borderRadius: 10,
                        borderTopLeftRadius:appSize(3),
                        borderTopRightRadius:appSize(3),
                        borderBottomLeftRadius:appSize(3),
                        overflow: 'hidden',
                        paddingHorizontal:appSize(4),
                        justifyContent:'center',
                        alignItems: 'center',
                        marginRight:appSize(5)
                    }}
                >
                    <Text style={{ fontSize: 10,color:'#fff',fontWeight:'600' }}>1</Text>
                </View>降息彻底没戏？鲍威尔“鹰派” 表态重创美债市场，交易员如梦初醒！</Text>
            <Text numberOfLines={1} style={{marginTop:appSize(5)}}>降息彻底没戏？鲍威尔“鹰派” 表态重创美债市场，交易员如梦初醒！</Text>
        </View>)

    }

    const News2 = () => {

      return(<View style={[GStyles.ph12,{marginTop:appSize(20),backgroundColor: '#fff'}]}>

          <View style={{height:appSize(200)}}>

              <View style={[GStyles.row,GStyles.jcBetween,GStyles.pa,{zIndex:2,width:'100%'}]}>
                  <ImageBackground source={require('../../../Assets/News/news_bg.png')} style={[GStyles.row,GStyles.jc,GStyles.ac,{height:appSize(26),width:appSize(90)}]}>
                      <Image source={require('../../../Assets/News/news_txt1.png')} style={{height:appSize(18.5),width:appSize(53),marginLeft:appSize(10)}} />
                      <Image source={require('../../../Assets/News/news_txt2.png')} style={{height:appSize(14.5),width:appSize(38.5)}} />
                  </ImageBackground>

                  <View style={[GStyles.row,GStyles.jc,GStyles.ac,{width:appSize(55),height:appSize(28),backgroundColor:'#F0EBE4',borderColor:'#E0CAAA',borderWidth:1}]} >

                      <View style={{alignItems:'flex-end',paddingRight:appSize(3)}}>
                          <Text style={[GStyles.ffb,{fontSize:appSize(10)}]}>周日</Text>
                          <Text style={[GStyles.ffb,{fontSize:appSize(10)}]}>3月</Text>
                      </View>

                      <View style={{height:appSize(20),width:1,backgroundColor:'#E0CAAA'}} />

                      <Text style={[GStyles.ffb,{fontSize:appSize(18),fontWeight:'600',paddingLeft: appSize(5)}]}>29</Text>
                  </View>
              </View>


              <View style={{backgroundColor: '#fff',height:appSize(180),marginTop:appSize(10),width:'100%'}}>
                  <ScrollView horizontal={true} pagingEnabled={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

                      <View style={{height:appSize(160),marginTop:appSize(20),width:WINDOW_WIDTH-appSize(24)}}>

                         <NewsCard style={{marginTop:appSize(20)}} />
                         <NewsCard style={{marginTop:appSize(15)}} />


                      </View>

                      <View style={{height:appSize(180),backgroundColor:'#123',width:WINDOW_WIDTH-appSize(48)}}>

                      </View>


                  </ScrollView>
              </View>
          </View>

      </View>)
    }

    return (
        <View style={[GStyles.pv12,{}]}>
            <View
                style={[GStyles.ph12,{
                    height: 200,
                    width: '100%',
                    borderRadius: 2,
                }]}
            >
                <SwiperFlatList
                    autoplay
                    autoplayDelay={2}
                    autoplayLoop
                    index={2}
                    // showPagination
                    data={bannerDatra?.data}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={()=>{
                            if (BannerClick)BannerClick(item)
                        }}
                            style={[
                                GStyles.flexEnd,
                                {
                                    height: 200,
                                    width: WINDOW_WIDTH,
                                    borderRadius: 2,
                                },
                            ]}
                        >
                            <Image
                                source={{uri:item?.imageUrl}}
                                resizeMode={'cover'}
                                style={{
                                    backgroundColor: '#123',
                                    height: 200,
                                    width: WINDOW_WIDTH,
                                }}
                            />
                            <View style={[GStyles.ph12,{position: 'absolute',justifyContent:'center',backgroundColor:'#03030350',zIndex:3,width:'100%',height:44}]}>
                                <Text
                                    style={{fontSize: 14,color:'#fff' }}
                                    numberOfLines={1}>
                                    {item?.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <News2 />
        </View>
    );
}

export default NewsHeader
