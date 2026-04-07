import React, {useRef, useState, useEffect, useImperativeHandle, forwardRef} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ScrollView, Image,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import {appSize} from "./GStyles";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DynamicWidthTabMenu = forwardRef(({tabs=[''],onTabChange}, ref) => {



    const [activeIndex, setActiveIndex] = useState(0);


    // 存储每个标签的布局信息 { x, width }
    const tabLayouts = useRef([]);
    const scrollViewRef = useRef(null);

    // 动画共享值
    const indicatorLeft = useSharedValue(0);
    const indicatorWidth = useSharedValue(0);


    // 暴露给外部的方法
    useImperativeHandle(ref, () => ({
        // 外部可调用 switchToTab(index) 来切换标签
        switchToTab: (index) => {
            if (index < 0 || index >= tabs.length) return;
            handleTabPress(index);
        },
        // 可选：获取当前激活的标签索引
        getActiveIndex: () => activeIndex,
    }));

    // 当激活索引或布局更新时，确保指示器位置正确
    useEffect(() => {
        const layout = tabLayouts.current[activeIndex];
        if (layout) {
            indicatorLeft.value = layout.x;
            indicatorWidth.value = layout.width;
        }
    }, [activeIndex, tabLayouts.current]);

    // 内部切换函数
    const handleTabPress = (index) => {
        if (index === activeIndex) return;

        const newLayout = tabLayouts.current[index];
        if (newLayout) {
            // 指示器动画
            indicatorLeft.value = withTiming(newLayout.x, { duration: 300 });
            indicatorWidth.value = withTiming(newLayout.width, { duration: 300 });

            // 更新状态
            setActiveIndex(index);

            // 通知父组件（如果提供了回调）
            if (onTabChange) onTabChange(index);

            // 滚动标签栏使选中标签居中
            if (scrollViewRef.current) {
                const scrollToX = newLayout.x + newLayout.width / 2 - SCREEN_WIDTH / 2;
                scrollViewRef.current.scrollTo({
                    x: Math.max(0, scrollToX),
                    animated: true,
                });
            }
        }
    };

    // 指示器动画样式
    const indicatorStyle = useAnimatedStyle(() => ({
        left: indicatorLeft.value,
        width: indicatorWidth.value,
    }));

    return (
        <View style={styles.container}>
            {/* 标签栏容器 */}
            <View style={styles.tabBarContainer}>

                <Image source={require('../Assets/menuTag.png')} style={{position: 'absolute',left:appSize(12),bottom:appSize(5),height:appSize(39),width:appSize(39)}} />

                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContent}>
                    {/* 渲染所有标签 */}
                    {tabs.map((tab, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.tab}
                            onPress={() => handleTabPress(index)}
                            onLayout={(event) => {
                                // 获取每个标签的布局信息（x 相对于 ScrollView 内容区域）
                                const { x, width } = event.nativeEvent.layout;
                                tabLayouts.current[index] = { x, width };
                                // 如果是当前激活的标签，立即更新指示器位置（首次加载时）
                                if (index === activeIndex) {
                                    indicatorLeft.value = x;
                                    indicatorWidth.value = width;
                                }
                            }}
                            activeOpacity={0.7}>
                            <Text
                                style={[styles.tabText, activeIndex === index && styles.activeTabText]}
                                numberOfLines={1}>
                                {tab?.tagName}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    {/* 动画指示器（放在 ScrollView 内部作为绝对定位元素） */}
                    <Animated.View style={[styles.indicator, indicatorStyle]} />
                </ScrollView>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor:'#fff'
    },
    tabBarContainer: {
        // borderBottomWidth: 1,
        // borderBottomColor: '#e0e0e0',
    },
    scrollViewContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        // 必须保证内容区域为相对定位，以便内部绝对定位的指示器参考
    },
    tab: {
        paddingHorizontal: 16, // 左右内边距决定标签的额外留白，宽度由文字撑开
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabText: {
        fontSize: 16,
        color: '#666',
    },
    activeTabText: {
        color: '#A5885F',
        fontWeight: 'bold',
    },
    indicator: {
        position: 'absolute',
        bottom: 0,
        height: 3,
        backgroundColor: '#A5885F',
        borderRadius: 2,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: {
        fontSize: 18,
    },
});

export default DynamicWidthTabMenu;
