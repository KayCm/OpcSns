import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView, Alert,
} from 'react-native';
import NavHeader from "../../../Components/NavHeader";
import GStyles, { appSize } from '../../../Components/GStyles.ts';
import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {R_POST} from "../../../Services/NetRequestService";

function IndexView(props: any) {


  const [feedText, setFeedText] = React.useState<string>('');

  const [loginEmail,setLoginEmail] = React.useState<string>('');

    const userInfo = useSelector(state => state?.userInfo);

    useEffect(()=>{
        setLoginEmail(userInfo.email)
    },[])

    const sendFeed = () => {

        let params = {
            "memberId": 1,
            "type": "bug",
            "title": "feedback",
            "content": feedText,
            "contact": userInfo.email
        }

        R_POST('/open-api/mobile/member/feedback/submit',params).then(res=>{

            Alert.alert('提交成功')

        }).catch(err=>{

        })

    }

    return (
      <View style={{ flex: 1, backgroundColor: '' }}>
        <NavHeader title={'意见反馈'} />

        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ backgroundColor: '' }}>
            <View
              style={[
                GStyles.row,
                GStyles.ac,
                GStyles.ph12,
                  GStyles.pv10,
                {
                  marginTop: appSize(20),
                  width: '100%',
                    backgroundColor:'#fff'
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

              <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,GStyles.pv20,GStyles.ph12,{marginTop:appSize(10),backgroundColor:'#fff'}]}>
                  <Text style={[GStyles.ffh11,{fontSize:appSize(18)}]}>您的邮箱</Text>
                  <TextInput
                      value={loginEmail}
                      onChangeText={setLoginEmail}
                      placeholder={'请输入邮箱'}

                      style={{textAlign:'right',height: appSize(44),marginLeft:appSize(12),width:appSize(200)}}/>
              </View>

            <TouchableOpacity
                onPress={()=>{
                    sendFeed()
                }}
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
