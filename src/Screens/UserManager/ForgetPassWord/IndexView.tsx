import {View, Text, TouchableOpacity, TextInput, Alert, Image} from "react-native";
import GStyles, {appSize} from "../../../Components/GStyles";
import CountdownButton, {CountdownButtonHandle} from "../../../Components/CountdownButton";
import React, {useRef, useState} from "react";
import NavHeader from "../../../Components/NavHeader";
import {R_POST} from "../../../Services/NetRequestService";

function IndexView(props: any) {

    const [showPwd,SetShowPwd] = useState(false)
    const [type,setType] = useState(1)
    const [code,setCode] = useState('')
    const [email,setEmail] = useState('')
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

    const sendVerificationCode = async () => {
        const url = '/open-api/mobile/member/sendResetPasswordCode';
        const res = await R_POST(url, {email: email})

        if (res?.code == 200) {
            return true
        }
        return false;
    };

    const updatePasswork = async () => {
        const url = '/open-api/mobile/member/resetPasswordByEmail';
        const res = await R_POST(url, {
            "email": "user@example.com",
                "code": "123456",
                "newPassword": "NewPass123",
                "confirmPassword": "NewPass123"
        })

        if (res?.code == 200) {
            return true
        }
        return false;
    };



    const SendCodeDom = () => {

        return(<View style={[GStyles.ph12,{paddingHorizontal:appSize(24),marginTop:10}]}>

            <Text style={[GStyles.ffb,{color:'#000',marginTop:appSize(10),fontSize:appSize(20)}]}>忘记密码</Text>
            <Text style={[{color:'#8a8a8a',marginTop:appSize(10),fontSize:appSize(16)}]}>请输入您注册的邮箱进行验证</Text>

            <View style={[GStyles.row,GStyles.ac,GStyles.ph12,{height:appSize(50),marginTop:appSize(20),width:'100%',borderColor:'#000',borderWidth:1}]}>
                <Image source={require('../../../Assets/user/mail.png')} style={{height:appSize(24),width:appSize(24)}} />
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder={'请输入邮箱'}
                    style={{height: appSize(44),marginLeft:appSize(12),width:appSize(230)}}/>
            </View>


            <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,GStyles.ph12,{height:appSize(50),marginTop:appSize(10),width:'100%',borderColor:'#000',borderWidth:1}]}>

                <View style={[GStyles.row,GStyles.ac]}>
                    <Image source={require('../../../Assets/user/regIcon4.png')} style={{height:appSize(24),width:appSize(24)}} />
                    <TextInput
                        value={code}
                        onChangeText={setCode}
                        placeholder={'验证码'}
                        style={{height: appSize(44),marginLeft:appSize(12),width:appSize(120)}}/>
                </View>

                <CountdownButton
                    ref={countdownRef}
                    onPress={handleSendCode}
                    normalText="获取验证码"
                    countingText="{time}"
                />
            </View>


            <View style={[GStyles.row,GStyles.ac,GStyles.ph12,{height:appSize(50),marginTop:appSize(10),width:'100%',borderColor:'#000',borderWidth:1}]}>
                <Image source={require('../../../Assets/user/regIcon2.png')} style={{height:appSize(24),width:appSize(24)}} />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder={'请输入密码'}
                    secureTextEntry={!showPwd}
                    style={{height: appSize(44),marginLeft:appSize(12),flex:1}}/>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'flex-end',width:appSize(44),height:appSize(44)}} onPress={()=>{
                    SetShowPwd(!showPwd)
                }}>
                    <Image source={showPwd?require('../../../Assets/pwdIcon_on.png'):require('../../../Assets/pwdIcon_off.png')} style={{height:appSize(16),width:appSize(16)}} />
                </TouchableOpacity>
            </View>

            <View style={[GStyles.row,GStyles.ac,GStyles.ph12,{height:appSize(50),marginTop:appSize(10),width:'100%',borderColor:'#000',borderWidth:1}]}>
                <Image source={require('../../../Assets/user/regIcon2.png')} style={{height:appSize(24),width:appSize(24)}} />
                <TextInput
                    value={repassword}
                    onChangeText={setRePassword}
                    placeholder={'请确认密码'}
                    secureTextEntry={!showPwd}
                    style={{height: appSize(44),marginLeft:appSize(12),flex:1}}/>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'flex-end',width:appSize(44),height:appSize(44)}} onPress={()=>{
                    SetShowPwd(!showPwd)
                }}>
                    <Image source={showPwd?require('../../../Assets/pwdIcon_on.png'):require('../../../Assets/pwdIcon_off.png')} style={{height:appSize(16),width:appSize(16)}} />
                </TouchableOpacity>
            </View>

            <Text style={{color:'#6E6E6E',marginTop:appSize(20)}}>密码必须是8-20字符，必须包括英文大写字母，英文小写字母、数字、特殊字符其中2类</Text>



            <TouchableOpacity onPress={()=>{

                setType(2)

            }} style={[GStyles.jc,GStyles.ac,{marginTop:appSize(30),height:appSize(55),backgroundColor:'#A5885F'}]}>
                <Text style={{color:'#fff',fontWeight:'600',letterSpacing:appSize(5),fontSize:appSize(20)}}>下一步</Text>
            </TouchableOpacity>



            {/*<Text>忘记密码</Text>*/}
            {/*<Text>请输入邮箱验证</Text>*/}
            {/*<View style={[GStyles.row, GStyles.ph12, {width: '100%', backgroundColor: '#fff', marginTop: 10, borderRadius: 5,},]}>*/}
            {/*    <TextInput value={email} onChangeText={setEmail}  placeholder={'Email'} style={{height: 44,}}/>*/}
            {/*</View>*/}
            {/*<View style={[GStyles.row,GStyles.ac,{marginTop: 10}]}>*/}
            {/*    <View style={{backgroundColor:'#ffffff',flex:1,height:40,paddingHorizontal:10,borderRadius:5,marginRight:10}}>*/}
            {/*        <TextInput style={{flex:1}} value={code} onChangeText={setCode} placeholder={'Code'} />*/}
            {/*    </View>*/}
            {/*    <CountdownButton*/}
            {/*        ref={countdownRef}*/}
            {/*        onPress={handleSendCode}*/}
            {/*        normalText="获取验证码"*/}
            {/*        countingText="剩余{time}秒"*/}
            {/*    />*/}
            {/*</View>*/}
            {/*<TouchableOpacity style={[GStyles.jc,GStyles.ac,{marginTop:10,borderRadius:5,height:44,backgroundColor:'#123'}]}>*/}
            {/*    <Text style={{color:'#fff'}}>提交</Text>*/}
            {/*</TouchableOpacity>*/}

        </View>)

    }

    const [password,setPassword] = useState('')
    const [repassword,setRePassword] = useState('')

    const ResetPasswordDom = () => {



        return (<View style={[GStyles.ph12,{paddingHorizontal:appSize(24),marginTop:10}]}>

            <Text style={[GStyles.ffb,{color:'#000',marginTop:appSize(34),fontSize:appSize(20)}]}>忘记密码</Text>
            <Text style={[{color:'#8a8a8a',marginTop:appSize(10),fontSize:appSize(16)}]}>请重置您的密码</Text>


            <View style={[GStyles.row,GStyles.ac,GStyles.ph12,{height:appSize(50),marginTop:appSize(20),width:'100%',borderColor:'#000',borderWidth:1}]}>
                <Image source={require('../../../Assets/user/regIcon2.png')} style={{height:appSize(24),width:appSize(24)}} />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder={'请输入密码'}
                    secureTextEntry={!showPwd}
                    style={{height: appSize(44),marginLeft:appSize(12),flex:1}}/>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'flex-end',width:appSize(44),height:appSize(44)}} onPress={()=>{
                    SetShowPwd(!showPwd)
                }}>
                    <Image source={showPwd?require('../../../Assets/pwdIcon_on.png'):require('../../../Assets/pwdIcon_off.png')} style={{height:appSize(16),width:appSize(16)}} />
                </TouchableOpacity>
            </View>

            <View style={[GStyles.row,GStyles.ac,GStyles.ph12,{height:appSize(50),marginTop:appSize(10),width:'100%',borderColor:'#000',borderWidth:1}]}>
                <Image source={require('../../../Assets/user/regIcon2.png')} style={{height:appSize(24),width:appSize(24)}} />
                <TextInput
                    value={repassword}
                    onChangeText={setRePassword}
                    placeholder={'请确认密码'}
                    secureTextEntry={!showPwd}
                    style={{height: appSize(44),marginLeft:appSize(12),flex:1}}/>
                <TouchableOpacity style={{justifyContent:'center',alignItems:'flex-end',width:appSize(44),height:appSize(44)}} onPress={()=>{
                    SetShowPwd(!showPwd)
                }}>
                    <Image source={showPwd?require('../../../Assets/pwdIcon_on.png'):require('../../../Assets/pwdIcon_off.png')} style={{height:appSize(16),width:appSize(16)}} />
                </TouchableOpacity>
            </View>

            <Text style={{color:'#6E6E6E',marginTop:appSize(20)}}>密码必须是8-20字符，必须包括英文大写字母，英文小写字母、数字、特殊字符其中2类</Text>

            <TouchableOpacity style={[GStyles.jc,GStyles.ac,{marginTop:appSize(60),height:appSize(55),backgroundColor:'#A5885F'}]}>
                <Text style={{color:'#fff',fontWeight:'600',letterSpacing:appSize(5),fontSize:appSize(20)}}>完成</Text>
            </TouchableOpacity>


        </View>)


        return(<View style={[GStyles.ph20,{marginTop:10}]}>
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

            <View style={[GStyles.row,{paddingHorizontal:appSize(24),marginTop:appSize(26),gap:appSize(10)}]}>
                {/*<View style={{height:appSize(4),borderRadius:appSize(2), flex:1,backgroundColor:'#1C1A17' }} />*/}
            </View>

            {type==1? <SendCodeDom />:<ResetPasswordDom />}



        </View>
    );
}

export default IndexView;
