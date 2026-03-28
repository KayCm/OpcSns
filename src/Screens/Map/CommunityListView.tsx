import {View, Text, TouchableOpacity} from "react-native";
import NavHeader from "../../Components/NavHeader";
import {FlashList} from "@shopify/flash-list";
import index from "../../Components/DataList2";

function CommunityListView({navigation,route}) {


    console.log(route?.params?.list)

    const renderRow = ({item,index}) => {

        console.log(item)
        console.log(index)

        return(<TouchableOpacity style={{paddingHorizontal:12,height:44,justifyContent:'center'}} onPress={()=>{
            if (route?.params?.click)route?.params?.click(item,index)
            navigation.goBack()
        }}>
            <Text>{item?.name}</Text>
        </TouchableOpacity>)
    }

    return(<View style={{flex:1}}>
        <NavHeader title={'社区列表'} />
        <FlashList renderItem={renderRow} data={route?.params?.list} />

    </View>)
}
export default CommunityListView
