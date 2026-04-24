import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import NavHeader from "../../../Components/NavHeader";
import GStyles, {appSize} from "../../../Components/GStyles";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {R_POST} from "../../../Services/NetRequestService";
import NewsRenderRow from "../Component/NewsRenderRow";
import {useNavigation} from "@react-navigation/native";
import { FlashList } from '@shopify/flash-list';
import {COLORS} from "../../../Components/Constant";
import {storage} from "../../../Redux/store";

function IndexView() {
  const [searchWord, setSearchWord] = useState('');
  const [orderByColumn, setOrderByColumn] = useState('online_time');
  const [ListData,setsListData] = useState([]);


  const navigation = useNavigation();


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

  const { isPending, isLoading, isError, data, error } = useQuery({
    queryKey: [String('hotword_list')],
    queryFn: () =>
      R_POST('/open-api/mobile/search/hotword/list', {
        pageNum: 1,
        pageSize: 20,
      }),
    staleTime: 1000 * 60 * 60 * 24
  });
  //
  if (isPending) return null;

  if (isLoading) return <Text>Loading</Text>;

  if (error) return <Text>error</Text>;

  // /open-api/mobile/search

  const searchKeyword = (searchKey,order) => {

    setOrderByColumn(order)

    R_POST('/open-api/mobile/search', {
      pageNum: 1,
      pageSize: 50,
      keyword: searchKey,
      orderByColumn: order,
      isAsc: false,
    })
      .then(data => {
        console.log('data', data);
        setsListData(data?.data);
      })
      .catch(err => {});


  }

  return (
    <View style={{ backgroundColor: '#F8F8F8', flex: 1 }}>
      <NavHeader title={''} />

      <View
        style={[
          GStyles.row,
          GStyles.ac,
          GStyles.ph12,
          {
            backgroundColor: '',
            gap: appSize(10),
            height: appSize(44),
            marginTop: appSize(12),
          },
        ]}
      >
        <View
          style={[
            GStyles.ac,
            GStyles.row,
            {
              paddingHorizontal: appSize(8),
              gap: appSize(10),
              flex: 1,
              height: appSize(44),
              backgroundColor: '#EBEBEB',
            },
          ]}
        >
          <Image
            style={{ height: appSize(24), width: appSize(24) }}
            source={require('../../../Assets/News/user_search.png')}
          />
          <TextInput
            value={searchWord}
            onChangeText={(e)=>{
                setSearchWord(e)
                if (!e){
                    setsListData([])
                }
            }}
            placeholder={'请输入搜索词'}
            style={{
              height: appSize(44),
                flex:1,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            searchKeyword(searchWord,'online_time');
          }}
          style={[
            GStyles.jc,
            GStyles.ac,
            {
              backgroundColor: '#A5885F',
              height: appSize(44),
              width: appSize(88),
            },
          ]}
        >
          <Text style={{ color: '#fff', fontSize: appSize(18) }}>搜索</Text>
        </TouchableOpacity>
      </View>

        {searchWord ? (<View style={{paddingHorizontal:appSize(12),paddingVertical:appSize(10),paddingTop:appSize(20),flexDirection:'row',alignItems:'center',height:appSize(36)}}>

            <TouchableOpacity onPress={()=>{
                // setOrderByColumn('online_time')
                searchKeyword(searchWord,'online_time');
            }} style={{borderBottomColor:orderByColumn=='online_time'?'#A5885F':'#00000000',borderBottomWidth:appSize(4),paddingHorizontal:appSize(12),height:appSize(36),justifyContent:'center',alignItems:'center'}}>
                <Text style={[GStyles.ffh11,{fontSize:orderByColumn=='online_time'?appSize(20):appSize(16),color:orderByColumn=='online_time'?'#A5885F':COLORS.FONTBLACK}]}>最新</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
                // setOrderByColumn('view_count')
                searchKeyword(searchWord,'view_count');
            }}  style={{borderBottomColor:orderByColumn=='view_count'?'#A5885F':'#00000000',borderBottomWidth:appSize(4),height:appSize(36),paddingHorizontal:appSize(12),justifyContent:'center',alignItems:'center'}}>
                <Text style={[GStyles.ffh11,{fontSize:orderByColumn=='view_count'?appSize(20):appSize(16),color:orderByColumn=='view_count'?'#A5885F':COLORS.FONTBLACK}]}>最热</Text>
            </TouchableOpacity>

        </View>):(<View
            style={{
                paddingHorizontal: appSize(12),
                marginTop: appSize(20),
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: appSize(10),
            }}
        >
            {data?.data?.map((value, index, arr) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            setSearchWord(value?.keyword);
                            searchKeyword(value?.keyword,'online_time');
                        }}
                        key={index}
                        style={{
                            borderRadius: appSize(3),
                            paddingHorizontal: appSize(10),
                            paddingVertical: appSize(4),
                            backgroundColor: '#ECECEC',
                        }}
                    >
                        <Text style={{ color: '#7C7C7C' }}>{value?.keyword}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>)}





      {ListData && (
        <View style={{ backgroundColor: '', flex: 1, marginTop: appSize(10) }}>
          <FlashList
            renderItem={item =>
              NewsRenderRow({
                item: item,
                  readList:readList,
                onPress: item => {
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
            data={ListData}
          />
        </View>
      )}
    </View>
  );
}
export default IndexView
