import {View, Text, TouchableOpacity, Alert, Image} from "react-native";
import NavHeader from "../../../Components/NavHeader";
import GStyles, {appSize, TRUE_ONE_LINE} from "../../../Components/GStyles";
import IconNext from "../../../Assets/Svgs/IconNext";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../Redux/persistedReducer";
import {Asset, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useState} from "react";
import FormData from "form-data";
import {R_POST} from "../../../Services/NetRequestService";
import axios from "axios";
import TurboImage from "react-native-turbo-image/src/TurboImage";


function IndexView(props: any) {

    const dispatch = useDispatch()

    const userInfo = useSelector(state => state?.userInfo);

    console.log(userInfo)

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
        formData.append('photo', {
            file: imageAsset.uri,                    // 图片的本地uri地址
            uri: imageAsset.uri,                    // 图片的本地uri地址
            type: imageAsset.type || 'image/jpeg',  // 图片的MIME类型
            name: imageAsset.fileName || 'photo.jpg', // 图片文件名
        });
        // 如果需要，可以同时上传其他参数
        formData.append('quality', '30');          // 额外参数示例

        //const globalToken = global.token;

        ///open-api/mobile/member/upload
        // const response = await axios.post('https://vps-sg-aws-opc.43046721.xyz/open-api/mobile/member/upload', formData, {
        //     headers: {
        //         // 'Content-Type': 'multipart/form-data',
        //         // 如果有token，在这里添加
        //         // 'Authorization': 'Bearer your-token',
        //         'Member-Authorization':globalToken,
        //     },
        //     timeout: 30000, // 设置30秒超时
        // });

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
                <Text style={{ fontSize: appSize(15), fontWeight: '600' }}>{title}</Text>
                <View style={[GStyles.row, GStyles.jc, GStyles.ac]}>
                    {LeftDom}
                    {showRightIcon&&(<Image source={require('../../../Assets/mine/icon-right.png')} style={{height:appSize(24),width:appSize(25)}} />)}
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <View style={{ flex: 1,backgroundColor:''}}>
            <NavHeader title={'个人资料'} />
            <View style={{}}>
                <MenuBar onPress={()=>{
                    handleSelectFromGallery()
                }} title={'头像'} LeftDom={<TurboImage
                    source={{ uri:userInfo?.avatar}}
                    style={{ width: appSize(44), height: appSize(44),borderRadius:appSize(22) }}
                    resizeMode="cover"
                />} />


                <MenuBar style={{  }}  title={'昵称'} LeftDom={<Text style={{color:'#5F5F5F'}}>{userInfo?.username}</Text>} />
                <MenuBar title={'绑定账号'} LeftDom={<Text style={{color:'#5F5F5F'}}>{userInfo?.email}</Text>} />
                <MenuBar title={'修改密码'} onPress={()=>{
                    // nav.navigate('ResetPassword')
                }}  />
            </View>

            <TouchableOpacity onPress={()=>{

                dispatch(logout(null))

                props?.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });

            }} style={[GStyles.jc,GStyles.ac,{marginTop:100,width:'100%',height:64,backgroundColor:'#fff'}]}>
              <Text style={{color:'#F29E9E',fontSize:14}}>注销账户</Text>
            </TouchableOpacity>



        </View>
    );
}

export default IndexView;
