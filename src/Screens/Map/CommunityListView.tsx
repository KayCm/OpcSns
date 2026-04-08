import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import NavHeader from "../../Components/NavHeader";
import {FlashList} from "@shopify/flash-list";
import index from "../../Components/DataList2";
import GStyles, {appSize} from "../../Components/GStyles";
import {useState} from "react";
import Modal from 'react-native-modal'

function CommunityListView({navigation,route}) {


    console.log(route?.params?.list?.data)


    const List = () => {

        let dom = []

        Object.entries(route?.params?.list?.data).forEach(([key, value]) => {
            console.log(key, value);

            dom.push(<View key={key} style={{backgroundColor:'#fff',marginTop:appSize(10),paddingHorizontal:appSize(10),paddingVertical:appSize(10)}}>
                <Text style={{fontSize:appSize(24)}}>{key}</Text>
                <View>
                    {value.map((v,i)=>{
                        return(<TouchableOpacity onPress={()=>{
                            if (route?.params?.click)route?.params?.click(v)
                            navigation.goBack()
                        }} style={{borderWidth:0,paddingVertical:appSize(20)}} key={i}>
                            <Text style={[GStyles.ffh11,{marginLeft:appSize(12),fontSize:appSize(14)}]}>{v.name}</Text>
                        </TouchableOpacity>)
                    })}
                </View>
            </View>)
        })

        return(<View>
            {dom}
        </View>)

    }


    return(<View style={{flex:1}}>
        <NavHeader title={'社区列表'} />
        {/*<FlashList renderItem={renderRow} data={route?.params?.list} />*/}

        <ScrollView>
            <List />
        </ScrollView>


    </View>)
}
export default CommunityListView
