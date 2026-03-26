import {Image, Text, TouchableOpacity, View} from "react-native";
import {SwiperFlatList} from "react-native-swiper-flatlist/index";
import GStyles, {WINDOW_WIDTH} from "../../../Components/GStyles";
import {useQuery} from "@tanstack/react-query/build/modern/index";
import {R_POST} from "../../../Services/NetRequestService";

function NewsHeader() {



    // /open-api/mobile/home/banner/list

    const { isPending, isError, data:bannerDatra, error } = useQuery({
        queryKey: ['banner'],
        queryFn: ()=> R_POST('/open-api/mobile/home/banner/list'),
    })

    const { isPending:isTopPending, isError:isTopError, data:topData, error:topError } = useQuery({
        queryKey: ['topNews'],
        queryFn: ()=> R_POST('/open-api/mobile/home/material/top/list'),
    })



    return (
        <View style={{marginBottom:20}}>
            <View
                style={{
                    height: 220,
                    width: '100%',
                    borderRadius: 2
                }}
            >
                <SwiperFlatList
                    autoplay
                    autoplayDelay={2}
                    autoplayLoop
                    index={2}
                    // showPagination
                    data={bannerDatra?.data}
                    renderItem={({ item }) => (
                        <View
                            style={[
                                GStyles.jc,
                                GStyles.ac,
                                {
                                    height: 220,
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
                            <View style={[GStyles.ph10]}>
                                <Text
                                    style={{ marginTop: 1, fontSize: 14 }}
                                    numberOfLines={1}
                                >
                                    {item?.title}
                                </Text>
                            </View>
                        </View>
                    )}
                />
            </View>

            <View style={[GStyles.ph12,{ width: '100%', borderRadius: 2, gap: 10, marginTop: 20 }]}>
                {topData?.data?.map((value, index, array) => {
                    return (
                        <TouchableOpacity onPress={()=>{
                            console.log(value)
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
            </View>
        </View>
    );
}

export default NewsHeader
