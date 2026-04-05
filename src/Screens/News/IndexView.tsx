import { View } from 'react-native';
import { useSelector } from 'react-redux';
import Animated from 'react-native-reanimated';
import PagerView from 'react-native-pager-view';
import DynamicWidthTabMenu from '../../Components/TabMenu';
import { useEffect, useRef } from 'react';
import DataList2 from '../../Components/DataList2/Index';
import { useQuery } from '@tanstack/react-query';
import { R_POST } from '../../Services/NetRequestService';
import NewsHeader from './Component/NewsHeader';
import NewsNav from './Component/NewsNav';
import NewsRenderRow from './Component/NewsRenderRow';
import DataList3 from "../../Components/DataList3/Index";
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

function IndexView(props) {

    const Nav = props?.navigation
  const pagerRef = useRef(null);
  const menuRef = useRef(null);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['tagList'],
    queryFn: () => R_POST('/open-api/mobile/home/tag/list'),
  });
  const appData = useSelector(state => state?.appData);
  useEffect(() => {
    global.token = appData.token;
  }, []);

  if (isPending) return null;

  return (
    <View style={{ flex: 1 }}>
      <NewsNav />
      <DynamicWidthTabMenu
        ref={menuRef}
        tabs={[{ id: 0, tagName: '今日热点' }, ...data?.data]}
        onTabChange={index => {
          pagerRef.current?.setPage(index);
        }}
      />
      <AnimatedPagerView
        ref={pagerRef}
        style={{ flex: 1, backgroundColor: '' }}
        onPageSelected={e => {
          const position = e.nativeEvent.position;
          menuRef.current?.switchToTab(position);
        }}
        initialPage={0}>

          <DataList3 key={1}  renderHeader={()=>NewsHeader({BannerClick:(value)=>{

              console.log('value',value)

                  if (value?.materialType == 'post'){
                      Nav.push('DetailPost',{item: {id:value?.linkValue}})
                  }else{
                      Nav.push('Detail',{item:{id:value?.linkValue}})
                  }

              },HotInfoClick:(value)=>{

                  if (value?.materialType == 'post'){
                      Nav.push('DetailPost',{item:value})
                  }else{
                      Nav.push('Detail',{item:value})
                  }

              }})} renderRow={item =>
              NewsRenderRow({
                  item: item,
                  onPress: item => {
                      // Nav.push('Detail',{item:item?.item})
                      // console.log(item?.item?.contentType)
                      if (item?.item?.materialType == 'post'){
                          Nav.push('DetailPost',{item:item?.item})
                      }else{
                          Nav.push('Detail',{item:item?.item})
                      }
                  },
              })} url={'/open-api/mobile/home/material/normal/list'} params={{}} queryKey={'normal-list'} />

        {data?.data?.map((value, index, array) => {
          return (<DataList3 key={index+1} renderHeader={null} renderRow={item =>
              NewsRenderRow({
                  item: item,
                  onPress: item => {

                      // console.log(item?.item?.contentType)
                      if (item?.item?.materialType == 'post'){
                          Nav.push('DetailPost',{item:item?.item})
                      }else{
                          Nav.push('Detail',{item:item?.item})
                      }

                  },
              })} url={'/open-api/mobile/home/material/byTag/list'} params={{ tagId: value.id }} queryKey={'tag-list'+value.id}
          />);
        })}
      </AnimatedPagerView>
    </View>
  );
}

export default IndexView;
