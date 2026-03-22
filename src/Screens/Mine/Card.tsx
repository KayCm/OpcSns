import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import GStyles, { WINDOW_WIDTH } from '../../Components/GStyles.ts';

// const { width: screenWidth } = Dimensions.get('window');

const screenWidth = WINDOW_WIDTH-24;

// 配置参数
const CARD_WIDTH = (screenWidth-20) * 0.85; // 卡片宽度
const CARD_HEIGHT = 160; // 卡片高度
const CARD_MARGIN = 10; // 卡片间距
const SCALE_ACTIVE = 1.1; // 选中放大比例
const SCALE_INACTIVE = 0.9; // 未选中缩小比例

// 模拟数据
const banners = [
  { id: '1', color: '#FF6B6B', title: '夏日特饮', desc: '清爽一夏' },
  { id: '2', color: '#4ECDC4', title: '新品上市', desc: '限时尝鲜' },
  { id: '3', color: '#45B7D1', title: '会员专享', desc: '尊享折扣' }
];

const SimpleCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  // 滚动监听
  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    scrollX.setValue(offsetX);

    const index = Math.round(offsetX / (CARD_WIDTH + CARD_MARGIN));
    if (index !== activeIndex && index >= 0 && index < banners.length) {
      setActiveIndex(index);
    }
  };

  // 点击卡片
  const handlePress = index => {
    setActiveIndex(index);
    swiperRef.current?.scrollToIndex({ index, animated: true });
  };

  // 动画样式
  const getAnimatedStyle = index => {
    const inputRange = [
      (index - 1) * (CARD_WIDTH + CARD_MARGIN),
      index * (CARD_WIDTH + CARD_MARGIN),
      (index + 1) * (CARD_WIDTH + CARD_MARGIN),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [SCALE_INACTIVE, SCALE_ACTIVE, SCALE_INACTIVE],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: 'clamp',
    });

    return { transform: [{ scale }], opacity };
  };


  const MemberCard = () => {
    return (
      <View
        style={[
          GStyles.jcBetween,
          {
            paddingVertical: 30,
            paddingHorizontal: 12,
            flex:1,
          },
        ]}
      >
        <View style={[GStyles.row, GStyles.ac, { gap: 10 }]}>
          <Text>OPC NEWS会员</Text>

          <View
            style={[
              GStyles.jc,
              GStyles.ac,
              GStyles.pv5,
              GStyles.ph10,
              { borderRadius: 20, borderColor: '#232323', borderWidth: 1 },
            ]}
          >
            <Text>已开通</Text>
          </View>
        </View>

        <View style={[GStyles.row, GStyles.ac, { gap: 10 }]}>
          <Text>登录后查看您的会员等级</Text>
          <View
            style={[
              GStyles.jc,
              GStyles.ac,
              GStyles.pv5,
              GStyles.ph10,
              { borderRadius: 20, backgroundColor: '#123' },
            ]}
          >
            <Text style={{ color: '#fff' }}>查看详情</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SwiperFlatList
        ref={swiperRef}
        data={banners}
        renderItem={({ item, index }) => {
          const animatedStyle = getAnimatedStyle(index);
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              // onPress={() => handlePress(index)}
            >
              <Animated.View
                style={[
                  styles.card,
                  { backgroundColor: item.color },
                  animatedStyle,
                  activeIndex === index && styles.activeCard,
                ]}
              >
                <MemberCard />
              </Animated.View>
            </TouchableOpacity>
          );
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: (screenWidth - CARD_WIDTH) / 2,
          alignItems: 'center',
        }}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_MARGIN}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={Math.floor(banners.length / 2)}
        windowSize={5}
        maxToRenderPerBatch={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#123',
    // 移除了 paddingHorizontal
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: CARD_MARGIN / 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 3,
  },
  activeCard: {
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.3,
    // shadowRadius: 6,
    // elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  badge: {
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default SimpleCarousel;

