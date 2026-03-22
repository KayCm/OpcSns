import {View, Text, TouchableOpacity, Image} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import GStyles, {
  NAVIGATOR_HEIGHT,
  TRUE_ONE_LINE,
  WINDOW_WIDTH,
} from '../../Components/GStyles';
import IconAvatar from "../../Assets/Svgs/IconAvatar";
import IconSearch from "../../Assets/Svgs/IconSearch";
import DataList from "../../Components/DataList";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import {useTranslation} from "react-i18next";
import Animated from 'react-native-reanimated';
import PagerView from 'react-native-pager-view';
import DynamicWidthTabMenu from "../../Components/TabMenu";
import {useRef} from "react";
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);


function IndexView() {
    const navigation = useNavigation();

    // const dispatch :Dispatch<any> = useDispatch();

    const { t, i18n } = useTranslation();


    const particleUserInfo = useSelector(state => state?.userInfo);

    const NewsHeader = () => {
        const insets = useSafeAreaInsets()
        return (
          <View
            style={{
              height: insets.top + NAVIGATOR_HEIGHT,
              width: '100%',
              paddingTop: insets.top,
              backgroundColor: '#ffffff',
              borderBottomColor: '#00000030',
              borderBottomWidth: TRUE_ONE_LINE,
            }}
          >
            <View
              style={[
                GStyles.row,
                GStyles.ac,
                GStyles.jcBetween,
                GStyles.ph12,
                { height: NAVIGATOR_HEIGHT, width: '100%' },
              ]}
            >
              <Text style={{ fontSize: 18, fontWeight: '800' }}>OPC NEWS</Text>
              <View style={[GStyles.row, GStyles.ac, GStyles.ac, { gap: 10 }]}>
                <TouchableOpacity>
                  <IconSearch />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                  navigation.navigate('Login')
                }}>
                  <IconAvatar />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
    }

    function renderRow(item:Element) {
        return (<TouchableOpacity activeOpacity={0.5} onPress={()=>{
            navigation.navigate('Detail')
        }} style={[GStyles.ph12,GStyles.pv12]}>
            <View style={[GStyles.row,{gap:10,borderBottomWidth:TRUE_ONE_LINE,borderColor:'#00000030',paddingBottom:10}]}>
                <View style={[GStyles.jcBetween,{flex:1}]}>
                    <Text style={{fontSize:18}}>{item?.item?.id}-{item?.item?.volumeInfo?.title}</Text>
                    <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween]}>
                        <View style={[GStyles.row,GStyles.ac,GStyles.jc,{gap:5}]}>
                            <View style={[GStyles.jc,GStyles.ac,{height:20,width:40,backgroundColor:'red',borderRadius:2}]}>
                                <Text style={{color:'#fff'}}>VIP</Text>
                            </View>
                            <Text>1小时前</Text>
                        </View>
                        <Text>Foxs News</Text>
                    </View>
                </View>
                <Image style={{height:100,width:100,backgroundColor:'#123',borderRadius:5}}/>
            </View>
        </TouchableOpacity>)
    }

    const renderHeader = () => {

        return (
          <View style={[ {marginBottom:20}]}>
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
                data={['tomato', 'thistle', 'skyblue', 'teal']}
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
                      style={{
                        backgroundColor: item,
                        height: 200,
                        width: WINDOW_WIDTH,
                      }}
                    />
                    <View style={[GStyles.ph10]}>
                      <Text
                        style={{ marginTop: 1, fontSize: 14 }}
                        numberOfLines={1}
                      >
                        “中国大陆并未计划在2027年‘入侵’台湾”的说法，明确台湾问题是中国内政，不容外部干涉，要求美方恪
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>

            <View
              style={[GStyles.ph12,{ width: '100%', borderRadius: 2, gap: 10, marginTop: 20 }]}
            >
              {[1, 2, 3].map((value, index, array) => {
                return (
                  <View key={index}>
                    <Text numberOfLines={3} style={{ fontSize: 14,lineHeight: 20 }}>
                      <View
                        style={{
                          backgroundColor: 'red',
                          borderRadius: 10,
                          overflow: 'hidden',
                          paddingHorizontal:8,
                          justifyContent:'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{ fontSize: 10,color:'#fff',fontWeight:'600' }}>资讯</Text>
                      </View>{' '}
                      3月19日，外交部发言人林剑回应美情报官员所谓“中国大陆并未计划在2027年‘入侵’台湾”的说法，明确台湾问题是中国内政，不容外部干涉，要求美方恪守一个中国原则，停止炒作“中国威胁论
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        );
    }

    const TopTabsMenu = () => {
      return(<View style={{height:44,width:'100%',backgroundColor:'#fff'}}>
          {}
      </View>)
    }

    const pagerRef = useRef(null)
    const menuRef = useRef(null)

    return (
      <View style={{ flex: 1 }}>
          <NewsHeader />
          <DynamicWidthTabMenu ref={menuRef} onTabChange={(index)=>{
              pagerRef.current?.setPage(index)
          }} />
          <AnimatedPagerView ref={pagerRef} style={{flex: 1}} onPageSelected={(e)=>{
              const position = e.nativeEvent.position;
              menuRef.current?.switchToTab(position);
          }}  initialPage={0}>
              <DataList renderHeader={renderHeader} renderRow={renderRow} />
              <DataList renderHeader={null} renderRow={renderRow} />
              <DataList renderHeader={null} renderRow={renderRow} />
              <DataList renderHeader={null} renderRow={renderRow} />
              <DataList renderHeader={null} renderRow={renderRow} />
              <DataList renderHeader={null} renderRow={renderRow} />
          </AnimatedPagerView>
      </View>);
}

export default IndexView;
