import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SwiperFlatList} from "react-native-swiper-flatlist/index";
import GStyles, {appSize, WINDOW_WIDTH} from "../../../Components/GStyles";
import {useQuery} from "@tanstack/react-query/build/modern/index";
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

    const News2 = () => {

      return(<View style={[GStyles.ph12,{marginTop:appSize(20)}]}>

          <View style={{height:appSize(200)}}>

              <View style={[GStyles.row,GStyles.jcBetween,GStyles.pa,{zIndex:2,width:'100%'}]}>
                  <ImageBackground source={require('../../../Assets/News/news_bg.png')} style={[GStyles.row,GStyles.jc,GStyles.ac,{height:appSize(26),width:appSize(90)}]}>
                      <Image source={require('../../../Assets/News/news_txt1.png')} style={{height:appSize(18.5),width:appSize(53),marginLeft:appSize(10)}} />
                      <Image source={require('../../../Assets/News/news_txt2.png')} style={{height:appSize(14.5),width:appSize(38.5)}} />
                  </ImageBackground>

                  <View style={[GStyles.row,GStyles.jc,GStyles.ac,{paddingHorizontal: appSize(5),paddingVertical:appSize(5),backgroundColor:'#F0EBE4',borderColor:'#E0CAAA',borderWidth:1}]} >
                      <View style={{alignItems:'flex-end',paddingRight: appSize(5),borderRightWidth:1,borderRightColor:'#123'}}>
                          <Text style={{}}>周日</Text>
                          <Text>3月</Text>
                      </View>
                      <Text style={{fontSize:18,paddingLeft: appSize(5)}}>29</Text>
                  </View>
              </View>
              <View style={{backgroundColor: '#fff',height:appSize(180),marginTop:appSize(10),width:'100%'}}>
                  <ScrollView horizontal={true} pagingEnabled={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

                      <View style={{height:appSize(180),width:WINDOW_WIDTH-appSize(24)}}>

                      </View>

                      <View style={{height:appSize(180),backgroundColor:'#123',width:WINDOW_WIDTH-appSize(24)}}>

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
