import {View,Text, TouchableOpacity, TextInput} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Redux/persistedReducer';

function IndexView() {

    const navigation = useNavigation();

  const dispatch = useDispatch();

  const particleUserInfo = useSelector(state => state?.userInfo);


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

        <Text>{particleUserInfo?.name}</Text>

        <TouchableOpacity
            style={{marginTop:30}}
          onPress={() => {

            let userInfo = {
              avatar: 'a',
              phone: '11111',
              email: '1@2.com',
              apple_email: '1@2.com',
              apple_id: 'a5647456456',
              google_email: '1@2.com',
              google_id: 'g23423423423432',
              name: 'Nammmmmm',
              uuid: 'uuid123456',
              token: 'sakldrtuyaoifhajkdhfkajaaaa',
            };


            dispatch(login(userInfo));

          }}
        >
          <Text>Go Detail</Text>
        </TouchableOpacity>
      </View>
    );
}

export default IndexView;
