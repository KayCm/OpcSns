import {View,Text, TouchableOpacity} from "react-native";
import NavHeader from "../../../Components/NavHeader";

function IndexView(props: any) {

    return (
        <View style={{ flex: 1,backgroundColor:'#fff'}}>
            <NavHeader title={'关于我们'} />
        </View>
    );
}

export default IndexView;
