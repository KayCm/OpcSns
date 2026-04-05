import {Alert, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SwiperFlatList} from "react-native-swiper-flatlist";
import GStyles, {appSize, TRUE_ONE_LINE, WINDOW_WIDTH} from "../../../Components/GStyles";
import {useQuery} from "@tanstack/react-query";
import {R_POST} from "../../../Services/NetRequestService";
import {useState} from "react";
import {getDateInfo} from "../../../Components/Tools";
import BannerCarousel from "../../../Components/BannerCarousel";

function NewsHeader({BannerClick,HotInfoClick}) {

    // /open-api/mobile/home/banner/list

    const { isPending, isError, data:bannerDatra, error,isSuccess } = useQuery({
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
            <Text numberOfLines={3} style={[GStyles.ffb,{fontSize: 14,lineHeight: 20,fontWeight: '800' }]}>
                <View style={{
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
                    }}>
                    <Text style={{ fontSize: 10,color:'#fff',fontWeight:'600' }}>1</Text>
                </View>降息彻底没戏？鲍威尔“鹰派” 表态重创美债市场！</Text>
            <Text numberOfLines={1} style={{marginTop:appSize(5),color:'#909090'}}>{' '}降息彻底没戏？鲍威尔“鹰派” 表态重创美债市场！</Text>
        </View>)

    }

    const News2 = () => {


        // console.log('topData',topData)
        const result = [];
        for (let i = 0; i < topData?.data.length;i += 2) {

            const obj = {};
            obj['id'] = i;
            obj['data'] = [topData?.data[i],topData?.data[i+1]];
            result.push(obj);

        }

        // console.log('result',result)



        const dateObj = getDateInfo('zh')
        return(<View style={[{marginTop:appSize(10)}]}>

                  <View style={[GStyles.flexEnd,{height:appSize(180)}]}>

                      <View style={[GStyles.row,GStyles.jcBetween,GStyles.pa,GStyles.ph12,{top:0,zIndex:2,width:'100%'}]}>
                          <ImageBackground source={require('../../../Assets/News/news_bg.png')} style={[GStyles.row,GStyles.jc,{alignItems:'flex-end',height:appSize(28),width:appSize(98)}]}>
                              <Image source={require('../../../Assets/News/news_txt1.png')} style={{height:appSize(18.5),width:appSize(53),marginLeft:appSize(10)}} />
                              <Image source={require('../../../Assets/News/news_txt2.png')} style={{height:appSize(14.5),width:appSize(38.5)}} />
                          </ImageBackground>

                          <View style={[GStyles.row,GStyles.jc,GStyles.ac,{width:appSize(55),height:appSize(28),backgroundColor:'#F0EBE4',borderColor:'#E0CAAA',borderWidth:1}]} >

                              <View style={{alignItems:'flex-end',paddingRight:appSize(3)}}>
                                  <Text style={[{fontSize:appSize(9),backgroundColor:''}]}>{dateObj?.weekday}</Text>
                                  <Text style={[{fontSize:appSize(9),backgroundColor:''}]}>{dateObj?.month}</Text>
                              </View>

                              <View style={{height:appSize(20),width:1,backgroundColor:'#E0CAAA'}} />

                              <Text style={[GStyles.ffh1,{fontSize:appSize(18),fontWeight:'600',paddingLeft: appSize(5)}]}>{dateObj?.day}</Text>
                          </View>


                      </View>

                      <View style={[GStyles.flexEnd,{backgroundColor: '#fff',height:appSize(160),width:'100%'}]}>

                          <BannerCarousel
                              data={result}
                              itemGap={appSize(10)}        // 卡片间距 20px
                              rightSpace={appSize(30)}     // 右侧留白 30px（可省略，默认就是30）
                              // autoPlay={true}
                              // loop={true}
                              onItemPress={(item) => {
                                  if (HotInfoClick)HotInfoClick(item)
                              }}
                          />

                      </View>
                  </View>

              </View>)
    }

    const Banner = () => {

        return(<View
            style={[GStyles.ac,{
                height: appSize(200),
                width: '100%',
                borderRadius: 2,
            }]}>
            <SwiperFlatList
                autoplay={isSuccess}
                autoplayDelay={5}
                autoplayLoop
                loop
                style={{width:WINDOW_WIDTH-appSize(24),height: appSize(200)}}
                getItemLayout={(data, index) => (
                    {length: WINDOW_WIDTH-appSize(24), offset: (WINDOW_WIDTH-appSize(24)) * index, index: index}
                )}
                // showPagination
                data={bannerDatra?.data}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>{
                        if (BannerClick)BannerClick(item)
                    }}
                                      style={[
                                          GStyles.flexEnd,
                                          {
                                              height: appSize(200),
                                              width:WINDOW_WIDTH-appSize(24),
                                              borderRadius: 2,
                                          },
                                      ]}
                    >
                        <Image
                            source={{uri:item?.imageUrl}}
                            resizeMode={'cover'}
                            style={{
                                backgroundColor: '#123',
                                height: appSize(200),
                                width: WINDOW_WIDTH-appSize(24),
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
        </View>)

    }

    return (
        <View style={[GStyles.pv12,{}]}>
            <Banner />
            <News2 />
        </View>
    );
}

export default NewsHeader
