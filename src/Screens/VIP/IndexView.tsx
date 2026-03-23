import {View, Text, Image} from "react-native";
import DataList from "../../Components/DataList";
import GStyles, {TRUE_ONE_LINE} from "../../Components/GStyles";
import {useSafeAreaInsets} from "react-native-safe-area-context";


function IndexView() {

    const inset = useSafeAreaInsets()

    return(<View style={{flex:1,paddingTop:inset.top}}>

        <Text>123</Text>


    </View>)
}

export default IndexView;
