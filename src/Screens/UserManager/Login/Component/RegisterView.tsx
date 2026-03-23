import {Alert, TextInput, TouchableOpacity, View,Text} from "react-native";
import GStyles from "../../../../Components/GStyles";
import CountdownButton, {CountdownButtonHandle} from "../../../../Components/CountdownButton";
import React, {useRef, useState} from "react";

function RegisterView() {

    const [loginEmail,setLoginEmail] = useState()

    const countdownRef = useRef<CountdownButtonHandle>(null);

    const handleSendCode = async () => {
        try {
            // 模拟发送验证码请求
            await sendVerificationCode(); // 假设这是一个 API 调用
            // 请求成功后手动开始倒计时
            countdownRef.current?.start();

        } catch (error) {
            Alert.alert('发送失败', '请稍后重试');
        }
    };

    const sendVerificationCode = () => {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    };


    return(<View>
        <View
            style={[
                GStyles.row,
                GStyles.ph12,
                {
                    width: '100%',
                    backgroundColor: '#fff',
                    marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 5,
                },
            ]}
        >
            <TextInput
                value={loginEmail}
                onChangeText={setLoginEmail}
                secureTextEntry={true}
                placeholder={'Email'}
                style={{
                    height: 44,
                }}
            />
        </View>

        <View style={[GStyles.row,GStyles.ac]}>
            <View style={{backgroundColor:'#ffffff',flex:1,height:40,paddingHorizontal:10,borderRadius:5,marginRight:10}}>
                <TextInput style={{flex:1}} placeholder={'code'} />
            </View>

            <CountdownButton
                ref={countdownRef}
                onPress={handleSendCode}
                normalText="获取验证码"
                countingText="剩余{time}秒"
            />
        </View>

        <TouchableOpacity style={[GStyles.jc,GStyles.ac,{marginTop:20,borderRadius:5,height:44,backgroundColor:'#123'}]}>
            <Text style={{color:'#fff'}}>提交</Text>
        </TouchableOpacity>
    </View>)
}

export default RegisterView
