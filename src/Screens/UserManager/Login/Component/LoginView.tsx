import {Text, TextInput, TouchableOpacity, View} from "react-native";
import GStyles from "../../../../Components/GStyles";
import React, {useState} from "react";

function LoginView() {

    const [loginEmail,setLoginEmail] = useState()
    const [loginPassword,setLoginPassword] = useState()

    return(<View>

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
        <View
            style={[
                GStyles.row,
                GStyles.ph12,
                {
                    width: '100%',
                    backgroundColor: '#fff',
                    marginTop: 10,
                    borderRadius: 5,
                },
            ]}
        >
            <TextInput
                value={loginPassword}
                onChangeText={setLoginPassword}
                secureTextEntry={true}
                placeholder={'Password'}
                style={{
                    height: 44,
                }}
            />
        </View>

        <TouchableOpacity
            onPress={() => {
            }}
            style={[GStyles.jc, GStyles.ac, { height: 44 }]}
        >
            <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => {

            }}
            style={[GStyles.jc, GStyles.ac, { height: 44 }]}
        >
            <Text>Register</Text>
        </TouchableOpacity>

    </View>)

}

export default LoginView
