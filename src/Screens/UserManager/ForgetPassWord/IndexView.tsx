import {View, Text, TouchableOpacity, TextInput, Alert} from "react-native";
import GStyles from "../../../Components/GStyles";
import CountdownButton, {CountdownButtonHandle} from "../../../Components/CountdownButton";
import React, {useRef, useState} from "react";
import NavHeader from "../../../Components/NavHeader";

function IndexView(props: any) {

    const [code,setCode] = useState('')
    const [email,setEmail] = useState('')
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


    const SendCodeDom = () => {

        return(<View style={[GStyles.ph12,{marginTop:10}]}>

            <Text>忘记密码</Text>
            <Text>请输入邮箱验证</Text>
            <View style={[GStyles.row, GStyles.ph12, {width: '100%', backgroundColor: '#fff', marginTop: 10, borderRadius: 5,},]}>
                <TextInput value={email} onChangeText={setEmail}  placeholder={'Email'} style={{height: 44,}}/>
            </View>
            <View style={[GStyles.row,GStyles.ac,{marginTop: 10}]}>
                <View style={{backgroundColor:'#ffffff',flex:1,height:40,paddingHorizontal:10,borderRadius:5,marginRight:10}}>
                    <TextInput style={{flex:1}} value={code} onChangeText={setCode} placeholder={'Code'} />
                </View>
                <CountdownButton
                    ref={countdownRef}
                    onPress={handleSendCode}
                    normalText="获取验证码"
                    countingText="剩余{time}秒"
                />
            </View>
            <TouchableOpacity style={[GStyles.jc,GStyles.ac,{marginTop:10,borderRadius:5,height:44,backgroundColor:'#123'}]}>
                <Text style={{color:'#fff'}}>提交</Text>
            </TouchableOpacity>

        </View>)

    }

    const [password,setPassword] = useState('')
    const [repassword,setRePassword] = useState('')

    const ResetPasswordDom = () => {
        return(<View style={[GStyles.ph12,{marginTop:10}]}>
            <Text>忘记密码</Text>
            <Text>请输入邮箱验证</Text>
            <View style={[GStyles.row, GStyles.ph12, {width: '100%', backgroundColor: '#fff', marginTop: 10, borderRadius: 5,},]}>
                <TextInput value={password} onChangeText={setPassword}  placeholder={'Password'} style={{height: 44,}}/>
            </View>
            <View style={[GStyles.row, GStyles.ph12, {width: '100%', backgroundColor: '#fff', marginTop: 10, borderRadius: 5,},]}>
                <TextInput value={repassword} onChangeText={setRePassword}  placeholder={'Password'} style={{height: 44,}}/>
            </View>
            <TouchableOpacity style={[GStyles.jc,GStyles.ac,{marginTop:10,borderRadius:5,height:44,backgroundColor:'#123'}]}>
                <Text style={{color:'#fff'}}>提交</Text>
            </TouchableOpacity>
        </View>)
    }

    return (
        <View style={{ flex: 1}}>
            <NavHeader title={'忘记密码'}/>

            <SendCodeDom />

            <ResetPasswordDom />

        </View>
    );
}

export default IndexView;
