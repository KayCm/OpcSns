import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Alert, TouchableOpacity, TextInput, Platform, Image, Pressable} from "react-native";
import NavHeader from "../../../Components/NavHeader";
import CountdownButton, {CountdownButtonHandle} from "../../../Components/CountdownButton";
import {useNavigation} from "@react-navigation/native";
import {LoginViewModel} from "./LoginViewModel";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import IconNavClose from "../../../Assets/Svgs/IconNavClose";
import GStyles, {appSize, TRUE_ONE_LINE} from "../../../Components/GStyles";
import RegisterView from "./Component/RegisterView";
import {useSelector} from "react-redux";
import IconNexa from "../../../Assets/Svgs/IconNexa";
// import CountdownButton, { CountdownButtonHandle } from '';
import Modal from 'react-native-modal';
import {getLastLoginInfo, saveLastLoginInfo} from "../../../Components/Tools";

function IndexView(props) {

    const {loginAct,
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
        getUserInfo,agree,setAgree
    } = LoginViewModel()

    // const nav = useNavigation()

    useEffect(() => {

        getLastLoginInfo().then(res=>{
            setLoginEmail(res)
        })

    },[])

    const [showPwd,SetShowPwd] = useState(false)


    const nav = props?.navigation

    const userInfo = useSelector(state => state?.userInfo);

    const insets =  useSafeAreaInsets()

    const [loading,setLoading] = useState(false)
    const [visible,setVisible] = useState(false)


    const LoginAlert = () => {

        return(<Modal style={{margin:0,padding:0}} isVisible={visible}>
            <View style={{ flex: 1, padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                <View style={[GStyles.jc,GStyles.ac,{paddingHorizontal:appSize(40),width:appSize(326),height:appSize(200),backgroundColor:'#fff'}]}>


                    <View style={[GStyles.row,GStyles.ac,{marginTop:appSize(10),height:appSize(44)}]}>
                        <Text style={{color:'#8a8a8a',fontSize:appSize(14)}}>请先仔细阅读<Text style={{color:'#A5885F'}} onPress={()=>{
                            setVisible(false)
                            nav.navigate('Agreement', { type: 2 });
                        }}>《用户使用协议》</Text>和<Text style={{color:'#A5885F'}} onPress={()=>{
                            setVisible(false)
                            nav.navigate('Agreement', { type: 1 });
                        }}>《隐私协议》</Text>,确认是否同意</Text>
                    </View>

                    <TouchableOpacity onPress={()=>{

                        setVisible(false)

                        if (loading){

                        }else{
                            setLoading(true)
                            loginAct().then(res=>{
                                setLoading(false)
                                if (res.res){
                                    getUserInfo()
                                    nav.replace('AppBottomTab')
                                }else{
                                    Alert.alert(res?.msg)
                                }

                            }).catch(err=>{
                                setLoading(false)
                            }).finally(()=>{
                                setLoading(false)
                            })
                        }

                    }} style={[GStyles.jc,GStyles.ac,{marginTop:appSize(40),width:appSize(185),height:appSize(40),backgroundColor:'#A5885F'}]}>
                        <Text style={{color:'#fff',fontSize:appSize(15)}}>同意并登录</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>)
    }


    return (<View style={{ flex: 1,paddingTop:insets.top}}>

            <View style={[GStyles.ph12,{}]}>

                <View style={[GStyles.jc,GStyles.ac,{marginTop:appSize(106)-insets.top,width:'100%'}]}>

                    <IconNexa />
                </View>

                <View style={{paddingHorizontal:appSize(34),backgroundColor:''}}>
                    <Text style={[GStyles.ffb,{color:'#000',marginTop:appSize(34),fontSize:appSize(20)}]}>登录</Text>

                    <View style={[GStyles.row,GStyles.ac,GStyles.ph12,{height:appSize(50),marginTop:appSize(20),width:'100%',borderColor:'#000',borderWidth:1}]}>
                        <Image source={require('../../../Assets/user/mail.png')} style={{height:appSize(24),width:appSize(24)}} />
                        <TextInput
                            value={loginEmail}
                            onChangeText={setLoginEmail}
                            placeholder={'请输入邮箱'}
                            style={{height: appSize(44),marginLeft:appSize(12),width:appSize(230)}}/>
                    </View>


                    <View style={[GStyles.row,GStyles.ac,GStyles.ph12,{height:appSize(50),marginTop:appSize(20),width:'100%',borderColor:'#000',borderWidth:1}]}>
                        <Image source={require('../../../Assets/user/pwd.png')} style={{height:appSize(24),width:appSize(24)}} />
                        <TextInput
                            value={loginPassword}
                            onChangeText={setLoginPassword}
                            secureTextEntry={!showPwd}
                            placeholder={'请输入密码'}
                            style={{height: appSize(44),marginLeft:appSize(12),flex:1}}/>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'flex-end',width:appSize(44),height:appSize(44)}} onPress={()=>{
                            SetShowPwd(!showPwd)
                        }}>
                            <Image source={showPwd?require('../../../Assets/pwdIcon_on.png'):require('../../../Assets/pwdIcon_off.png')} style={{height:appSize(16),width:appSize(16)}} />
                        </TouchableOpacity>
                    </View>


                    <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,{marginTop:appSize(15),width:'100%'}]}>
                        <TouchableOpacity onPress={()=>{
                            nav.navigate('ForgetPassword')
                        }}><Text>忘记密码</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>{
                            nav.navigate('Register')
                        }}><Text>快速注册</Text></TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={()=>{


                        if (!agree){
                            setVisible(true)
                            return
                        }

                        if (loading){

                        }else{
                            setLoading(true)
                            loginAct().then(res=>{
                                setLoading(false)
                                if (res.res){
                                    getUserInfo()
                                    saveLastLoginInfo(loginEmail,true)
                                    nav.replace('AppBottomTab')
                                }else{
                                    Alert.alert(res?.msg)
                                }

                            }).catch(err=>{
                                setLoading(false)
                            }).finally(()=>{
                                setLoading(false)
                            })
                        }


                    }} style={[GStyles.jc,GStyles.ac,{marginTop:appSize(15),height:appSize(55),backgroundColor:loading?'#8a8a8a':'#A5885F'}]}>
                        <Text style={{color:'#fff',fontWeight:'600',letterSpacing:appSize(5),fontSize:appSize(20)}}>登录</Text>
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

                    {/*<View style={[GStyles.row,GStyles.ac,GStyles.jc,{gap:appSize(20),marginTop:appSize(60)}]}>*/}
                    {/*    <View style={{height:TRUE_ONE_LINE,flex:1,backgroundColor:'#6e6e6e'}} />*/}
                    {/*    <Text style={[GStyles.ffb,{color:'#6e6e6e',fontSize:appSize(16)}]}>第三方登录方式</Text>*/}
                    {/*    <View style={{height:TRUE_ONE_LINE,flex:1,backgroundColor:'#6e6e6e'}} />*/}
                    {/*</View>*/}

                    {/*<View style={[GStyles.row,GStyles.ac,GStyles.jc,GStyles.ph12,{gap:appSize(10),height:appSize(45),marginTop:appSize(30),width:'100%',borderColor:'#000',borderWidth:1}]}>*/}
                    {/*    <Image source={require('../../../Assets/user/apple.png')} style={{height:appSize(20),width:appSize(20)}} />*/}
                    {/*    <Text style={{color:'#000',fontSize:appSize(16),fontWeight:'600'}}>使用Apple账号登录</Text>*/}
                    {/*</View>*/}

                    {/*<View style={[GStyles.row,GStyles.ac,GStyles.jc,GStyles.ph12,{gap:appSize(10),height:appSize(45),marginTop:appSize(15),width:'100%',borderColor:'#000',borderWidth:1}]}>*/}
                    {/*    <Image source={require('../../../Assets/user/google.png')} style={{height:appSize(20),width:appSize(20)}} />*/}
                    {/*    <Text style={{color:'#000',fontSize:appSize(16),fontWeight:'600'}}>使用Google账号登录</Text>*/}
                    {/*</View>*/}

                </View>





                {/*<View*/}
                {/*    style={[*/}
                {/*        GStyles.row,*/}
                {/*        GStyles.ph12,*/}
                {/*        {*/}
                {/*            width: '100%',*/}
                {/*            backgroundColor: '#fff',*/}
                {/*            marginTop: 10,*/}
                {/*            borderRadius: 5,*/}
                {/*            borderWidth:TRUE_ONE_LINE,*/}
                {/*            borderColor:'#2c2c2c'*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*>*/}
                {/*    <TextInput*/}
                {/*        value={loginEmail}*/}
                {/*        onChangeText={setLoginEmail}*/}
                {/*        placeholder={'Email'}*/}
                {/*        style={{*/}
                {/*            height: 44,width:'100%'*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</View>*/}
                {/*<View*/}
                {/*    style={[*/}
                {/*        GStyles.row,*/}
                {/*        GStyles.ph12,*/}
                {/*        {*/}
                {/*            width: '100%',*/}
                {/*            backgroundColor: '#fff',*/}
                {/*            marginTop: 10,*/}
                {/*            borderRadius: 5,*/}
                {/*            borderWidth:TRUE_ONE_LINE,*/}
                {/*            borderColor:'#2c2c2c'*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*>*/}
                {/*    <TextInput*/}
                {/*        value={loginPassword}*/}
                {/*        onChangeText={setLoginPassword}*/}
                {/*        secureTextEntry={true}*/}
                {/*        placeholder={'Password'}*/}
                {/*        style={{*/}
                {/*            height: 44,width:'100%'*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</View>*/}

                {/*<TouchableOpacity*/}
                {/*    onPress={()=>{*/}
                {/*        loginAct().then(res=>{*/}

                {/*            if (res.res){*/}
                {/*                nav.replace('AppBottomTab')*/}
                {/*            }else{*/}
                {/*                Alert.alert(res?.msg)*/}
                {/*            }*/}

                {/*        })*/}
                {/*    }}*/}
                {/*    style={[GStyles.jc, GStyles.ac, { height: 44,marginTop:20,borderRadius: 5, backgroundColor:'#2c2c2c'}]}*/}
                {/*>*/}
                {/*    <Text style={{color:'#fff'}}>Login</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity*/}
                {/*    onPress={() => {*/}

                {/*        // console.log('userInfo',global.token)*/}

                {/*        // getUserInfo()*/}

                {/*        nav.navigate('Register',{},'replace')*/}
                {/*    }}*/}
                {/*    style={[GStyles.jc, GStyles.ac, { height: 44 }]}*/}
                {/*>*/}
                {/*    <Text>Register</Text>*/}
                {/*</TouchableOpacity>*/}


            </View>

            <LoginAlert />

      </View>
    );
}

export default IndexView;
