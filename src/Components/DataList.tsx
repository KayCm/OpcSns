import {useInfiniteQuery, useQueryClient} from "@tanstack/react-query";
import {View, Text, ActivityIndicator, RefreshControl} from "react-native";
import { FlashList } from '@shopify/flash-list';
import {R_POST} from "../Services/NetRequestService";
import axios from "axios";

const fetchList = (URL,pageParam=1,param={}) => {


    const promise = new Promise((resolve, reject) => {

        let url = URL
        let params = {
            "pageNum": pageParam,
            "pageSize": 10,
            ...param
        }
        R_POST(url,params).then(function (response) {
            if (response?.code == 200){
                response.page = pageParam
                resolve(response)
            }else{
                reject(response);
            }
        }).catch(function (error) {
            reject(error);
        }).finally(function () {
            // always executed
        });
    });
    return promise;
}


const fetchPopularMovies = (URL,pageParam=1) => {
    const url = 'https://api.freeapi.app/api/v1/public/books?page='+pageParam+'&limit=10';
    // const url = URL+'?page='+pageParam+'&size=10&c='+Category;

    const promise = new Promise((resolve, reject) => {
        axios.get(url, null).then(function (response) {
            response.data.page = pageParam
            resolve(response.data.data)
        }).catch(function (error) {
            reject(error);
        }).finally(function () {
            // always executed
        });
    });
    return promise;
}

const fetchPopularMovies2 = (URL,pageParam=1) => {
    const url = 'https://vps-sg-aws-opc.43046721.xyz/open-api/mobile/home/material/normal/list';
    // const url = URL+'?page='+pageParam+'&size=10&c='+Category;


    const promise = new Promise((resolve, reject) => {
        axios.post(url, {"pageNum": pageParam, "pageSize": 10}).then(function (response) {
            // response.data.page = pageParam
            // resolve(response.data.data)

            response.page = pageParam
            resolve(response)
        }).catch(function (error) {
            reject(error);
        }).finally(function () {
            // always executed
        });
    });
    return promise;
}

function DataList({renderRow,renderHeader=null,queryKey="Digest",param,url=''}) {

    const queryClient = useQueryClient()

    const { data, isLoading,isError, isFetchingNextPage, refetch,fetchNextPage, hasNextPage } =
        useInfiniteQuery({
            queryKey: [queryKey],
            initialPageParam: 1,
            // queryFn: ({ pageParam = 1 }) => fetchList(url,pageParam,param),
            queryFn: ({ pageParam = 1 }) => fetchPopularMovies(url,pageParam,param),
            getNextPageParam: (lastPage) => {
                if (lastPage?.rows?.length == 0 ) {
                    return undefined;
                }
                return lastPage.page + 1;
            },
            // staleTime: 1000 * 60 * 30, // 5分钟内认为数据是新鲜的
            // cacheTime: 1000 * 60 * 60, // 缓存保留1小时
            // refetchOnWindowFocus: true, // 应用聚焦时重新验证
            // refetchOnReconnect: true, // 网络恢复时重新验证
        });


    if (isLoading)return null


    if (isLoading) {
        return (
            <View style={{}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (isError){
        return <Text>error</Text>
    }

    console.log(data)

    // return <Text>error</Text>
    return (<View style={{flex:1,width:'100%'}}>
        <FlashList
            showsVerticalScrollIndicator={false}
            // data={data?.pages.flatMap(page => page?.data)  || []}
            data={data?.pages.flatMap(page => page?.rows)  || []}
            keyExtractor={(item) => item?.id.toString()}
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
            onEndReached={() => fetchNextPage()}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={renderHeader}
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
