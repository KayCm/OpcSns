import {View,Text, TouchableOpacity} from "react-native";
import NavHeader from "../../../Components/NavHeader";

function IndexView(props: any) {

    return (
        <View style={{ flex: 1,backgroundColor:'#fff'}}>
            <NavHeader title={'常见问题'} />
        </View>
    );
}

export default IndexView;
