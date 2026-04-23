import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GStyles, {
  appSize,
  TRUE_ONE_LINE,
  WINDOW_WIDTH,
} from '../../Components/GStyles';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import MineViewModel from './MineViewModel';
import TurboImage from 'react-native-turbo-image/src/TurboImage';
import LinearGradient from 'react-native-linear-gradient';
import { MemberCarousel } from '../../Components/MemberCarousel';
import React, { useState } from 'react';
import { VipModal } from './VipModal.tsx';
import {MMKVLoader, useMMKVStorage} from "react-native-mmkv-storage";
import {COLORS} from "../../Components/Constant";
import Modal from "react-native-modal";
import {R_GET} from "../../Services/NetRequestService";

function IndexView() {
  const insets = useSafeAreaInsets();

  const Nav = useNavigation();

  const { t } = useTranslation();

  const [isModalVisible, setisModalVisible] = useState(false);

  const appSettings = new MMKVLoader().withInstanceID("appSettings").initialize();
  const [reviewStatus, setReviewStatus] = useMMKVStorage('isReview', appSettings, 0);

  const { userInfo } = MineViewModel();

  const MenuBar = ({
    iconImg = require('../../Assets/mine/icon1.png'),
    title = 'title',
    onPress,
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          GStyles.row,
          GStyles.ac,
          GStyles.jcBetween,
          {
            paddingLeft: appSize(26),
            paddingRight: appSize(20),
            marginBottom: appSize(8),
            height: appSize(48),
            width: '100%',
            backgroundColor: '#fff',
          },
        ]}
      >
        <View style={[GStyles.row, GStyles.ac]}>
          <Image
            source={iconImg}
            style={{ width: appSize(20), height: appSize(20) }}
          />
          <Text
            style={[
              // GStyles.ffssb,
              {
                color: '#1C1A17',
                fontSize: appSize(16),
                // marginTop: Platform.OS == 'ios' ? -appSize(4) : 0,
                fontWeight: '500',
                marginLeft: appSize(8),
              },
            ]}
          >
            {title}
          </Text>
        </View>
        <Image
          source={require('../../Assets/mine/icon-right.png')}
          style={{ height: appSize(24), width: appSize(24) }}
        />
      </TouchableOpacity>
    );
  };

  const memberLevelArr = [
    {
      text: '会员',
      icon: require('../../Assets/mine/vip1.png'),
      line: ['#F4F9FF', '#CBE5FF'],
    },
    {
      text: '精英VIP会员',
      icon: require('../../Assets/mine/vip2.png'),
      line: ['#F4E1C2', '#DBAC6A'],
    },
    {
      text: '钻石会员',
      icon: require('../../Assets/mine/vip3.png'),
      line: ['#3B3431', '#231F18'],
    },
  ];

  const [servImg,setServImg] = useState('')
  const getInvService = () => {
    R_GET('/open-api/mobile/customerService/default',null).then(res=>{
      if (res?.code==200){
        setServImg(res?.data?.qrCodeUrl)

        setTimeout(()=>{
          SetShowInv(true)
        },100)
      }else{
        Alert.alert(res?.msg)
      }
    }).catch(err=>{
      Alert.alert(err?.msg)
    })

  }

  const [showInv,SetShowInv] = useState(false)
  const InvCodeAlert = () => {
    return(<Modal animationIn="fadeIn"
                  animationOut="fadeOut"
                  style={{margin:0,padding:0}} isVisible={showInv}>
      <View style={{ flex: 1, padding: 0, justifyContent: 'center', alignItems: 'center' }}>
        <View style={[GStyles.jc,GStyles.ac,{paddingHorizontal:appSize(40),width:appSize(326),height:appSize(326),backgroundColor:'#fff'}]}>
          <Text>获取激活码</Text>
          <TurboImage source={{uri:servImg}} style={[GStyles.row,GStyles.ac,{marginTop:appSize(20),height:appSize(124),width:appSize(124),backgroundColor:''}]} />

          <Text style={{marginTop:appSize(20)}}>扫码添加客服微信进行购买</Text>

          <View style={[GStyles.row,GStyles.ac,GStyles.jc,{gap:appSize(10),marginTop:appSize(20)}]}>
            <TouchableOpacity onPress={()=>{
              SetShowInv(false)
            }} style={[GStyles.jc,GStyles.ac,{borderRadius:appSize(5),borderWidth:1,borderColor:'#A5885F',height:appSize(40),width:appSize(120)}]}>
              <Text style={{color:'#A5885F'}}>取消</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
              SetShowInv(false)
            }} style={[GStyles.jc,GStyles.ac,{backgroundColor:'#A5885F',borderRadius:appSize(5),height:appSize(40),width:appSize(120)}]}>
              <Text style={{color:'#ffffff'}}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>)
  }


  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <LinearGradient
          colors={['#F7E3D1', '#ffffff00']}
          style={[GStyles.pa, { width: '100%', height: appSize(280) }]}
        />

        {/*<Image style={[GStyles.pa, { width: '100%', height: appSize(280) }]} source={require('../../Assets/mine/mineTopBg.png')} />*/}


        <TouchableOpacity
          onPress={() => {

            // console.log('userInfo',userInfo)

            if (userInfo?.email){
              Nav.navigate('ProfileSettings');
            }else{
              Nav.navigate('Login');
            }


          }}
          style={[
            GStyles.row,
            {
              height: appSize(66),
              wdith: WINDOW_WIDTH,
              marginTop: appSize(90) - insets.top,
              paddingHorizontal: appSize(20),
            },
          ]}
        >
          {userInfo?.avatar?<TurboImage
              source={{ uri:userInfo?.avatar}}
              style={{borderWidth:2,borderColor:'#fff', width: appSize(64), height: appSize(64),borderRadius:appSize(32) }}
              resizeMode="cover"
          />:<Image
              source={require('./../../Assets/mine/avatar.png')}
              style={{borderWidth:2,borderColor:'#fff', width: appSize(64), height: appSize(64),borderRadius:appSize(32) }}
              resizeMode="cover"
          />}

          {/*<Image*/}
          {/*  source={require('../../Assets/icon.png')}*/}
          {/*  style={{*/}
          {/*    borderWidth: 2,*/}
          {/*    borderColor: '#fff',*/}
          {/*    width: appSize(64),*/}
          {/*    height: appSize(64),*/}
          {/*    borderRadius: appSize(32),*/}
          {/*  }}*/}
          {/*  resizeMode="cover"*/}
          {/*/>*/}
          <View
            style={[GStyles.row, GStyles.ac, GStyles.jcBetween, { flex: 1 }]}
          >
            <View style={{ gap: appSize(4), marginLeft: 10 }}>
              <View style={[GStyles.row, GStyles.ac]}>


                <Text
                  style={[
                    GStyles.ffh11,
                    { color: COLORS.FONTBLACK,fontWeight:'600', fontSize: appSize(20) },
                  ]}
                >
                  {userInfo?.username ? userInfo?.username : '未登录'}
                </Text>

              </View>

              {userInfo?.email&&<Text style={{ color: '#D8B789' }}>ID:{userInfo?.memberId}</Text>}
            </View>

            <Image
              source={require('../../Assets/mine/hugeicon.png')}
              style={{ width: appSize(24), height: appSize(24) }}
            />
          </View>
        </TouchableOpacity>

        {(reviewStatus == 1 || Platform.OS == 'android' ) && (<View
            style={{
              height: appSize(150),
              width: '100%',
              marginTop: appSize(25),
            }}
        >
          <MemberCarousel
              onPress={() => {
                setisModalVisible(true);

                // setisModalVisible(false)
              }}
              initialIndex={1}
              data={memberLevelArr}
              userInfo={userInfo}
          />
        </View>)}



        <View style={{ width: '100%', marginTop: appSize(25) }}>
          <MenuBar
            iconImg={require('../../Assets/mine/icon1.png')}
            title={t('profile.aboutUs')}
            onPress={() => {
              Nav.navigate('About');
            }}
          />
          {/*<MenuBar*/}
          {/*  iconImg={require('../../Assets/mine/icon2.png')}*/}
          {/*  title={t('profile.purchase')}*/}
          {/*  onPress={() => {*/}
          {/*    Nav.navigate('Purchase');*/}
          {/*  }}*/}
          {/*/>*/}
          <MenuBar
            iconImg={require('../../Assets/mine/icon3.png')}
            title={t('profile.faq')}
            onPress={() => {
              Nav.navigate('Faq');
            }}
          />
          <MenuBar
            iconImg={require('../../Assets/mine/icon4.png')}
            title={t('profile.feedback')}
            onPress={() => {
              if (userInfo?.email){
                Nav.navigate('FeedBack');
              }else{
                Nav.navigate('Login');
              }
            }}
          />
          <MenuBar
            iconImg={require('../../Assets/mine/icon5.png')}
            title={t('profile.settings')}
            onPress={() => {
              Nav.navigate('Settings');
            }}
          />
        </View>
      </View>
      <VipModal selectNum={1} isModalVisible={isModalVisible} onDismiss={()=>{
        setisModalVisible(false)
      }} onPress={(type)=>{
        setisModalVisible(false)
        setTimeout(()=>{
          getInvService()
        },1000)


      }} />

      <InvCodeAlert />
    </ScrollView>
  );


}

export default IndexView;
