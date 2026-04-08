import {Alert, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import NavHeader from "../../../Components/NavHeader";
import GStyles, {appSize} from "../../../Components/GStyles";
import React, {useState} from "react";
import {R_POST} from "../../../Services/NetRequestService";
import {updateUserInfo} from "../../../Redux/persistedReducer";
import {useDispatch, useSelector} from "react-redux";

function EditNameView() {

    const dispatch = useDispatch()

    const userInfo = useSelector(state => state?.userInfo);


    const [newName,SetNewName] = useState('')


    const editName = () => {

        let params = {
            username:newName
        }
        R_POST('/open-api/mobile/member/username',params).then(async res => {
            console.log(res)

            const res1 = await R_POST('/open-api/mobile/member/getMemberInfo', {})

            if (res1?.code == 200 && res1?.data) {
                dispatch(updateUserInfo(res1?.data))
            }

            Alert.alert('修改成功！')

        }).catch(err=>{

        })

    }


    return(<View style={{ flex: 1,backgroundColor:''}}>
        <NavHeader title={'修改昵称'} />

        <View style={[GStyles.ph16]}>
            <View style={[GStyles.row,GStyles.ac,GStyles.ph12,{height:appSize(50),marginTop:appSize(20),width:'100%',borderColor:'#000',borderWidth:1}]}>
                <Image source={require('../../../Assets/user/regIcon1.png')} style={{height:appSize(24),width:appSize(24)}} />
                <TextInput
                    value={newName}
                    onChangeText={SetNewName}
                    placeholder={userInfo?.username}
                    style={{height: appSize(44),marginLeft:appSize(12),width:appSize(230)}}/>
            </View>

            <TouchableOpacity onPress={()=>{
                editName()
            }} style={[GStyles.jc,GStyles.ac,{marginTop:appSize(15),height:appSize(55),backgroundColor:'#A5885F'}]}>
                <Text style={{color:'#fff',fontWeight:'600',letterSpacing:appSize(5),fontSize:appSize(20)}}>完成</Text>
            </TouchableOpacity>
        </View>
    </View>)
}

export default EditNameView
