import React, { useRef } from 'react';
import {View, Text, Alert, TouchableOpacity, TextInput, Platform } from "react-native";
import NavHeader from "../../../Components/NavHeader";
import CountdownButton, {CountdownButtonHandle} from "../../../Components/CountdownButton";
import {useNavigation} from "@react-navigation/native";
import {LoginViewModel} from "./LoginViewModel";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import IconNavClose from "../../../Assets/Svgs/IconNavClose";
import GStyles, {TRUE_ONE_LINE} from "../../../Components/GStyles";
import RegisterView from "./Component/RegisterView";
import {useSelector} from "react-redux";
// import CountdownButton, { CountdownButtonHandle } from '';

function IndexView(props) {

    const {loginAct,
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
        getUserInfo
    } = LoginViewModel()

    // const nav = useNavigation()

    const nav = props?.navigation

    const userInfo = useSelector(state => state?.userInfo);


    return (<View style={{ flex: 1}}>
            <NavHeader showLeft={false} title={'登录'} />

            <View style={[GStyles.ph12,{}]}>
                <Text style={{ fontSize: 50, fontWeight: '800' }}>Login</Text>
                <View
                    style={[
                        GStyles.row,
                        GStyles.ph12,
                        {
                            width: '100%',
                            backgroundColor: '#fff',
                            marginTop: 10,
                            borderRadius: 5,
                            borderWidth:TRUE_ONE_LINE,
                            borderColor:'#2c2c2c'
                        },
                    ]}
                >
                    <TextInput
                        value={loginEmail}
                        onChangeText={setLoginEmail}
                        placeholder={'Email'}
                        style={{
                            height: 44,width:'100%'
                        }}
                    />
                </View>
                <View
                    style={[
                        GStyles.row,
                        GStyles.ph12,
                        {
                            width: '100%',
                            backgroundColor: '#fff',
                            marginTop: 10,
                            borderRadius: 5,
                            borderWidth:TRUE_ONE_LINE,
                            borderColor:'#2c2c2c'
                        },
                    ]}
                >
                    <TextInput
                        value={loginPassword}
                        onChangeText={setLoginPassword}
                        secureTextEntry={true}
                        placeholder={'Password'}
                        style={{
                            height: 44,width:'100%'
                        }}
                    />
                </View>

                <TouchableOpacity
                    onPress={()=>{
                        loginAct().then(res=>{

                            if (res.res){
                                nav.replace('AppBottomTab')
                            }else{
                                Alert.alert(res?.msg)
                            }

                        })
                    }}
                    style={[GStyles.jc, GStyles.ac, { height: 44,marginTop:20,borderRadius: 5, backgroundColor:'#2c2c2c'}]}
                >
                    <Text style={{color:'#fff'}}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {

                        // console.log('userInfo',global.token)

                        // getUserInfo()

                        nav.navigate('Register',{},'replace')
                    }}
                    style={[GStyles.jc, GStyles.ac, { height: 44 }]}
                >
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>


      </View>
    );
}

export default IndexView;
