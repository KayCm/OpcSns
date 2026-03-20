import {View, Text, ScrollView, TouchableOpacity} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import GStyles, {TRUE_ONE_LINE} from "../../Components/GStyles";
import { Shadow } from 'react-native-shadow-2';
import {useTranslation} from "react-i18next";
import IconNext from "../../Assets/Svgs/IconNext";
import {useNavigation} from "@react-navigation/native";

function IndexView() {

   const area = useSafeAreaInsets()

    const Nav = useNavigation();

    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const MenuBar = ({title='title',onPress}) => {
        return(<TouchableOpacity onPress={onPress} style={[GStyles.row,GStyles.ac,GStyles.jcBetween,{height:64,width:'100%',borderBottomWidth:TRUE_ONE_LINE,borderColor:'#2c2c2c50'}]}>
            <Text style={{fontSize:16,fontWeight:'600'}}>{title}</Text>
            <IconNext />
        </TouchableOpacity>)
    }

    const MemberCard = () => {

        return(<View style={[GStyles.jcBetween,{paddingVertical:30,paddingHorizontal:12,width:'90%',height:150,borderRadius:10,backgroundColor:'#23232330'}]}>

            <View style={[GStyles.row,GStyles.ac,{gap:10}]}>
                <Text>OPC NEWS会员</Text>

                <View style={[GStyles.jc,GStyles.ac,GStyles.pv5,GStyles.ph10,{borderRadius:20,borderColor:'#232323',borderWidth:1}]}>
                    <Text>已开通</Text>
                </View>
            </View>

            <View style={[GStyles.row,GStyles.ac,{gap:10}]}>
                <Text>登录后查看您的会员等级</Text>
                <View style={[GStyles.jc,GStyles.ac,GStyles.pv5,GStyles.ph10,{borderRadius:20,backgroundColor:'#123'}]}>
                    <Text style={{color:'#fff'}}>查看详情</Text>
                </View>
            </View>


        </View>)
    }

    return(<View style={{flex:1,paddingTop:area.top}}>
        <ScrollView style={[GStyles.ph12]}>

            <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,{height:80,width:'100%'}]}>
                <TouchableOpacity onPress={()=>{
                    Nav.navigate('ProfileSettings')
                }} style={[GStyles.row,GStyles.ac,{marginBottom:10}]}>
                    <View style={{width:64,height:64,borderRadius:32,backgroundColor:'#123'}}/>
                    <View style={{gap:10,marginLeft:10}}>
                        <Text>NickName</Text>
                        <Text>2026-04-15</Text>
                    </View>
                </TouchableOpacity>
                <IconNext />
            </View>

            <View style={[GStyles.jc,GStyles.ac,{width:'100%',height:160}]}>
                <MemberCard />
            </View>

            <MenuBar title={t('profile.aboutUs')} onPress={()=>{
                Nav.navigate('About')
            }} />
            <MenuBar title={t('profile.purchase')} onPress={()=>{
                Nav.navigate('Purchase')
            }} />
            <MenuBar title={t('profile.faq')} onPress={()=>{
                Nav.navigate('Faq')
            }} />
            <MenuBar title={t('profile.feedback')} onPress={()=>{
                Nav.navigate('FeedBack')
            }} />
            <MenuBar title={t('profile.settings')} onPress={()=>{
                Nav.navigate('Settings')
            }} />



        </ScrollView>
    </View>)
}

export default IndexView;
