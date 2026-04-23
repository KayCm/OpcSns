import {Text, TouchableOpacity, View} from 'react-native';
// import { useSelector } from 'react-redux';
import Animated from 'react-native-reanimated';
import PagerView from 'react-native-pager-view';
import DynamicWidthTabMenu from '../../Components/TabMenu';
import {useEffect, useRef, useState} from 'react';
// import DataList2 from '../../Components/DataList2/Index';
import { useQuery } from '@tanstack/react-query';
import { R_POST } from '../../Services/NetRequestService';
import NewsHeader from './Component/NewsHeader';
import NewsNav from './Component/NewsNav';
import NewsRenderRow from './Component/NewsRenderRow';
import DataList3 from "../../Components/DataList3/Index";
import { useNavigation } from '@react-navigation/native';
import TopTabMenu from "../../Components/TopTabMenu";
import {storage} from "../../Redux/store";
// const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

function IndexView() {

    const pagerRef = useRef(null);
    const menuRef = useRef(null);
    const navigation = useNavigation()


    const [readList,setReadList] = useState([])

    const saveUserList = (id) => {
        var arr = storage.getArray('readListKey');

        if (arr){
            arr.push(id)
        }else{
            arr = [id]
        }
        console.log(arr)
        setReadList(arr)
        storage.setArray('readListKey',arr);
    };

    useEffect(()=>{
        var arr = storage.getArray('readListKey');
        setReadList(arr)
    },[])

    const { isPending, isError, data,isLoading, error } = useQuery({
        queryKey: ['tagList'],
        queryFn: () => R_POST('/open-api/mobile/home/tag/list'),
          gcTime:360000
    });

    if (isPending) return <Text>Loading...</Text>;
    if (isLoading) return <Text>Loading...</Text>;
    // 处理 error 状态，避免组件崩溃
    if (error) return <Text>An error occurred: {error.message}</Text>;


    // const Nav = props?.navigation;

    //
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

        <PagerView
          ref={pagerRef}
          onPageSelected={e => {
            const position = e.nativeEvent.position;
            menuRef.current?.switchToTab(position);
          }}
          style={{ flex: 1, backgroundColor: '' }}
        >
          <DataList3
            key={1}
            renderHeader={() =>
              NewsHeader({
                BannerClick: value => {
                    if (global.token){
                        if (value?.linkTargetType == '1') {
                            navigation.navigate('DetailPost', {
                                item: { id: value?.linkValue },
                            });
                        } else {
                            navigation.navigate('Detail', {
                                item: { id: value?.linkValue },
                            });
                        }
                    }else{

                        navigation.navigate('Login')

                    }

                },
                HotInfoClick: value => {

                    if (global.token){
                        if (value?.materialType == 'post') {
                            navigation.navigate('DetailPost', { item: value });
                        } else {
                            navigation.navigate('Detail', { item: value });
                        }
                    }else{

                        navigation.navigate('Login')

                    }

                },
              })
            }
            renderRow={item =>
              NewsRenderRow({
                item: item,
                  readList:readList,
                onPress: item => {
                  // Nav.push('Detail',{item:item?.item})
                  // console.log(item?.item?.contentType)
                    if (global.token){
                        saveUserList( item?.item?.id)
                        if (item?.item?.materialType == 'post') {
                            navigation.navigate('DetailPost', { item: item?.item });
                        } else {
                            navigation.navigate('Detail', { item: item?.item });
                        }
                    }else{
                        navigation.navigate('Login')
                    }
                },
              })
            }
            url={'/open-api/mobile/home/material/normal/list'}
            params={{}}
            queryKey={'normal-list'}
          />

          {data?.data?.map((value, index, array) => {
            return (
              <DataList3
                key={index + 1}
                renderHeader={null}
                renderRow={item =>
                  NewsRenderRow({
                    item: item,
                      readList:readList,
                    onPress: item => {

                        if (global.token){
                            saveUserList( item?.item?.id)
                            if (item?.item?.materialType == 'post') {
                                navigation.navigate('DetailPost', { item: item?.item });
                            } else {
                                navigation.navigate('Detail', { item: item?.item });
                            }
                        }else{
                            navigation.navigate('Login')
                        }
                    },
                  })
                }
                url={'/open-api/mobile/home/material/byTag/list'}
                params={{ tagId: value.id }}
                queryKey={'tag-list' + value.id}
              />
            );
          })}
        </PagerView>
      </View>
    );


  return (
    <View style={{ flex: 1 }}>
      <NewsNav />
      {/*<DynamicWidthTabMenu*/}
      {/*  ref={menuRef}*/}
      {/*  tabs={[{ id: 0, tagName: '今日热点' }]}*/}
      {/*  onTabChange={index => {*/}
      {/*    // pagerRef.current?.setPage(index);*/}
      {/*  }}*/}
      {/*/>*/}

        {/*<TouchableOpacity onPress={()=>{*/}
        {/*    navigation.navigate('DetailPost',{item: {id:3}})*/}
        {/*}}>*/}
        {/*    <Text>sfdsfds</Text>*/}
        {/*    <Text>sfdsfds</Text>*/}
        {/*    <Text>sfdsfds</Text>*/}
        {/*    <Text>sfdsfds</Text>*/}
        {/*    <Text>sfdsfds</Text>*/}
        {/*</TouchableOpacity>*/}
      <AnimatedPagerView
        ref={pagerRef}
        style={{ flex: 1, backgroundColor: '' }}
        onPageSelected={e => {
          const position = e.nativeEvent.position;
          // menuRef.current?.switchToTab(position);
        }}
        initialPage={0}>

          <TouchableOpacity onPress={()=>{
              navigation.navigate('DetailPost',{item: {id:3}})
          }}>
              <Text>sfdsfds</Text>
              <Text>sfdsfds</Text>
              <Text>sfdsfds</Text>
              <Text>sfdsfds</Text>
              <Text>sfdsfds</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={()=>{
              navigation.navigate('DetailPost',{item: {id:3}})
          }}>
              <Text>sfdsfds</Text>
              <Text>sfdsfds</Text>
              <Text>sfdsfds</Text>
              <Text>sfdsfds</Text>
              <Text>sfdsfds</Text>
          </TouchableOpacity>

          {/*<DataList3 key={1}  renderHeader={()=>NewsHeader({BannerClick:(value)=>{*/}


          {/*        if (value?.materialType == 'post'){*/}
          {/*            navigation.navigate('DetailPost',{item: {id:value?.linkValue}})*/}
          {/*        }else{*/}
          {/*            navigation.navigate('Detail',{item:{id:value?.linkValue}})*/}
          {/*        }*/}

          {/*    },HotInfoClick:(value)=>{*/}

          {/*        if (value?.materialType == 'post'){*/}
          {/*            navigation.navigate('DetailPost',{item:value})*/}
          {/*        }else{*/}
          {/*            navigation.navigate('Detail',{item:value})*/}
          {/*        }*/}

          {/*    }})} renderRow={item =>*/}
          {/*    NewsRenderRow({*/}
          {/*        item: item,*/}
          {/*        onPress: item => {*/}
          {/*            // Nav.push('Detail',{item:item?.item})*/}
          {/*            // console.log(item?.item?.contentType)*/}
          {/*            if (item?.item?.materialType == 'post'){*/}
          {/*                navigation.navigate('DetailPost',{item:item?.item})*/}
          {/*            }else{*/}
          {/*                navigation.navigate('Detail',{item:item?.item})*/}
          {/*            }*/}
          {/*        },*/}
          {/*    })} url={'/open-api/mobile/home/material/normal/list'} params={{}} queryKey={'normal-list'} />*/}

        {/*{data?.data?.map((value, index, array) => {*/}
        {/*  return (<DataList3 key={index+1} renderHeader={null} renderRow={item =>*/}
        {/*      NewsRenderRow({*/}
        {/*          item: item,*/}
        {/*          onPress: item => {*/}

        {/*              // console.log(item?.item?.contentType)*/}
        {/*              if (item?.item?.materialType == 'post'){*/}
        {/*                  navigation.navigate('DetailPost',{item:item?.item})*/}
        {/*              }else{*/}
        {/*                  navigation.navigate('Detail',{item:item?.item})*/}
        {/*              }*/}

        {/*          },*/}
        {/*      })} url={'/open-api/mobile/home/material/byTag/list'} params={{ tagId: value.id }} queryKey={'tag-list'+value.id}*/}
        {/*  />);*/}
        {/*})}*/}


      </AnimatedPagerView>
    </View>
  );
}

export default IndexView;
