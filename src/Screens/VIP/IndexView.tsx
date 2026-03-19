import {View, Text, Image} from "react-native";
import DataList from "../../Components/DataList";
import GStyles, {TRUE_ONE_LINE, TURE_ONE_LINE} from "../../Components/GStyles";

function IndexView() {

    function renderRow(item) {
        return (<View style={[GStyles.ph12,GStyles.pv12]}>
            <View style={[GStyles.row,{gap:10,borderBottomWidth:TRUE_ONE_LINE,borderColor:'#00000030',paddingBottom:10}]}>
                <View style={[GStyles.jcBetween,{flex:1}]}>
                    <Text style={{fontSize:18}}>{item?.item?.id}-{item?.item?.volumeInfo?.title}</Text>
                    <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween]}>
                        <View style={[GStyles.row,GStyles.ac,GStyles.jc,{gap:5}]}>
                            <View style={[GStyles.jc,GStyles.ac,{height:20,width:40,backgroundColor:'red',borderRadius:2}]}>
                                <Text style={{color:'#fff'}}>VIP</Text>
                            </View>
                            <Text>1小时前</Text>
                        </View>
                        <Text>Foxs News</Text>
                    </View>
                </View>
                <Image style={{height:100,width:100,backgroundColor:'#123',borderRadius:5}}/>
            </View>
        </View>)
    }

    return(<View style={[{flex:1}]}>

        {/*{renderRow(null)}*/}

        <DataList renderRow={renderRow}/>
    </View>)
}

export default IndexView;
