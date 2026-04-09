import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import NavHeader from "../../../Components/NavHeader";
import GStyles, { appSize } from '../../../Components/GStyles.ts';
import React from 'react';

function IndexView(props: any) {


  const [feedText, setFeedText] = React.useState<string>('');

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <NavHeader title={'意见反馈'} />

        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: appSize(20), backgroundColor: '' }}>
            <View
              style={[
                GStyles.row,
                GStyles.ac,
                GStyles.ph12,
                {
                  marginTop: appSize(20),
                  width: '100%',
                  borderColor: '#000',
                  borderWidth: 1,
                },
              ]}
            >
              <TextInput
                value={feedText}
                onChangeText={setFeedText}
                placeholder={'请输入意见'}
                multiline={true}
                style={{
                  height: appSize(200),
                  width: '100%',
                  textAlignVertical: 'top',
                }}
              />
            </View>

            <TouchableOpacity
              style={[
                GStyles.jc,
                GStyles.ac,
                {
                  marginTop: appSize(20),
                  height: appSize(55),
                  backgroundColor: '#A5885F',
                },
              ]}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '600',
                  letterSpacing: appSize(5),
                  fontSize: appSize(20),
                }}
              >
                提交
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
}

export default IndexView;
