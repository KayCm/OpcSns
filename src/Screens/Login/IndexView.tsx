import React, { useRef } from 'react';
import {View, Text, Alert, TouchableOpacity, TextInput} from "react-native";
import NavHeader from "../../Components/NavHeader";
import CountdownButton, {CountdownButtonHandle} from "../../Components/CountdownButton";
import {useNavigation} from "@react-navigation/native";
import {LoginViewModel} from "./LoginViewModel";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import IconNavClose from "../../Assets/Svgs/IconNavClose";
import GStyles from "../../Components/GStyles";
// import CountdownButton, { CountdownButtonHandle } from '';

function IndexView() {

    const {loginAct,
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword
    } = LoginViewModel()

    const nav = useNavigation()

    const countdownRef = useRef<CountdownButtonHandle>(null);

    const handleSendCode = async () => {
        try {
            // 模拟发送验证码请求
            await sendVerificationCode(); // 假设这是一个 API 调用
            // 请求成功后手动开始倒计时
            countdownRef.current?.start();

            // loginAct()

            // nav.navigate('Register')


        } catch (error) {
            Alert.alert('发送失败', '请稍后重试');
        }
    };

    // 假设 sendVerificationCode 是异步函数
    const sendVerificationCode = () => {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    };



    return(<View style={[GStyles.ph12,{flex:1,paddingTop:useSafeAreaInsets().top}]}>

        <View style={[GStyles.row,GStyles.flexEnd,{width:'100%'}]}>
            <TouchableOpacity onPress={()=>{
                nav.goBack()
            }} >
                <IconNavClose />
            </TouchableOpacity>
        </View>

        <Text style={{fontSize:50,fontWeight:'800'}}>Login</Text>

        <Text>Email</Text>
        <TextInput  value={loginEmail}
                    onChangeText={setLoginEmail}
                    style={{backgroundColor:'#fff',borderRadius:5}}/>
        <Text>Password</Text>
        <TextInput value={loginPassword}
                   onChangeText={setLoginPassword}
                   secureTextEntry={true}
                   style={{backgroundColor:'#fff',borderRadius:5}}/>
        <TouchableOpacity style={[GStyles.jc,GStyles.ac,{height:44}]}>
            <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[GStyles.jc,GStyles.ac,{height:44}]}>
            <Text>Register</Text>
        </TouchableOpacity>

        {/*<NavHeader showClose={true} />*/}



        {/*<TouchableOpacity onPress={()=>{*/}
        {/*    loginAct()*/}
        {/*}}>*/}
        {/*    <Text>1111121111</Text>*/}
        {/*</TouchableOpacity>*/}

        {/*<CountdownButton*/}
        {/*    ref={countdownRef}*/}
        {/*    onPress={handleSendCode}*/}
        {/*    normalText="获取验证码"*/}
        {/*    countingText="剩余{time}秒"*/}
        {/*/>*/}
    </View>)
}

export default IndexView;
