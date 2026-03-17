import {View,Text, TouchableOpacity} from "react-native";
import WebView from 'react-native-webview';

function IndexView(props: any) {

    const html = props?.route?.params?.html

    return (
        <View style={{ flex: 1 }}>
            <WebView source={{ html }} style={{ flex: 1, width: '100%' }} />
        </View>
    );
}

export default IndexView;
