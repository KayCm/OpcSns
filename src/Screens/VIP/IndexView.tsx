import {View, Text, Image, TouchableOpacity} from "react-native";
import DataList2 from "../../Components/DataList2/Index";
import GStyles, {TRUE_ONE_LINE} from "../../Components/GStyles";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {R_POST} from "../../Services/NetRequestService";
import {useQuery} from "@tanstack/react-query";

function IndexView() {

    const inset = useSafeAreaInsets()


    // const { isPending, isError, data, error } = useQuery({
    //     queryKey: ['todos'],
    //     queryFn: ()=> R_POST('/open-api/mobile/home/tag/list'),
    // })




    return(<View style={{flex:1,paddingTop:inset.top}}>

        <TouchableOpacity onPress={()=>{
            R_POST("/open-api/mobile/home/material/normal/list", { pageNum: 2, pageSize: 5}).then(response => {
                console.log('response',response)
            }).catch(error => {
                console.log('error',error)
            });
        }}><Text>123123</Text></TouchableOpacity>

    </View>)
}

export default IndexView;
