import {Image, Text, TouchableOpacity, View} from "react-native";
import NavHeader from "../../../Components/NavHeader";
import GStyles, {appSize, TRUE_ONE_LINE} from "../../../Components/GStyles";
import {useTranslation} from "react-i18next";

function LanguageView() {

    const { t,i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const MenuBar = ({ title = 'title', LeftDom, onPress,style,showRightIcon=true }) => {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={[
                    GStyles.row,
                    GStyles.ac,
                    GStyles.jcBetween,
                    GStyles.ph25,
                    {
                        height: appSize(64),
                        width: '100%',
                        marginTop:appSize(8),
                        borderBottomWidth: TRUE_ONE_LINE,
                        borderColor: '#2c2c2c50',
                        ...style
                    },
                ]}
            >
                <Text style={{ fontSize: appSize(14), fontWeight: '600' }}>{title}</Text>
                <View style={[GStyles.row, GStyles.jc, GStyles.ac]}>
                    {LeftDom}
                    {showRightIcon&&(<Image source={require('../../../Assets/mine/icon-right.png')} style={{height:appSize(24),width:appSize(25)}} />)}
                </View>
            </TouchableOpacity>
        );
    };




    return(<View style={{ flex: 1,backgroundColor:''}}>
        <NavHeader title={'选择语言'} />
        <MenuBar title={'中文'} onPress={()=>{
            changeLanguage('en')
        }} LeftDom={<Image style={{height:appSize(18),width:appSize(18)}} source={require('../../../Assets/mine/xuanzhong.png')} />} showRightIcon={false} style={{marginTop:appSize(20), backgroundColor: '#ffffff' }} />
        <MenuBar title={'English'} onPress={()=>{
            changeLanguage('zh')
        }}  showRightIcon={false} style={{ backgroundColor: '#ffffff' }} />
    </View>)
}

export default LanguageView
