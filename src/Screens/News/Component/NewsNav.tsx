import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Text, TouchableOpacity, View} from "react-native";
import GStyles, {NAVIGATOR_HEIGHT, TRUE_ONE_LINE} from "../../../Components/GStyles";
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
                borderBottomColor: '#00000030',
                borderBottomWidth: TRUE_ONE_LINE,
            }}
        >
            <View
                style={[
                    GStyles.row,
                    GStyles.ac,
                    GStyles.jcBetween,
                    GStyles.ph12,
                    { height: NAVIGATOR_HEIGHT, width: '100%' },
                ]}
            >
                <Text style={{ fontSize: 18, fontWeight: '800' }}>OPC NEWS</Text>
                <View style={[GStyles.row, GStyles.ac, GStyles.ac, { gap: 10 }]}>
                    <TouchableOpacity onPress={()=>{
                        // navigation.navigate('Search')
                    }}>
                        <IconSearch />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Login')
                        // navigation.navigate('ForgetPassword')
                    }}>
                        <IconAvatar />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default NewsNav
