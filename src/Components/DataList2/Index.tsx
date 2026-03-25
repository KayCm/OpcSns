// import {FlashList} from "@shopify/flash-list";
// import {Text, TouchableOpacity, View} from "react-native";
// import {useInfiniteQuery} from "@tanstack/react-query";
// import {R_POST} from "../../Services/NetRequestService";
// import {useEffect, useState} from "react";
// // import * as console from "console";
// // import * as console from "console";
//
//
// function Index() {
//
//     const [data,setData] = useState([])
//
//     const fetchArticles =  (pageParam=1) => {
//         R_POST("/open-api/mobile/community/list",{"pageNum":pageParam,"pageSize": 10},{},false).then(response=>{
//             setData(response.rows)
//         }).catch(error=>{
//
//         })
//     }
//
//     useEffect(()=>{
//         fetchArticles()
//     },[])
//
//
//
//
//
//     const renderRow = (props) => {
//
//         return(<TouchableOpacity onPress={()=>{
//             console.log('item:',props?.item)
//         }} style={{height:200,width:'100%',marginTop:10,backgroundColor:'#123'}}>
//             <Text style={{color:'#fff',fontSize:50}}>{props?.item?.name}</Text>
//             <Text style={{color:'#fff',fontSize:50}}>{props?.item?.id}</Text>
//         </TouchableOpacity> )
//     }
//
//
//     return(<View style={{flex:1}}>
//             {/*<TouchableOpacity onPress={()=>{*/}
//             {/*    fetchNextPage()*/}
//             {/*}} style={{height:200,width:'100%',marginTop:10,backgroundColor:'#123'}}>*/}
//             {/*    <Text style={{color:'#fff',fontSize:50}}>11111</Text>*/}
//             {/*</TouchableOpacity>*/}
//             {/*<Text>hasNextPage:{hasNextPage?'true':'false'}</Text>*/}
//             {/*<Text>isFetchingNextPage:{isFetchingNextPage?'true':'false'}</Text>*/}
//             {/*<Text>{data?.pages.length}</Text>*/}
//             <FlashList renderItem={renderRow}
//                        style={{flex:1}}
//                        data={data || []}
//                        keyExtractor={(item) => {
//
//                            console.log("item--",item)
//
//                            return item?.id.toString()
//                        }}
//                        onEndReached={() => {
//
//                        }}
//                        onEndReachedThreshold={0.5}
//
//             />
//     </View>
//     )
// }
//
// export default Index


// import React, { useState, useEffect, useCallback } from 'react';
// import {
//     View,
//     Text,
//     ActivityIndicator,
//     StyleSheet,
//     Button, TouchableOpacity,
// } from 'react-native';
// import { FlashList } from '@shopify/flash-list';
// import {R_POST} from "../../Services/NetRequestService";
//
// // 模拟 API 调用（实际使用时替换为真实接口）
// const fetchItems = async (page = 1) => {
//     // 模拟网络延迟
//
//
//
//
//      const abc = await new Promise(resolve => {
//         R_POST("/open-api/mobile/community/list",{"pageNum":page,"pageSize": 10}).then(response=>{
//             resolve(response)
//         }).catch(error=>{
//             console.log(error)
//         })
//     });
//
//      console.log('abc-->',abc)
//
//
//     // 模拟分页数据：每页 10 条，最多 5 页
//     const totalPages = abc?.total/10;
//     if (page > totalPages) {
//         return { data: [], hasNextPage: false };
//     }
//
//     // const newItems = Array.from({ length: 10 }, (_, i) => ({
//     //     id: `${page}-${i}`,
//     //     title: `Item ${page}-${i}`,
//     // }));
//
//     return {
//         data: abc.rows,
//         hasNextPage: page < totalPages,
//     };
// };
//
// const InfiniteScrollExample = () => {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [refreshing, setRefreshing] = useState(false);
//     const [error, setError] = useState(null);
//     const [page, setPage] = useState(1);
//     const [hasNextPage, setHasNextPage] = useState(true);
//
//     // 加载数据（初始或翻页）
//     const loadItems = useCallback(async (pageNum, shouldAppend = true) => {
//         if (!hasNextPage && shouldAppend) return;
//
//         setLoading(true);
//         setError(null);
//
//         try {
//             const response = await fetchItems(pageNum);
//             const newData = response.data;
//
//             setItems(prevItems =>
//                 shouldAppend ? [...prevItems, ...newData] : newData
//             );
//             setHasNextPage(response.hasNextPage);
//         } catch (err) {
//             setError('Failed to load items. Please try again.');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     }, [hasNextPage]);
//
//     // 初始加载
//     useEffect(() => {
//         loadItems(1, false);
//     }, []);
//
//     // 加载更多（翻页）
//     const loadMore = useCallback(() => {
//         if (loading || !hasNextPage) return;
//         const nextPage = page + 1;
//         setPage(nextPage);
//         loadItems(nextPage, true);
//     }, [loading, hasNextPage, page, loadItems]);
//
//     // 下拉刷新
//     const onRefresh = useCallback(() => {
//         setRefreshing(true);
//         setPage(1);
//         setHasNextPage(true);
//         loadItems(1, false).finally(() => setRefreshing(false));
//     }, [loadItems]);
//
//     // 渲染单个条目
//     const renderItem = ({ item }) => (
//         <TouchableOpacity onPress={()=>{
//             console.log('item:',item)
//         }} style={{height:200,width:'100%',marginTop:10,backgroundColor:'#123'}}>
//             <Text style={styles.title}>{item?.name}</Text>
//         </TouchableOpacity>);
//
//
//
//     // 列表底部加载指示器
//     const renderFooter = () => {
//         if (!loading) return null;
//         return (
//             <View style={styles.footer}>
//                 <ActivityIndicator size="large" />
//             </View>
//         );
//     };
//
//     // 空状态
//     const renderEmpty = () => (
//         <View style={styles.empty}>
//             <Text>No items found</Text>
//         </View>
//     );
//
//     // 错误状态
//     if (error && items.length === 0) {
//         return (
//             <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{error}</Text>
//                 <Button title="Retry" onPress={() => loadItems(1, false)} />
//             </View>
//         );
//     }
//
//     return (
//         <FlashList
//             data={items}
//             renderItem={renderItem}
//             keyExtractor={item => item.id}
//             estimatedItemSize={80} // 预估条目高度，帮助优化性能
//             onEndReached={loadMore}
//             onEndReachedThreshold={0.5} // 距离底部 50% 时触发
//             onRefresh={onRefresh}
//             refreshing={refreshing}
//             ListFooterComponent={renderFooter}
//             ListEmptyComponent={renderEmpty}
//             contentContainerStyle={styles.list}
//         />
//     );
// };
//
// const styles = StyleSheet.create({
//     list: {
//         paddingVertical: 10,
//     },
//     item: {
//         padding: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     title: {
//         fontSize: 16,
//     },
//     footer: {
//         paddingVertical: 20,
//         alignItems: 'center',
//     },
//     empty: {
//         padding: 50,
//         alignItems: 'center',
//     },
//     errorContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     errorText: {
//         color: 'red',
//         marginBottom: 10,
//     },
// });
//
// export default InfiniteScrollExample;


import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Button,
    Alert, TouchableOpacity,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {R_POST} from "../../Services/NetRequestService";

// 缓存 key
// const CACHE_KEY = 'infinite_list_cache';

// 模拟 API 调用（实际使用时替换为真实接口）
const fetchItems = async (page = 1, url = '', params={}) => {
  // await new Promise(resolve => setTimeout(resolve, 1000));
  //
  //
  //
  // const totalPages = 5;
  // if (page > totalPages) {
  //     return { data: [], hasNextPage: false };
  // }

  const abc = await new Promise(resolve => {
    R_POST(url, { pageNum: page, pageSize: 5, ...params })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.log(error);
      });
  });



  // 模拟分页数据：每页 10 条，最多 5 页
  const totalPages = Math.ceil(abc?.total / 5);

  console.log('abc-->', abc);
  console.log('totalPages-->', totalPages);

  if (abc?.rows.length <= 1 ) {
    return { data: [], hasNextPage: false };
  }

  // const newItems = Array.from({ length: 10 }, (_, i) => ({
  //     id: `${page}-${i}`,
  //     title: `Item ${page}-${i}`,
  // }));
  return {
    data: abc.rows,
    hasNextPage: page < totalPages,
  };
};

const DataList2 = ({
  renderItem,
  renderHeader,
  url,
  params = {},
  CACHE_KEY="",
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 保存数据到缓存
  const saveToCache = useCallback(async (data, hasNext) => {
    try {
      const cacheData = {
        items: data,
        hasNextPage: hasNext,
        timestamp: Date.now(), // 可选，用于缓存过期策略
      };
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (err) {
      console.warn('Failed to save cache:', err);
    }
  }, []);

  // 从缓存加载数据
  const loadFromCache = useCallback(async () => {
    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) {
        const { items: cachedItems, hasNextPage: cachedHasNext } =
          JSON.parse(cached);
        if (cachedItems && cachedItems.length) {
          setItems(cachedItems);
          setHasNextPage(cachedHasNext);
          // 根据缓存中的最大页码恢复 page（可选，简化：设为 1）
          // 因为我们需要知道下次加载更多时的页码，这里简单设置为 1 并覆盖
          // 更好的做法是记录页码，但为简化，刷新时会重新拉取，所以 page 设为 1 即可
          setPage(1);
          return true;
        }
      }
      return false;
    } catch (err) {
      console.warn('Failed to load cache:', err);
      return false;
    }
  }, []);

  // 加载数据（网络请求）
  const loadItems = useCallback(
    async (pageNum, shouldAppend = true, ignoreCache = false) => {
      // 如果是翻页且没有下一页，直接返回
      if (!ignoreCache && !shouldAppend && !isInitialLoad) {
        // 如果是非初始加载的刷新，可能无需判断，但此处略
      }
      if (shouldAppend && !hasNextPage) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetchItems(pageNum, url, params);
        const newData = response.data;

        const updatedItems = shouldAppend ? [...items, ...newData] : newData;
        setItems(updatedItems);
        setHasNextPage(response.hasNextPage);
        setPage(pageNum);

        // 保存到缓存（只有成功加载后才保存）
        await saveToCache(updatedItems, response.hasNextPage);
      } catch (err) {
        setError('Failed to load items. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [items, hasNextPage, saveToCache, isInitialLoad],
  );

  // 初始加载：先尝试缓存，再网络请求
  useEffect(() => {
    const initialize = async () => {
      const hasCache = await loadFromCache();
      if (hasCache) {
        // 有缓存，显示缓存数据，但后台刷新第一页（静默刷新）
        // 注意：由于我们缓存了整个列表，如果要保持无限滚动的页码一致性，应该清空并重新拉取第一页
        // 但这里为了简单，直接后台请求第一页，如果数据有变化则合并？更好的做法是刷新时替换。
        // 为简化，这里我们选择静默刷新：请求第一页，并用新数据替换缓存数据（同时保留页码）。
        setIsInitialLoad(true);
        try {
          const response = await fetchItems(1, url, params);
          if (response.data.length > 0) {
            setItems(response.data);
            setHasNextPage(response.hasNextPage);
            setPage(1);
            await saveToCache(response.data, response.hasNextPage);
          }
        } catch (err) {
          console.warn('Silent refresh failed:', err);
        } finally {
          setIsInitialLoad(false);
        }
      } else {
        // 无缓存，直接加载第一页
        setIsInitialLoad(false);
        await loadItems(1, false);
      }
    };
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 只在挂载时运行一次

  // 加载更多（翻页）
  const loadMore = useCallback(() => {
    if (loading || !hasNextPage) return;
    const nextPage = page + 1;
    loadItems(nextPage, true);
  }, [loading, hasNextPage, page, loadItems]);

  // 下拉刷新（清除缓存并重新拉取第一页）
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      // 清除缓存（可选，但为了保持一致性，先清除）
      await AsyncStorage.removeItem(CACHE_KEY);
      const response = await fetchItems(1, url, params);
      setItems(response.data);
      setHasNextPage(response.hasNextPage);
      setPage(1);
      await saveToCache(response.data, response.hasNextPage);
    } catch (err) {
      setError('Refresh failed. Please try again.');
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  }, [saveToCache]);

  // 渲染单个条目
  // const renderItem = ({ item }) => (
  //     <View style={styles.item}>
  //         <Text style={styles.title}>{item.title}</Text>
  //     </View>
  // );

  // const renderItem = ({ item }) => (
  //     <TouchableOpacity onPress={()=>{
  //         console.log('item:',item)
  //     }} style={{height:200,width:'100%',marginTop:10,backgroundColor:'#123'}}>
  //         <Text style={styles.title}>{item?.name}</Text>
  //     </TouchableOpacity>);

  // 列表底部加载指示器
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  // 空状态
  const renderEmpty = () => (
    <View style={styles.empty}>
      <Text>No items found</Text>
    </View>
  );

  // 错误状态
  if (error && items.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={() => loadItems(1, false)} />
      </View>
    );
  }

  return (
    <FlashList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      estimatedItemSize={80}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={styles.list}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
    list: {
        paddingVertical: 10,
    },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 16,
    },
    footer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    empty: {
        padding: 50,
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default DataList2;
