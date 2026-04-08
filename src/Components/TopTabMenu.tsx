import React, {forwardRef, useImperativeHandle, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {appSize} from "./GStyles";


const TopTabMenu = forwardRef( ({tabs=[''],onTabChange},ref)=>{
    const [activeIndex, setActiveIndex] = useState(0);


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

    const handleTabPress = (index) => {
        if (index === activeIndex) return;

        setActiveIndex(index);

        if (onTabChange) onTabChange(index);
    }

    return(<View style={styles.container}>
        <Image source={require('../Assets/menuTag.png')} style={{position: 'absolute',left:appSize(12),bottom:appSize(5),height:appSize(39),width:appSize(39)}} />

        <ScrollView
            // ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12,}}>

            {tabs.map((tab, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.tab, activeIndex === index && {borderBottomColor:'#A5885F',borderBottomWidth:3}]}
                    onPress={() => handleTabPress(index)}
                    onLayout={(event) => {
                        // 获取每个标签的布局信息（x 相对于 ScrollView 内容区域）
                        // const { x, width } = event.nativeEvent.layout;
                        // tabLayouts.current[index] = { x, width };
                        // // 如果是当前激活的标签，立即更新指示器位置（首次加载时）
                        // if (index === activeIndex) {
                        //     indicatorLeft.value = x;
                        //     indicatorWidth.value = width;
                        // }
                    }}
                    activeOpacity={0.7}>
                    <Text
                        style={[styles.tabText, activeIndex === index && styles.activeTabText]}
                        numberOfLines={1}>
                        {tab?.tagName}
                    </Text>



                </TouchableOpacity>
            ))}

        </ScrollView>




    </View>)
})

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        width:'100%',
        height:appSize(44)
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
})

export default TopTabMenu
