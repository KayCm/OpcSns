import NavHeader from "../../../Components/NavHeader";
import {Alert, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import GStyles, {appSize} from "../../../Components/GStyles";
import React, {useState} from "react";
import {R_POST} from "../../../Services/NetRequestService";
import AlertModal from "../../../Components/AlertModal";
import {logout} from "../../../Redux/persistedReducer";
import {useDispatch} from "react-redux";
import CustomAlert from '../../../Components/CustomAlert.tsx';
import Modal from "react-native-modal";
import {COLORS} from "../../../Components/Constant";

function EditPwdView(props) {

    const [oldPwd,setOldPwd] = useState('')
    const [newPwd,setNewPwd] = useState('')
    const [new2Pwd,setNew2Pwd] = useState('')


    const dispatch = useDispatch()

    const updatePwd = () => {

        let params = {
            "oldPassword": oldPwd,
            "newPassword": newPwd,
            "confirmPassword": new2Pwd
        }

        R_POST('/open-api/mobile/member/password',params).then(res=>{

            if (res?.code == 200){
                setVisible(true)
            }else{
                Alert.alert(res?.msg)
            }
        }).catch(err=>{

        })

    }


  // const showSimpleAlert = () => {
  //   setAlertConfig({
  //     title: '提示',
  //     message: '这是一个简单的提示信息',
  //     buttons: [
  //       {
  //         text: '知道了',
  //         onPress: () => {
  //           console.log('用户点击了确定');
  //           setAlertVisible(false);
  //         },
  //       },
  //     ],
  //   });
  //   setAlertVisible(true);
  // };

    const [visible,setVisible] = useState(false)

    const PwdAlert = () => {
        return(<Modal style={{margin:0,padding:0}} isVisible={visible}>
            <View style={{ flex: 1, padding: 0, justifyContent: 'center', alignItems: 'center' }}>
                <View style={[GStyles.jc,GStyles.ac,{paddingHorizontal:appSize(40),width:appSize(326),height:appSize(200),backgroundColor:'#fff'}]}>
                    <View style={[GStyles.row,GStyles.ac,{marginTop:appSize(10),height:appSize(44)}]}>
                        <Text style={[GStyles.ffh11,{color:COLORS.FONTBLACK,fontSize:appSize(20)}]}>修改成功</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{

                        dispatch(logout(null))

                        props?.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });

                    }} style={[GStyles.jc,GStyles.ac,{marginTop:appSize(40),width:appSize(185),height:appSize(40),backgroundColor:'#A5885F'}]}>
                        <Text style={{color:'#fff',fontSize:appSize(15)}}>请重新登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>)
    }

    return (
      <View style={{ flex: 1, backgroundColor: '' }}>
        <NavHeader title={'修改密码'} />

        <View style={[GStyles.ph16]}>
          <View
            style={[
              GStyles.row,
              GStyles.ac,
              GStyles.ph12,
              {
                height: appSize(50),
                marginTop: appSize(20),
                width: '100%',
                borderColor: '#000',
                borderWidth: 1,
              },
            ]}
          >
            <Image
              source={require('../../../Assets/user/pwd.png')}
              style={{ height: appSize(24), width: appSize(24) }}
            />
            <TextInput
              value={oldPwd}
              onChangeText={setOldPwd}
              secureTextEntry={true}
              placeholder={'请输入密码'}
              style={{
                height: appSize(44),
                marginLeft: appSize(12),
                width: appSize(230),
              }}
            />
          </View>

          <View
            style={[
              GStyles.row,
              GStyles.ac,
              GStyles.ph12,
              {
                height: appSize(50),
                marginTop: appSize(20),
                width: '100%',
                borderColor: '#000',
                borderWidth: 1,
              },
            ]}
          >
            <Image
              source={require('../../../Assets/user/pwd.png')}
              style={{ height: appSize(24), width: appSize(24) }}
            />
            <TextInput
              value={newPwd}
              onChangeText={setNewPwd}
              secureTextEntry={true}
              placeholder={'请输入新密码'}
              style={{
                height: appSize(44),
                marginLeft: appSize(12),
                width: appSize(230),
              }}
            />
          </View>

          <View
            style={[
              GStyles.row,
              GStyles.ac,
              GStyles.ph12,
              {
                height: appSize(50),
                marginTop: appSize(20),
                width: '100%',
                borderColor: '#000',
                borderWidth: 1,
              },
            ]}
          >
            <Image
              source={require('../../../Assets/user/pwd.png')}
              style={{ height: appSize(24), width: appSize(24) }}
            />
            <TextInput
              value={new2Pwd}
              onChangeText={setNew2Pwd}
              secureTextEntry={true}
              placeholder={'请再次输入新密码'}
              style={{
                height: appSize(44),
                marginLeft: appSize(12),
                width: appSize(230),
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              updatePwd();

            }}
            style={[
              GStyles.jc,
              GStyles.ac,
              {
                marginTop: appSize(15),
                height: appSize(55),
                backgroundColor: '#A5885F',
              },
            ]}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: '600',
                letterSpacing: appSize(5),
                fontSize: appSize(20),
              }}
            >
              完成
            </Text>
          </TouchableOpacity>
        </View>

        <PwdAlert />

      </View>
    );
}

export default EditPwdView
