import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Image, Text, TouchableOpacity, View} from "react-native";
import GStyles, {appSize, NAVIGATOR_HEIGHT, TRUE_ONE_LINE} from "../../../Components/GStyles";
import IconSearch from "../../../Assets/Svgs/IconSearch";
import IconAvatar from "../../../Assets/Svgs/IconAvatar";
import { useNavigation } from '@react-navigation/native';
import IconNext from "../../../Assets/Svgs/IconNext";
import IconNexa from "../../../Assets/Svgs/IconNexa";

function NewsNav() {
    const insets = useSafeAreaInsets()
  const navigation = useNavigation();
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

                {/*<Image resizeMode={'contain'} source={require('../../../Assets/Header/nexa.png')}  style={{width:appSize(100),height:appSize(24)}} />*/}

                <IconNexa/>

                <View style={[GStyles.row, GStyles.ac, GStyles.ac, {marginRight:appSize(10)}]}>
                    <TouchableOpacity onPress={()=>{
                         navigation.navigate('Search')
                    }}>
                        <Image source={require('../../../Assets/Header/search.png')} style={{width:appSize(24),height:appSize(24)}} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default NewsNav
