import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
    Image,
    ScrollView,
    Platform,
    KeyboardAvoidingView
} from "react-native";
import NavHeader from "../../../Components/NavHeader";
import React, {useRef, useState} from "react";
import CountdownButton, {CountdownButtonHandle} from "../../../Components/CountdownButton";
import GStyles, {appSize} from "../../../Components/GStyles";
import {RegisterViewModel} from "./RegisterViewModel";
import IconNexa from "../../../Assets/Svgs/IconNexa";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import Modal from "react-native-modal";
import {COLORS} from "../../../Components/Constant";

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
        submitRegister,
        agree,
        visible,
        setAgree} = RegisterViewModel()

    const [showPwd,SetShowPwd] = useState(false)

    const [showAgree,SetShowAgree] = useState(false)


    const insets =  useSafeAreaInsets()

    const nav = useNavigation()

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



    const LoginAlert = () => {
        return(<Modal style={{margin:0,padding:0}} isVisible={visible}>
            <View style={{ flex: 1, padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                <View style={[GStyles.jc,GStyles.ac,{paddingHorizontal:appSize(40),width:appSize(326),height:appSize(200),backgroundColor:'#fff'}]}>
                    <View style={[GStyles.row,GStyles.ac,{marginTop:appSize(10),height:appSize(44)}]}>
                        <Text style={[GStyles.ffh11,{color:COLORS.FONTBLACK,fontSize:appSize(24)}]}>注册成功</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        nav.goBack()
                    }} style={[GStyles.jc,GStyles.ac,{marginTop:appSize(40),width:appSize(185),height:appSize(40),backgroundColor:'#A5885F'}]}>
                        <Text style={{color:'#fff',fontSize:appSize(15)}}>返回并登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>)
    }

    const AgreeAlert = () => {
        return(<Modal style={{margin:0,padding:0}} isVisible={showAgree}>
            <View style={{ flex: 1, padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                <View style={[GStyles.jc,GStyles.ac,{paddingHorizontal:appSize(40),width:appSize(326),height:appSize(200),backgroundColor:'#fff'}]}>
                    <View style={[GStyles.row,GStyles.ac,{marginTop:appSize(10),height:appSize(44)}]}>
                        <Text style={{color:'#8a8a8a',fontSize:appSize(14)}}>请先仔细阅读<Text style={{color:'#A5885F'}} onPress={()=>{
                            SetShowAgree(false)
                            nav.navigate('Agreement', { type: 2 });
                        }}>《用户使用协议》</Text>和<Text style={{color:'#A5885F'}} onPress={()=>{
                            SetShowAgree(false)
                            nav.navigate('Agreement', { type: 1 });
                        }}>《隐私协议》</Text>,确认是否同意</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        SetShowAgree(false)
                        submitRegister()
                    }} style={[GStyles.jc,GStyles.ac,{marginTop:appSize(40),width:appSize(185),height:appSize(40),backgroundColor:'#A5885F'}]}>
                        <Text style={{color:'#fff',fontSize:appSize(15)}}>同意并注册</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>)
    }




    return (<View style={{ flex: 1,paddingTop:insets.top}}>
        <View style={[GStyles.ph12,{}]}>
            <View style={[GStyles.jc,{height:appSize(44),width:'100%',backgroundColor:""}]} >
                <TouchableOpacity onPress={()=>{
                    nav.goBack()
                }}>
                    <Image source={require('../../../Assets/Header/goback.png')} style={{width:appSize(24),height:appSize(24)}} />
                </TouchableOpacity>
            </View>
            <View style={[GStyles.jc,GStyles.ac,{marginTop:appSize(106-44)-insets.top,width:'100%'}]}>
                <IconNexa />
            </View>
            <ScrollView  keyboardDismissMode='on-drag' keyboardShouldPersistTaps='handled'  showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={{paddingHorizontal:appSize(34),backgroundColor:''}}>
                    <Text style={[GStyles.ffb,{color:'#000',marginTop:appSize(34),fontSize:appSize(20)}]}>注册</Text>

                    <View style={[GStyles.row,GStyles.ac,GStyles.ph12,{height:appSize(50),marginTop:appSize(20),width:'100%',borderColor:'#000',borderWidth:1}]}>
                        <Image source={require('../../../Assets/user/regIcon1.png')} style={{height:appSize(24),width:appSize(24)}} />
                        <TextInput
                            value={nickName}
                            onChangeText={setNickName}
                            placeholder={'请输入用户名'}
                            style={{height: appSize(44),marginLeft:appSize(12),width:appSize(230)}}/>
                    </View>

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

                    <View style={[GStyles.row,GStyles.ac,GStyles.ph12,{height:appSize(50),marginTop:appSize(20),width:'100%',borderColor:'#000',borderWidth:1}]}>
                        <Image source={require('../../../Assets/user/regIcon3.png')} style={{height:appSize(24),width:appSize(24)}} />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder={'请输入邮箱'}
                            style={{height: appSize(44),marginLeft:appSize(12),width:appSize(230)}}/>
                    </View>

                    <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,GStyles.ph12,{height:appSize(50),marginTop:appSize(20),width:'100%',borderColor:'#000',borderWidth:1}]}>

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

                    <View style={[GStyles.row,GStyles.ac,GStyles.ph12,{height:appSize(50),marginTop:appSize(20),width:'100%',borderColor:'#000',borderWidth:1}]}>
                        <Image source={require('../../../Assets/user/regIcon4.png')} style={{height:appSize(24),width:appSize(24)}} />
                        <TextInput
                            value={invCode}
                            onChangeText={setInvCode}
                            placeholder={'激活码'}
                            style={{height: appSize(44),marginLeft:appSize(12),width:appSize(230)}}/>
                    </View>

                    <Text style={{color:'#6E6E6E',marginTop:appSize(20)}}>密码必须是8-20字符，必须包括英文大写字母，英文小写字母、数字、特殊字符其中2类</Text>

                    <TouchableOpacity onPress={()=>{

                        if (!agree){

                            // Alert.alert('请同意用户协议和隐私政策')

                            SetShowAgree(true)

                            return
                        }

                        submitRegister()


                    }} style={[GStyles.jc,GStyles.ac,{marginTop:appSize(60),height:appSize(55),backgroundColor:'#A5885F'}]}>
                        <Text style={{color:'#fff',fontWeight:'600',letterSpacing:appSize(5),fontSize:appSize(20)}}>注册</Text>
                    </TouchableOpacity>

                    <View style={[GStyles.row,GStyles.ac,{marginTop:appSize(10),height:appSize(44)}]}>

                        <TouchableOpacity onPress={()=>setAgree(!agree)} style={{}}>
                            <Image source={agree?require('../../../Assets/user/checkBox_on.png'):require('../../../Assets/user/checkBox_off.png')} style={{height:appSize(18),width:appSize(18),borderRadius:appSize(9)}} />
                        </TouchableOpacity>
                        <Text style={{color:'#8a8a8a'}}>{' '}我已阅读并同意<Text style={{color:'#000'}} onPress={()=>{
                          nav.navigate('Agreement', { type: 2 });
                        }}>《用户协议》</Text>和<Text style={{color:'#000'}} onPress={()=>{
                          nav.navigate('Agreement', { type: 1 });
                        }}>《隐私协议》</Text></Text>

                    </View>


                </View>
            </ScrollView>
        </View>

        <LoginAlert />

        <AgreeAlert />

    </View>)



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
