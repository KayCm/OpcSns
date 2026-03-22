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
        <View style={{ flex: 1,backgroundColor:''}}>
            <NavHeader title={'个人资料'} />
            <View style={[GStyles.ph12]}>
                <MenuBar title={'头像'} LeftDom={<View style={{height:44,width:44,backgroundColor:'#123',borderRadius:22}}></View>} />
                <MenuBar title={'昵称'} LeftDom={<Text style={{}}>XXX</Text>} />
                <MenuBar title={'性别'} LeftDom={<Text style={{}}>男</Text>} />
                <MenuBar title={'绑定账号'} LeftDom={<Text style={{}}>1@2.com</Text>} />
            </View>

            <TouchableOpacity onPress={()=>{}} style={[GStyles.jc,GStyles.ac,{marginTop:100,width:'100%',height:64,backgroundColor:'#fff'}]}>
              <Text style={{color:'red',fontSize:14}}>注销</Text>
            </TouchableOpacity>
        </View>
    );
}

export default IndexView;
