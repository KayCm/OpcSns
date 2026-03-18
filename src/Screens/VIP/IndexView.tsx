import {View,Text} from "react-native";
import DataList from "../../Components/DataList";
import GStyles from "../../Components/GStyles";

function IndexView() {

    function renderRow(item) {
        console.log(item)

        return (<View style={[GStyles.ph12,GStyles.pv12]}>

            <View style={[GStyles.row]}>
                <View style={{height:100,width:100,backgroundColor:123}}/>
                <View style={{flex:1,backgroundColor:'red'}}>
                    <Text>123</Text>
                    <Text style={{height:80}}>12sdalfjsdlkfjadkslfjkldsafjldskajfldkasjfklasjfkldsajfkalsdfjldksfjdklsfjdlskfjklfjdklfjdsaklfdsjdklsjlkjfsaljfdkalsjfdskaljfdsklfjklfjdsalkfjdaslkfjsaflkfsladkjfdaskljfadkslfjasdklfjadslkfjdsalkfjadslkfjsldkafjslak3</Text>
                </View>
            </View>


        </View>)
    }

    return(<View style={[{flex:1}]}>

        {renderRow(null)}

        {/*<DataList renderRow={renderRow}/>*/}
    </View>)
}

export default IndexView;
