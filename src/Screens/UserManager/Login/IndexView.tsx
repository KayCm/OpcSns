import React, { useRef } from 'react';
import {View, Text, Alert, TouchableOpacity, TextInput, Platform } from "react-native";
import NavHeader from "../../../Components/NavHeader";
import CountdownButton, {CountdownButtonHandle} from "../../../Components/CountdownButton";
import {useNavigation} from "@react-navigation/native";
import {LoginViewModel} from "./LoginViewModel";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import IconNavClose from "../../../Assets/Svgs/IconNavClose";
import GStyles from "../../../Components/GStyles";
import RegisterView from "./Component/RegisterView";
// import CountdownButton, { CountdownButtonHandle } from '';

function IndexView() {

    const {loginAct,
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword
    } = LoginViewModel()

    const nav = useNavigation()


    const RegDom = () => {


        return(<View>

            <RegisterView />

        </View>)

    }


    return (
      <View
        style={[
          GStyles.ph12,
          {
            flex: 1,
            paddingTop: Platform.OS == 'ios' ? 20 : useSafeAreaInsets().top,
          },
        ]}
      >
        <View style={[GStyles.row, GStyles.flexEnd, { width: '100%' }]}>
          <TouchableOpacity
            onPress={() => {
              nav.goBack();
            }}
          >
            <IconNavClose />
          </TouchableOpacity>
        </View>


          <RegDom />

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
      </View>
    );
}

export default IndexView;
