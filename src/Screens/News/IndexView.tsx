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
import {useEffect, useRef} from "react";
import DataList2 from "../../Components/DataList2/Index";
import NewViewModel from "./NewViewModel";
import {useQuery} from "@tanstack/react-query/build/modern";
import {R_POST} from "../../Services/NetRequestService";
import NewsHeader from "./Component/NewsHeader";
import NewsNav from "./Component/NewsNav";
import NewsRenderRow from "./Component/NewsRenderRow";
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);


function IndexView() {

    const pagerRef = useRef(null)
    const menuRef = useRef(null)
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['tagList'],
        queryFn: ()=> R_POST('/open-api/mobile/home/tag/list'),
    })
    const appData = useSelector(state => state?.appData);
    useEffect(()=>{
        global.token = appData.token
    },[])

    if (isPending)return null

    return (<View style={{ flex: 1 }}>
        <NewsNav />
        <DynamicWidthTabMenu ref={menuRef} tabs={[{"id": 0, "tagName": "今日热点",},...data?.data]} onTabChange={index => {
                  pagerRef.current?.setPage(index);
              }}/>
        <AnimatedPagerView ref={pagerRef} style={{ flex: 1,backgroundColor:'#ffffff' }} onPageSelected={e => {
            const position = e.nativeEvent.position;
            menuRef.current?.switchToTab(position);
          }} initialPage={0}>
            <DataList2 renderHeader={NewsHeader} renderItem={(item)=>NewsRenderRow({item:item,onPress:(item)=>{
                console.log(item)
            }})} url={'/open-api/mobile/home/material/normal/list'} CACHE_KEY={'main'}/>
            {data?.data?.map((value, index, array) => {
                return (<DataList2
                    key={index}
                    renderHeader={null}
                    renderItem={NewsRenderRow}
                    url={'/open-api/mobile/home/material/byTag/list'}
                    params={{ tagId: value.id }}
                    CACHE_KEY={'tag_'+value.id}
                />)
            })}
        </AnimatedPagerView>
      </View>);
}

export default IndexView;
