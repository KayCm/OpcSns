import {View, Text, TouchableOpacity, TextInput} from "react-native";
import NavHeader from "../../../Components/NavHeader";
import React, {useState} from "react";
import GStyles from "../../../Components/GStyles";

function IndexView(props: any) {

    const [password,setPassword] = useState('')
    const [repassword,setRePassword] = useState('')


    return (
        <View style={{ flex: 1}}>
            <NavHeader title={'修改密码'}/>
            <View style={[GStyles.ph12,{marginTop:10}]}>
                <View style={[GStyles.row, GStyles.ph12, {width: '100%', backgroundColor: '#fff', marginTop: 10, borderRadius: 5,},]}>
                    <TextInput value={password} onChangeText={setPassword}  placeholder={'输入当前密码'} style={{height: 44,}}/>
                </View>
                <View style={[GStyles.row, GStyles.ph12, {width: '100%', backgroundColor: '#fff', marginTop: 10, borderRadius: 5,},]}>
                    <TextInput value={password} onChangeText={setPassword}  placeholder={'输入新密码'} style={{height: 44,}}/>
                </View>
                <View style={[GStyles.row, GStyles.ph12, {width: '100%', backgroundColor: '#fff', marginTop: 10, borderRadius: 5,},]}>
                    <TextInput value={repassword} onChangeText={setRePassword}  placeholder={'再次输入新密码'} style={{height: 44,}}/>
                </View>
                <TouchableOpacity style={[GStyles.jc,GStyles.ac,{marginTop:10,borderRadius:5,height:44,backgroundColor:'#123'}]}>
                    <Text style={{color:'#fff'}}>提交</Text>
                </TouchableOpacity>
            </View>
            <View style={[GStyles.ph12,{marginTop:10}]}>
                <Text>
                    密码设置规则:{'\n'}
                    1.密码为 8-20 字符{'\n'}
                    2.必须包括英文大写字母、英文小写字母、数字、特殊字符其中3类
                </Text>
            </View>
        </View>
    );
}

export default IndexView;
