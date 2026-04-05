import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import {appSize} from "./GStyles";

const { width: screenWidth } = Dimensions.get('window');

// 可调节参数
const IMAGE_WIDTH = screenWidth * 0.9;   // 主图片宽度为屏幕宽度的70%
const SPACING = appSize(10);                      // 图片之间的间距
const SIDE_PREVIEW = (screenWidth - IMAGE_WIDTH) / 2; // 侧边预显的宽度

export const MemberCarousel = ({ data, initialIndex = 0 }) => {
    // 计算每个 item 的布局（用于 initialScrollIndex 精确滚动）
    const getItemLayout = (_, index) => ({
        length: IMAGE_WIDTH + SPACING, // 每个 item 占用的总宽度
        offset: (IMAGE_WIDTH + SPACING) * index, // 起始偏移量
        index,
    });
    // 核心：renderItem 方法，渲染单张图片
    const renderItem = ({ item }) => (
        <View style={[styles.imageContainer, { width: IMAGE_WIDTH }]}>
            <Image source={item.imageUrl} style={styles.image} />
        </View>
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
        backgroundColor:'#123'
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
    },
});
