// InfiniteList.tsx
import React, { useCallback } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useInfiniteQuery } from '@tanstack/react-query';
import {R_POST} from "../Services/NetRequestService";

// ==================== 类型定义 ====================
export interface Item {
    id: string;
    name: string;
    // 其他字段可自行扩展
}

interface PageData {
    data: Item[];
    nextPage: number | null;
    totalPages: number;
}

// ==================== API 请求函数 ====================
// 请根据实际接口替换 URL 和参数
const fetchItems = async ({ pageParam = 1 ,params}): Promise<PageData> => {

    const response = await new Promise(resolve => {
        R_POST("/open-api/mobile/home/material/normal/list", { pageNum: pageParam, pageSize: 10, ...params })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                console.log('error<->:', error);
                return error;
            });
    });

    console.log('response:',response)

    if (response.code != 200) throw new Error('Network response was not ok');

    // const rawData = await response.data;
    // 将接口返回的数据转换成符合 PageData 的结构

    // console.log('rawData:',rawData)

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

// ==================== 自定义 Hook ====================
const useInfiniteItems = () => {
    return useInfiniteQuery({
        queryKey: ['items'],
        queryFn: fetchItems,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        staleTime: 10000, // 5 分钟内数据视为新鲜
        // gcTime: 10 * 60 * 1000,   // 缓存保留 10 分钟
    });
};

// ==================== 主组件 ====================
const InfiniteList: React.FC = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        refetch,
    } = useInfiniteItems();

    // 将所有页的数据展平为一维数组
    const allItems = data?.pages.flatMap((page) => page.data) ?? [];

    // 加载更多
    const loadMore = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // 渲染单个列表项
    const renderItem = useCallback(({ item }: { item: Item }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item?.title}</Text>
            </View>
        );
    }, []);

    // 列表底部：加载更多指示器 或 无更多数据提示
    const renderFooter = () => {
        if (!hasNextPage && allItems.length > 0) {
            return (
                <View style={styles.footer}>
                    <Text style={styles.footerText}>—— 已加载全部 ——</Text>
                </View>
            );
        }
        if (isFetchingNextPage) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator size="small" />
                    <Text style={styles.footerText}>加载更多...</Text>
                </View>
            );
        }
        return null;
    };

    // 列表头部：初次加载指示器
    const renderHeader = () => {
        if (isLoading) {
            return (
                <View style={styles.header}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        return null;
    };

    // 错误状态
    if (isError) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>加载失败: {error?.message}</Text>
                <TouchableOpacity onPress={() => refetch()} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>重试</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // 空状态
    if (!isLoading && allItems.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <Text>暂无数据</Text>
            </View>
        );
    }

    return (
        <FlashList
            data={allItems}
            renderItem={renderItem}
            keyExtractor={(item) => {
                console.log('item+++',item)

                return "list-"+item.id
            }}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            estimatedItemSize={110} // 预估每个列表项的高度，务必根据实际内容调整
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            contentContainerStyle={styles.listContentContainer}
        />
    );
};

// ==================== 样式 ====================
const styles = StyleSheet.create({
    listContentContainer: {
        flexGrow: 1,
        width: '100%',
    },
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        height:110
    },
    itemText: {
        fontSize: 16,
    },
    footer: {
        padding: 20,
        alignItems: 'center',
    },
    footerText: {
        marginTop: 8,
        color: '#666',
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
    retryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#007AFF',
        borderRadius: 4,
    },
    retryButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default InfiniteList;
