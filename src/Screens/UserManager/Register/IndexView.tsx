import {View, Text, TouchableOpacity, Alert, TextInput} from "react-native";
import NavHeader from "../../../Components/NavHeader";
import React, {useRef} from "react";
import CountdownButton, {CountdownButtonHandle} from "../../../Components/CountdownButton";
import GStyles from "../../../Components/GStyles";
import {RegisterViewModel} from "./RegisterViewModel";

function IndexView(props: any) {


    const {nickName,
        setNickName,
        password,
        setPassword,
        email,
        setEmail,
        code,
        setCode,
        invCode,
        setInvCode,
        sendVerificationCode,
        submitRegister} = RegisterViewModel()

    const countdownRef = useRef<CountdownButtonHandle>(null);

    const handleSendCode = async () => {
        try {
            if (await sendVerificationCode()){
                countdownRef.current?.start();
            }else{
                Alert.alert('验证码发送错误')
            }
        } catch (error) {
            Alert.alert('发送失败', '请稍后重试');
        }
    };

    return (
        <View style={{ flex: 1}}>
            <NavHeader />
            <View style={[GStyles.ph12,{marginTop:20}]}>
                <Text style={{fontSize:36,fontWeight:'600'}}>注册</Text>
            </View>
            <View style={[GStyles.pv12,GStyles.ph12,{}]}>
                <View style={[GStyles.row, GStyles.ph12, {width: '100%', backgroundColor: '#fff', borderRadius: 5,},]}>
                    <TextInput value={nickName} onChangeText={setNickName}  placeholder={'NickName'} style={{height: 44,width:'100%'}}/>
                </View>

                <View style={[GStyles.row, GStyles.ph12, {width: '100%', backgroundColor: '#fff', marginTop: 10, borderRadius: 5,},]}>
                    <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} placeholder={'Password'} style={{height: 44,width:'100%'}}/>
                </View>


                <View style={[GStyles.row, GStyles.ph12, {width: '100%', backgroundColor: '#fff', marginTop: 10, borderRadius: 5,},]}>
                    <TextInput value={email} onChangeText={setEmail}  placeholder={'Email'} style={{height: 44,width:'100%'}}/>
                </View>

                <View style={[GStyles.row,GStyles.ac,{marginTop: 10}]}>
                    <View style={{backgroundColor:'#ffffff',flex:1,height:40,paddingHorizontal:10,borderRadius:5,marginRight:10}}>
                        <TextInput style={{flex:1}} value={code} onChangeText={setCode} placeholder={'Code'} />
                    </View>

                    <CountdownButton
                        ref={countdownRef}
                        onPress={handleSendCode}
                        normalText="获取验证码"
                        countingText="{time}"
                    />
                </View>
                <View style={[GStyles.row, GStyles.ph12, {width: '100%', backgroundColor: '#fff', marginTop: 10, borderRadius: 5,},]}>
                    <TextInput value={invCode} onChangeText={setInvCode}  placeholder={'InviteCode'} style={{height: 44,}}/>
                </View>

                <TouchableOpacity onPress={submitRegister} style={[GStyles.jc,GStyles.ac,{marginTop:20,borderRadius:5,height:44,backgroundColor:'#123'}]}>
                    <Text style={{color:'#fff'}}>提交</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default IndexView;
