import {View,Text, TouchableOpacity} from "react-native";
import NavHeader from "../../../Components/NavHeader";
import GStyles, {TRUE_ONE_LINE} from "../../../Components/GStyles";
import IconNext from "../../../Assets/Svgs/IconNext";

function IndexView(props: any) {

    const MenuBar = ({title='title',LeftDom,onPress}) => {
        return(<TouchableOpacity onPress={onPress} style={[GStyles.row,GStyles.ac,GStyles.jcBetween,{height:64,width:'100%',borderBottomWidth:TRUE_ONE_LINE,borderColor:'#2c2c2c50'}]}>
            <Text style={{fontSize:16,fontWeight:'600'}}>{title}</Text>

            <View style={[GStyles.row,GStyles.jc,GStyles.ac]}>
                {LeftDom}
                <IconNext />
            </View>

        </TouchableOpacity>)
    }

    return (
        <View style={{ flex: 1,backgroundColor:'#fff'}}>
            <NavHeader title={'aaa'} />
            <View style={[GStyles.ph12]}>
                <MenuBar title={'头像'} LeftDom={<View style={{height:44,width:44,backgroundColor:'#123',borderRadius:22}}></View>} />
            </View>
        </View>
    );
}

export default IndexView;
