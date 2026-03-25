import {View, Text, Image, TouchableOpacity} from "react-native";
import DataList2 from "../../Components/DataList2/Index";
import GStyles, {TRUE_ONE_LINE} from "../../Components/GStyles";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {R_POST} from "../../Services/NetRequestService";

function IndexView() {

    const inset = useSafeAreaInsets()

    const test = () => {

        R_POST("/open-api/mobile/home/material/normal/list", {

        }).then(function (response) {

            console.log(response)

        }).catch(function (error) {

        }).finally(function () {
            // always executed
        });

    }



    return(<View style={{flex:1,paddingTop:inset.top}}>


    </View>)
}

export default IndexView;
