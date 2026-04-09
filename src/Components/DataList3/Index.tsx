import {R_POST} from "../../Services/NetRequestService";
import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import React, {useCallback} from "react";
import {ActivityIndicator, RefreshControl, Text, View} from "react-native";
import GStyles from "../GStyles";
import {FlashList} from "@shopify/flash-list";

export interface Item {
    id: string;
    title: string;
}

interface PageData {
    data: Item[];
    nextPage: number | null;
    totalPages: number;
}

const fetchItems = async ({ pageParam = 1,url ,params}): Promise<PageData> => {
    const response = await new Promise(resolve => {
        R_POST(url, { pageNum: pageParam, pageSize: 10, ...params })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                return error;
            });
    });

    if (response.code != 200) throw new Error('Network response was not ok');

    const data = response.data
    // 假设总页数为 10，nextPage 为当前页+1（不超过总页数）
    const currentPage = pageParam;
    const totalPages = 10;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    return {
        data,
        nextPage,
        totalPages,
    };
};

const useInfiniteItems = ({url,params,queryKey}) => {
    return useInfiniteQuery({
        queryKey: [queryKey],
        queryFn:({ pageParam = 1 }) =>  fetchItems({pageParam,url,params}),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        staleTime: 10000, // 5 分钟内数据视为新鲜
        gcTime: 10 * 60 * 1000,   // 缓存保留 10 分钟
    });
};
function Index({url,params,queryKey,renderHeader=null,renderRow=null,numColumns=1,estimatedItemSize=110}) {

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        refetch,
    } = useInfiniteItems({url,params,queryKey});

    if (error) return <Text>An error occurred: {error.message}</Text>;

    console.log('LIST',data)

    const queryClient = useQueryClient()

    const allItems = data?.pages.flatMap((page) => page.data) ?? [];

    // 加载更多
    const loadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // 渲染单个列表项
    // const renderItem = ({item})=>{
    //
    //     // return(<View>
    //     //     {renderRow || renderRow(item)}
    //     // </View>)
    //
    //     return (
    //         <View style={{height:110,width:'100%',backgroundColor:'#123'}}>
    //             <Text style={{}}>{item?.title}</Text>
    //         </View>
    //     );
    // }

    // // 列表头部：初次加载指示器
    // const renderHeader = () => {
    //     if (isLoading) {
    //         return (
    //             <View >
    //                 <ActivityIndicator size="large" />
    //             </View>
    //         );
    //     }
    //     return null;
    // };


    // 列表底部：加载更多指示器 或 无更多数据提示
    const renderFooter = () => {
        if (!hasNextPage && allItems.length > 0) {
            return (
                <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#8a8a8a'}}>—— No More ——</Text>
                </View>
            );
        }
        if (isFetchingNextPage) {
            return (
                <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="small" />
                    <Text style={{color:'#8a8a8a'}}>Load More...</Text>
                </View>
            );
        }
        return null;
    };


    return (
        <FlashList
            data={allItems}
            renderItem={renderRow}
            // keyExtractor={(item) => item.id}
            keyExtractor={(_, index) => index.toString()}
            onEndReached={loadMore}
            numColumns={numColumns}
            onEndReachedThreshold={0.5}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={110} // 预估每个列表项的高度，务必根据实际内容调整
            refreshControl={<RefreshControl refreshing={isLoading}
                                            progressBackgroundColor={'#fff'}
                                            onRefresh={()=>{
                                                queryClient.setQueryData([queryKey], (data) => ({
                                                    pages: data.pages.slice(0, 1),
                                                    pageParams: data.pageParams.slice(0, 1),
                                                }))
                                                queryClient.invalidateQueries(queryKey)
                                            }}
            />}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            style={{flex:1}}
            contentContainerStyle={{width: '100%',}}
        />
    );

}

export default Index
