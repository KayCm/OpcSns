import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {View, ActivityIndicator,RefreshControl} from "react-native";
import { FlashList } from '@shopify/flash-list';
import axios from "axios";

const fetchPopularMovies = (URL,pageParam=1,Category) => {
    const url = 'https://api.freeapi.app/api/v1/public/books?page='+pageParam+'&limit=10';
    // const url = URL+'?page='+pageParam+'&size=10&c='+Category;

    const promise = new Promise((resolve, reject) => {
        axios.get(url, null).then(function (response) {
            response.data.page = pageParam
            console.log(response.data.data.data)
            resolve(response.data.data.data)
        }).catch(function (error) {
            reject(error);
        }).finally(function () {
            // always executed
        });
    });
    return promise;
}

function DataList(props:any) {

    const {renderRow,Category="Digest",URL=''} = props

    const queryKey = Category+"List";

    const queryClient = useQueryClient()

    const { data, isLoading, isFetchingNextPage, refetch,fetchNextPage, hasNextPage } =
        useInfiniteQuery({
            queryKey: [queryKey],
            initialPageParam: 1,
            queryFn: ({ pageParam = 1 }) => fetchPopularMovies(URL,pageParam,Category),
            getNextPageParam: (lastPage) => {
                if (lastPage.page < lastPage.total) {
                    return lastPage.page + 1;
                }
                return 1;
            },
            staleTime: 1000 * 60 * 30, // 5分钟内认为数据是新鲜的
            cacheTime: 1000 * 60 * 60, // 缓存保留1小时
            refetchOnWindowFocus: true, // 应用聚焦时重新验证
            refetchOnReconnect: true, // 网络恢复时重新验证
        });

    if (isLoading)return null


    if (isLoading) {
        return (
            <View style={{}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (<View style={{flex:1,width:'100%'}}>
        <FlashList
            showsVerticalScrollIndicator={false}
            data={data?.pages.flatMap(page => page.posts) || []}
            // keyExtractor={(item) => item.id.toString()}
            renderItem={renderRow}
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
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                isFetchingNextPage ? (
                    <View style={{}}>
                        <ActivityIndicator size="small" color="#ffffff" />
                    </View>
                ) : null
            }
        />
    </View>);


}

export default DataList;
