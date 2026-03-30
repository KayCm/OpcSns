import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Image, Text, TouchableOpacity, View} from "react-native";
import GStyles, {appSize, NAVIGATOR_HEIGHT, TRUE_ONE_LINE} from "../../../Components/GStyles";
import IconSearch from "../../../Assets/Svgs/IconSearch";
import IconAvatar from "../../../Assets/Svgs/IconAvatar";

function NewsNav() {
    const insets = useSafeAreaInsets()
    return (
        <View
            style={{
                height: insets.top + NAVIGATOR_HEIGHT,
                width: '100%',
                paddingTop: insets.top,
                backgroundColor: '#ffffff',
                // borderBottomColor: '#00000030',
                // borderBottomWidth: TRUE_ONE_LINE,
            }}
        >
            <View
                style={[
                    GStyles.row,
                    GStyles.ac,
                    GStyles.jcBetween,
                    GStyles.ph12,
                    { height: NAVIGATOR_HEIGHT, width: '100%' },
                ]}>

                <Image resizeMode={'contain'} source={require('../../../Assets/Header/nexa.png')}  style={{width:appSize(100),height:appSize(24)}} />

                <View style={[GStyles.row, GStyles.ac, GStyles.ac, { gap: 10 }]}>
                    <TouchableOpacity onPress={()=>{
                        // navigation.navigate('Search')
                    }}>
                        <Image source={require('../../../Assets/Header/search.png')} style={{width:appSize(24),height:appSize(24)}} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Login')
                        // navigation.navigate('ForgetPassword')
                    }}>
                        <Image source={require('../../../Assets/Header/user.png')} style={{width:appSize(24),height:appSize(24)}} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default NewsNav
