import NavHeader from "../../../Components/NavHeader";
import {Alert, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import GStyles, {appSize} from "../../../Components/GStyles";
import React, {useState} from "react";
import {R_POST} from "../../../Services/NetRequestService";

function EditPwdView() {

    const [oldPwd,setOldPwd] = useState('')
    const [newPwd,setNewPwd] = useState('')
    const [new2Pwd,setNew2Pwd] = useState('')


    const updatePwd = () => {

        let params = {
            "oldPassword": oldPwd,
            "newPassword": newPwd,
            "confirmPassword": new2Pwd
        }

        R_POST('/open-api/mobile/member/password',params).then(res=>{
            if (res?.code == 200){
                Alert.alert('修改成功')
            }
        }).catch(err=>{

        })

    }


    return(<View style={{ flex: 1,backgroundColor:''}}>
        <NavHeader title={'修改密码'} />

        <View style={[GStyles.ph16]}>
            <View style={[GStyles.row,GStyles.ac,GStyles.ph12,{height:appSize(50),marginTop:appSize(20),width:'100%',borderColor:'#000',borderWidth:1}]}>
                <Image source={require('../../../Assets/user/pwd.png')} style={{height:appSize(24),width:appSize(24)}} />
                <TextInput
                    value={oldPwd}
                    onChangeText={setOldPwd}
                    secureTextEntry={true}
                    placeholder={'请输入密码'}
                    style={{height: appSize(44),marginLeft:appSize(12),width:appSize(230)}}/>
            </View>

            <View style={[GStyles.row,GStyles.ac,GStyles.ph12,{height:appSize(50),marginTop:appSize(20),width:'100%',borderColor:'#000',borderWidth:1}]}>
                <Image source={require('../../../Assets/user/pwd.png')} style={{height:appSize(24),width:appSize(24)}} />
                <TextInput
                    value={newPwd}
                    onChangeText={setNewPwd}
                    secureTextEntry={true}
                    placeholder={'请输入新密码'}
                    style={{height: appSize(44),marginLeft:appSize(12),width:appSize(230)}}/>
            </View>

            <View style={[GStyles.row,GStyles.ac,GStyles.ph12,{height:appSize(50),marginTop:appSize(20),width:'100%',borderColor:'#000',borderWidth:1}]}>
                <Image source={require('../../../Assets/user/pwd.png')} style={{height:appSize(24),width:appSize(24)}} />
                <TextInput
                    value={new2Pwd}
                    onChangeText={setNew2Pwd}
                    secureTextEntry={true}
                    placeholder={'请再次输入新密码'}
                    style={{height: appSize(44),marginLeft:appSize(12),width:appSize(230)}}/>
            </View>

            <TouchableOpacity onPress={()=>{
                updatePwd()
            }} style={[GStyles.jc,GStyles.ac,{marginTop:appSize(15),height:appSize(55),backgroundColor:'#A5885F'}]}>
                <Text style={{color:'#fff',fontWeight:'600',letterSpacing:appSize(5),fontSize:appSize(20)}}>完成</Text>
            </TouchableOpacity>
        </View>
    </View>)
}

export default EditPwdView
