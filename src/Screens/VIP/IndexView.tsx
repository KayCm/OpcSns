import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";
import DataList2 from "../../Components/DataList2/Index";
import GStyles, {appSize, TRUE_ONE_LINE, WINDOW_WIDTH} from "../../Components/GStyles";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {R_POST} from "../../Services/NetRequestService";
import InfiniteList from "../../Components/InfiniteList";


function IndexView() {

    const inset = useSafeAreaInsets()


    return(<ImageBackground imageStyle={{width:WINDOW_WIDTH,height:appSize(287)}}
                         source={require('../../Assets/Vip/vipBg.png')}
                         style={{flex:1,paddingTop:inset.top,backgroundColor:'#ffffff'}}>

        <InfiniteList url={"/open-api/mobile/home/material/normal/list"} params={{tagId:12}} />

        </ImageBackground>)
}

export default IndexView;
