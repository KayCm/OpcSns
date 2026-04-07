import React from 'react';
import {Dimensions, FlatList, Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import GStyles, {appSize} from "./GStyles";
import LinearGradient from 'react-native-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

// 可调节参数
const IMAGE_WIDTH = screenWidth * 0.9;   // 主图片宽度为屏幕宽度的70%
const SPACING = appSize(10);                      // 图片之间的间距
const SIDE_PREVIEW = (screenWidth - IMAGE_WIDTH) / 2; // 侧边预显的宽度




export const MemberCarousel = ({ data, initialIndex = 0 ,onPress}) => {
    // 计算每个 item 的布局（用于 initialScrollIndex 精确滚动）
    const getItemLayout = (_, index) => ({
        length: IMAGE_WIDTH + SPACING, // 每个 item 占用的总宽度
        offset: (IMAGE_WIDTH + SPACING) * index, // 起始偏移量
        index,
    });


    // 核心：renderItem 方法，渲染单张图片
    const renderItem = ({ item,index}) => (

        <TouchableOpacity onPress={onPress} style={[styles.imageContainer, { width: IMAGE_WIDTH }]}>

            <LinearGradient start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={item.line} style={{flex: 1,borderRadius:appSize(5),height:appSize(150)}}>

                <View style={{flex:1,height:appSize(150)}}>

                    <View style={[GStyles.row,{height:appSize(110)}]}>
                        <View style={[GStyles.row,GStyles.ac,{gap:appSize(10),paddingLeft:appSize(16),height:appSize(110),flex:1}]} >
                            <Text style={[GStyles.ffh1,{color:index <= 1?'#000':'#FDE3B6'}]}>{item.text}</Text>

                            {index <= 1 &&(<View style={[GStyles.jc,GStyles.ac,{paddingHorizontal:appSize(5),height:appSize(18),borderWidth:1,borderTopRightRadius:appSize(9),borderBottomRightRadius:appSize(9),borderTopLeftRadius:appSize(9)}]}>
                                <Text style={{fontSize:appSize(12)}}>已开通</Text>
                            </View>)}

                        </View>
                        <Image source={item.icon} style={{width:appSize(110),height:appSize(110)}}/>
                    </View>


                    {index>1 ? (<View style={[GStyles.row,{}]}>
                        <View style={[GStyles.jc,{flex:1,paddingLeft:appSize(16)}]}>
                            <Text style={{color:'#FDE3B6'}}>钻石会员线下活动正在筹备中，敬请期待</Text>
                        </View>
                    </View>):(<View style={[GStyles.row,{}]}>
                        <View style={[GStyles.jc,{flex:1,paddingLeft:appSize(16)}]}>
                            <Text style={{color:'#000'}}>您已开通OPC NEWS会员</Text>
                        </View>
                        <View style={[GStyles.ac,{width:appSize(110)}]}>
                            <TouchableOpacity onPress={()=>{

                            }} style={[GStyles.jc,GStyles.ac,{height:appSize(25),width:appSize(74),backgroundColor:'#000'}]} >
                                <Text style={{color:'#fff'}}>查看详情</Text>
                            </TouchableOpacity>
                        </View>
                    </View>)}




                </View>


            </LinearGradient>

        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={IMAGE_WIDTH + SPACING}   // 滚动停止时自动对齐图片
                decelerationRate="fast"                  // 提升滑动速度感
                contentContainerStyle={{
                    paddingHorizontal: SIDE_PREVIEW,       // 左右内边距，让两侧图片露出来
                    gap: SPACING,                          // 设置图片之间的间距
                }}
                renderItem={renderItem}
                keyExtractor={(item,index) => String(index)}
                initialScrollIndex={initialIndex}        // 初始滚动到指定索引
                getItemLayout={getItemLayout}            // 提供布局信息，确保 initialScrollIndex 精确生效
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        overflow: 'hidden',
        width:'100%',
        height: appSize(150),
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
    },
});
