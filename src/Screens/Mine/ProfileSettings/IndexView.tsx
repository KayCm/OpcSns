 import {View, Text, TouchableOpacity, Alert, Image} from "react-native";
import NavHeader from "../../../Components/NavHeader";
import GStyles, {appSize, TRUE_ONE_LINE} from "../../../Components/GStyles";
import IconNext from "../../../Assets/Svgs/IconNext";
import {useDispatch, useSelector} from "react-redux";
import {logout, updateUserInfo} from "../../../Redux/persistedReducer";
import {Asset, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React, {useState} from "react";
import FormData from "form-data";
import {R_POST} from "../../../Services/NetRequestService";
import axios from "axios";
import TurboImage from "react-native-turbo-image/src/TurboImage";
import {useNavigation} from "@react-navigation/native";
import Modal from "react-native-modal";

function IndexView(props: any) {

    const dispatch = useDispatch()

    const userInfo = useSelector(state => state?.userInfo);

    console.log(userInfo)

    const nav = useNavigation()

    const [selectedImages, setSelectedImages] = useState<Asset[]>([]);

    const handleSelectFromGallery = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,      // 最多选择5张
            quality: 0.8,           // 80%质量
            includeBase64: false,
        });


        console.log(result?.assets[0])

        const imageAsset = result?.assets[0]

        const formData = new FormData();
        formData.append('file', {
            file: imageAsset.uri.replace('file://', ''),                    // 图片的本地uri地址
            uri: imageAsset.uri.replace('file://', ''),                    // 图片的本地uri地址
            type: imageAsset.type || 'image/jpeg',  // 图片的MIME类型
            name: imageAsset.fileName || 'photo.jpg', // 图片文件名
        });
        // 如果需要，可以同时上传其他参数
        // formData.append('quality', '30');          // 额外参数示例


        // console.log('formData:', formData);
        const globalToken = global.token;

        ///open-api/mobile/member/upload
        const response = await axios.post('https://vps-sg-aws-opc.43046721.xyz/open-api/mobile/member/avatar', formData, {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                // 如果有token，在这里添加
                // 'Authorization': 'Bearer your-token',
                'Member-Authorization':globalToken,
            },
            timeout: 30000, // 设置30秒超时
        });

        if (response?.data.code == 200){
            const res1 = await R_POST('/open-api/mobile/member/getMemberInfo', {})

            if (res1?.code == 200 && res1?.data) {
                dispatch(updateUserInfo(res1?.data))
            }
        }


        console.log('上传:', response?.data.code);

        // const response = await fetch('https://vps-sg-aws-opc.43046721.xyz/open-api/mobile/member/upload', {
        //     method: 'POST',
        //     body: formData,
        //     // 同样，不要设置 Content-Type
        // });
        //
        // console.log('上传:', response.json());

        // R_POST('/open-api/mobile/member/avatar',formData).then(res=>{
        //     console.log('res',res)
        // }).catch(err=>{
        //     console.log('err',err)
        // })

        //
        //
        //
        //
        // if (result.didCancel) {
        //     console.log('用户取消了选择');
        // } else if (result.errorCode) {
        //     Alert.alert('错误', result.errorMessage || '选择图片失败');
        // } else if (result.assets) {
        //     setSelectedImages(result.assets);
        // }
    };

    const cancelAcc = () => {

        R_POST('/open-api/mobile/member/cancel',null).then(res=>{

            if (res?.code == 200){
                setShowDelete(false)
                dispatch(logout(null));
                props?.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }else{
                Alert.alert(res?.msg)
            }

        }).catch(err=>{

        })

    }

    const MenuBar = ({ title = 'title', LeftDom, onPress,style,showRightIcon=true }) => {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={[
                    GStyles.row,
                    GStyles.ac,
                    GStyles.jcBetween,
                    GStyles.ph12,
                    {
                        height: appSize(64),
                        width: '100%',
                        marginTop:appSize(10),
                        backgroundColor: '#ffffff',
                        ...style
                    },
                ]}
            >
                <Text style={{
                    color: '#1C1A17',
                    fontSize: appSize(16),
                    // marginTop: Platform.OS == 'ios' ? -appSize(4) : 0,
                    fontWeight: '500',
                    marginLeft: appSize(8),
                }}>{title}</Text>
                <View style={[GStyles.row, GStyles.jc, GStyles.ac]}>
                    {LeftDom}
                    {showRightIcon&&(<Image source={require('../../../Assets/mine/icon-right.png')} style={{height:appSize(24),width:appSize(25)}} />)}
                </View>
            </TouchableOpacity>
        );
    };

    const [showDelete,setShowDelete] = useState(false)
    const DeleteAccount = () => {
        return (<Modal animationIn="fadeIn"
                       animationOut="fadeOut"
                       style={{margin: 0, padding: 0}} isVisible={showDelete}>
            <View style={{flex: 1, padding: 0, justifyContent: 'center', alignItems: 'center'}}>
                <View style={[GStyles.jc, GStyles.ac, {
                    paddingHorizontal: appSize(40),
                    width: appSize(326),
                    height: appSize(200),
                    backgroundColor: '#fff'
                }]}>

                    <Text style={[GStyles.ffh11]}>是否注销账户</Text>

                    <Text style={{marginTop:appSize(20),textAlign:'center'}}>注销账号后,您的所有用户信息均被删除</Text>
                    <Text style={{marginTop:appSize(10),textAlign:'center'}}>且账户上所有资产全部被删除</Text>

                    <View style={[GStyles.row,GStyles.ac,GStyles.jc,{gap:appSize(10),marginTop:appSize(20)}]}>
                        <TouchableOpacity onPress={()=>{
                            setShowDelete(false)
                        }} style={[GStyles.jc,GStyles.ac,{borderRadius:appSize(5),borderWidth:1,borderColor:'#A5885F',height:appSize(40),width:appSize(120)}]}>
                            <Text style={{color:'#A5885F'}}>取消</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{
                            cancelAcc()

                        }} style={[GStyles.jc,GStyles.ac,{backgroundColor:'#A5885F',borderRadius:appSize(5),height:appSize(40),width:appSize(120)}]}>
                            <Text style={{color:'#ffffff'}}>确定</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>)
    }

                return (
        <View style={{ flex: 1,backgroundColor:''}}>
            <NavHeader title={'个人资料'} />
            <View style={{}}>
                <MenuBar onPress={()=>{
                    handleSelectFromGallery()
                }} title={'头像'} LeftDom={
                    userInfo?.avatar? <TurboImage
                        source={{ uri:userInfo?.avatar}}
                        style={{ width: appSize(44), height: appSize(44),borderRadius:appSize(22) }}
                        resizeMode="cover"
                    />:<Image
                        source={require('./../../../Assets/mine/avatar.png')}
                        style={{borderWidth:2,borderColor:'#fff', width: appSize(44), height: appSize(44),borderRadius:appSize(22) }}
                        resizeMode="cover"
                    />
                } />


                <MenuBar onPress={()=>{
                    //EditName
                    nav.navigate('EditName')
                }} style={{}}  title={'昵称'} LeftDom={<Text style={{color:'#5F5F5F'}}>{userInfo?.username}</Text>} />
                <MenuBar  title={'账号'} LeftDom={<Text style={{color:'#5F5F5F'}}>{userInfo?.email}</Text>} />
                <MenuBar title={'修改密码'} onPress={()=>{
                    nav.navigate('EditPwd')
                }}  />
            </View>

            <TouchableOpacity onPress={()=>{

                setShowDelete(true)
            }} style={[GStyles.jc,GStyles.ac,{marginTop:100,width:'100%',height:64,backgroundColor:'#fff'}]}>
              <Text style={{color:'#F29E9E',fontSize:14}}>注销账户</Text>
            </TouchableOpacity>


            <DeleteAccount />

        </View>
    );
}

export default IndexView;
