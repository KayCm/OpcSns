import {View,Text, TouchableOpacity, TextInput} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {useState} from "react";

function IndexView() {

    const navigation = useNavigation();

    let initHtml:string = `
      <div>
        <h1>React Native WebView123</h1>
      </div>
  `;

    const [html, setHtml] = useState<string>(initHtml);

    return (
      <View style={{ flex: 1,padding:10,alignItems:'center' }}>
        <TextInput
          style={{ borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              padding: 10,
              width:'100%',
              minHeight: 200, // 设置最小高度
              textAlignVertical: 'top', // 文本从顶部开始
            }}
          multiline={true}
          value={html}
          defaultValue={initHtml}
          onChangeText={setHtml}
          placeholder="请输入多行文本..."
        />

        <TouchableOpacity
            style={{marginTop:30}}
          onPress={() => {
            navigation.navigate('Detail', {html:html});
          }}
        >
          <Text>Go Detail</Text>
        </TouchableOpacity>
      </View>
    );
}

export default IndexView;
