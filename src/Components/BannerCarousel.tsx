import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
    ViewStyle,
    ListRenderItem,
} from 'react-native';
import GStyles, {appSize} from "./GStyles";
import {COLORS} from "./Constant";


const { width: screenWidth } = Dimensions.get('window');

export interface BannerItem {
    id: string | number;
    imageUrl?: string;
    title?: string;
    description?: string;
    [key: string]: any;
    data:{}
}

interface BannerCarouselProps {
    data: BannerItem[];
    renderItem?: ListRenderItem<BannerItem>;
    onItemPress?: null;
    showDots?: boolean;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    loop?: boolean;
    dotsContainerStyle?: ViewStyle;
    dotStyle?: ViewStyle;
    activeDotStyle?: ViewStyle;
    /** 卡片之间的间距（单位：px），默认为0 */
    itemGap?: number;
    /** 右侧预留空白（单位：px），默认为30 */
    rightSpace?: number;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({
                                                           data,
                                                           renderItem,
                                                           onItemPress,
                                                           showDots = true,
                                                           autoPlay = false,
                                                           autoPlayInterval = 3000,
                                                           loop = false,
                                                           dotsContainerStyle,
                                                           dotStyle,
                                                           activeDotStyle,
                                                           itemGap = 0,
                                                           rightSpace = 30,
                                                       }) => {
    const flatListRef = useRef<FlatList<BannerItem>>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const isDraggingRef = useRef(false);

    // 卡片宽度 = 屏幕宽度 - 右侧留白
    const [cardWidth, setCardWidth] = useState(screenWidth - rightSpace);
    // 每个卡片的“占位宽度”（用于滚动吸附）= 卡片宽度 + 卡片间距
    const snapInterval = cardWidth + itemGap;

    // 监听屏幕尺寸变化
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            setCardWidth(window.width - rightSpace);
        });
        return () => subscription?.remove();
    }, [rightSpace]);

    const scrollToIndex = useCallback(
        (index: number, animated = true) => {
            if (flatListRef.current && index >= 0 && index < data.length) {
                const offset = index * (cardWidth + itemGap);
                flatListRef.current.scrollToOffset({ offset, animated });
                setCurrentIndex(index);
            }
        },
        [cardWidth, itemGap, data.length]
    );

    const stopAutoPlay = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
    }, []);

    const startAutoPlay = useCallback(() => {
        if (!autoPlay || data.length <= 1) return;
        stopAutoPlay();
        timerRef.current = setInterval(() => {
            if (isDraggingRef.current) return;
            let nextIndex = currentIndex + 1;
            if (nextIndex >= data.length) {
                if (loop) nextIndex = 0;
                else {
                    stopAutoPlay();
                    return;
                }
            }
            scrollToIndex(nextIndex, true);
        }, autoPlayInterval);
    }, [autoPlay, data.length, loop, currentIndex, stopAutoPlay, scrollToIndex, autoPlayInterval]);

    useEffect(() => {
        if (autoPlay && data.length > 1) startAutoPlay();
        else stopAutoPlay();
        return () => stopAutoPlay();
    }, [autoPlay, data.length, startAutoPlay, stopAutoPlay]);

    useEffect(() => {
        if (autoPlay && data.length > 1 && !isDraggingRef.current) startAutoPlay();
    }, [currentIndex, autoPlay, data.length, startAutoPlay]);

    const handleMomentumScrollEnd = useCallback(
        (event: any) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const newIndex = Math.round(offsetX / snapInterval);
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < data.length) {
                setCurrentIndex(newIndex);
            }
            isDraggingRef.current = false;
            if (autoPlay && data.length > 1) startAutoPlay();
        },
        [snapInterval, currentIndex, data.length, autoPlay, startAutoPlay]
    );

    const handleScrollBeginDrag = useCallback(() => {
        isDraggingRef.current = true;
        stopAutoPlay();
    }, [stopAutoPlay]);

    const handleDotPress = useCallback(
        (index: number) => {
            if (index === currentIndex) return;
            if (autoPlay) {
                stopAutoPlay();
                scrollToIndex(index, true);
                startAutoPlay();
            } else {
                scrollToIndex(index, true);
            }
        },
        [autoPlay, currentIndex, scrollToIndex, startAutoPlay, stopAutoPlay]
    );


    const NewsCard = ({style,data,index,onPress}) => {

        console.log(data)

        return(<TouchableOpacity onPress={()=>{
           if (onPress)onPress(data)
        }} style={[GStyles.jcBetween,{height:appSize(62),...style}]}>
            <Text numberOfLines={2} style={[GStyles.ffb,{fontSize: appSize(14),color:COLORS.FONTBLACK,lineHeight: 20,fontWeight: '800' }]}>
                <View style={{
                    backgroundColor: index%2==0?'#A88A84':'#788A90',
                    // borderRadius: 10,
                    borderTopLeftRadius:appSize(4),
                    borderTopRightRadius:appSize(4),
                    borderBottomLeftRadius:appSize(4),
                    overflow: 'hidden',
                    paddingHorizontal:appSize(4),
                    justifyContent:'center',
                    alignItems: 'center',
                    marginRight:appSize(5),
                    fontSize: appSize(14),
                }}>
                    <Text style={{ fontSize: appSize(10),color:'#fff',fontWeight:'600' }}>{index+1}</Text>
                </View>{' '}{data?.title}</Text>
            {data?.content && (<Text numberOfLines={1} style={{marginTop:appSize(0),fontSize: appSize(12),color:'#909090'}}>{data?.content}</Text>
            )}
         </TouchableOpacity>)

    }

    const defaultRenderItem: ListRenderItem<BannerItem> = ({ item, index }) => {

        // const handlePress = () => onItemPress?.(item, index);
        // 最后一个卡片不添加右边距（marginRight）
        const isLast = index === data.length - 1;

        // 62*2+15
        return (
            <View
                activeOpacity={0.8}
                style={[
                    styles.card,
                    GStyles.ph12,
                    GStyles.jcBetween,
                    {height:appSize(62*2+15),width: cardWidth, marginRight: isLast ? 0 : itemGap },
                ]}>

                {item.data.map((v,i,a)=>{
                    return (
                      <NewsCard
                        onPress={onItemPress}
                        data={v}
                        key={i}
                        index={item?.id + i}
                        style={{
                          borderBottomColor: '',
                          marginTop: appSize(2),
                          borderBottomWidth: 0,
                        }}
                      />
                    );
                })}
            </View>
        );
    };

    if (!data || data.length === 0) return null;

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem || defaultRenderItem}
                snapToInterval={snapInterval}
                snapToAlignment="start"
                decelerationRate="fast"
                onScrollBeginDrag={handleScrollBeginDrag}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                getItemLayout={(_, index) => ({
                    length: snapInterval,
                    offset: snapInterval * index,
                    index,
                })}
                contentContainerStyle={{
                    paddingRight: rightSpace, // 右侧留白
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { width: '100%' },
    card: {
        height: appSize(180),
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        paddingBottom:appSize(10)
    },
    image: { width: '100%', height: '100%', position: 'absolute' },
    textOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    title: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    description: { color: '#eee', fontSize: 14 },
    dotsContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 12, marginBottom: 8 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', marginHorizontal: 6 },
    activeDot: { width: 20, backgroundColor: '#007aff' },
});

export default BannerCarousel;
