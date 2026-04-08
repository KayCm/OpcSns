import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet, Image, Platform, Button, ImageBackground, Alert,
} from 'react-native';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import GStyles, {appSize, TRUE_ONE_LINE, WINDOW_WIDTH} from "../../Components/GStyles";
import { Shadow } from 'react-native-shadow-2';
import {useTranslation} from "react-i18next";
import IconNext from "../../Assets/Svgs/IconNext";
import {useNavigation} from "@react-navigation/native";
import CarouselWithScale from "./Card.tsx";
import ReanimatedCarousel from "./Card.tsx";
import Carousel from "./Card.tsx";
import SimpleCarousel from "./Card.tsx";
import MineViewModel from "./MineViewModel";
import TurboImage from "react-native-turbo-image/src/TurboImage";
import LinearGradient from 'react-native-linear-gradient';
import {MemberCarousel} from "../../Components/MemberCarousel";
import {useState} from "react";
import Modal from 'react-native-modal'

function IndexView() {

   const insets = useSafeAreaInsets()

    const Nav = useNavigation();

    const { t } = useTranslation();

    // const changeLanguage = (lng) => {
    //     i18n.changeLanguage(lng);
    // };

    const {userInfo} = MineViewModel()

    const MenuBar = ({iconImg=require('../../Assets/mine/icon1.png'),title='title',onPress}) => {
        return(<TouchableOpacity onPress={onPress} style={[GStyles.row,GStyles.ac,GStyles.jcBetween,{paddingLeft:appSize(26),paddingRight:appSize(20),marginBottom:appSize(8),height:appSize(48),width:'100%',backgroundColor:'#fff'}]}>

            <View style={[GStyles.row,GStyles.ac]}>
                <Image source={iconImg} style={{width:appSize(20),height:appSize(20)}} />
                <Text style={[GStyles.ffssb,{color:'#1C1A17',fontSize:appSize(15),marginTop:Platform.OS == 'ios' ?-appSize(4):0,fontWeight:'500',marginLeft:appSize(8)}]}>{title}</Text>
            </View>
            <Image source={require('../../Assets/mine/icon-right.png')} style={{height:appSize(24),width:appSize(24)}} />
        </TouchableOpacity>)
    }



    const memberLevelArr = [
        {text:'会员',icon:require('../../Assets/mine/vip1.png'),line:['#F4F9FF','#CBE5FF']},
        {text:'精英VIP会员',icon:require('../../Assets/mine/vip2.png'),line:['#F4E1C2','#DBAC6A']},
        {text:'钻石会员',icon:require('../../Assets/mine/vip3.png'),line:['#3B3431','#231F18']},
    ]

    const [isModalVisible,setisModalVisible] = useState(false)
    const VipModal = () => {

        return(<Modal style={{margin:0,padding:0}} isVisible={isModalVisible}>
            <View style={{ flex: 1, padding: 0, justifyContent: 'center', alignItems: 'center' }}>

                <View style={{width:appSize(350),height:appSize(420),backgroundColor:'#fff'}}>

                    <View style={{flex:1}}></View>

                    <View style={[GStyles.row,{width:'100%',backgroundColor:'#000',height:appSize(56)}]}>

                        <ImageBackground style={[GStyles.jc,GStyles.ac,{height:appSize(56),width:appSize(170)}]} source={require('../../Assets/mine/vipBottomBg.png')} >

                            <View style={[GStyles.row]}>
                                <Text style={[GStyles.ffh11,{color:'#000',fontSize:appSize(14)}]}>优惠价:¥</Text>
                                <Text style={[GStyles.ffh11,{color:'#000',fontSize:appSize(30),marginTop:-appSize(10)}]}>199</Text>
                            </View>

                        </ImageBackground>

                        <TouchableOpacity onPress={()=>{
                            Alert.alert('')
                        }} style={[GStyles.jc,GStyles.ac,{flex:1}]}>
                            <Text style={[GStyles.ffh11,{color:'#fff'}]}>确认协议并支付</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <TouchableOpacity onPress={()=>{
                  setisModalVisible(false)
                }} style={[{width:'100%',height:'100%',flex:1,zIndex:-1},GStyles.pa]}>

                </TouchableOpacity>

            </View>
        </Modal>)
    }

    return (<ScrollView style={{flex:1}}>
        <View style={{flex:1,paddingTop:insets.top}}>
            <LinearGradient colors={['#F7E3D1', '#ffffff00']} style={[GStyles.pa,{width:'100%',height:appSize(280)}]} />
            <TouchableOpacity onPress={() => {
                // console.log('userInfo',userInfo)
                Nav.navigate('ProfileSettings');
            }}style={[GStyles.row,{height:appSize(66),wdith:WINDOW_WIDTH,marginTop:appSize(90)-insets.top,paddingHorizontal:appSize(20)}]}>
            {/*<TurboImage*/}
            {/*    source={{ uri:userInfo?.avatar}}*/}
            {/*    style={{borderWidth:2,borderColor:'#fff', width: appSize(64), height: appSize(64),borderRadius:appSize(32) }}*/}
            {/*    resizeMode="cover"*/}
            {/*/>*/}
            <Image
                source={require('../../Assets/icon.png')}
                style={{borderWidth:2,borderColor:'#fff', width: appSize(64), height: appSize(64),borderRadius:appSize(32) }}
                resizeMode="cover"
            />
            <View style={[GStyles.row, GStyles.ac,GStyles.jcBetween,{flex:1}]}>
                <View style={{ gap:appSize(4), marginLeft: 10, }}>
                    <View style={[GStyles.row, GStyles.ac]}>
                        <Text style={[GStyles.ffb,{color:'#000',fontSize:appSize(20)}]}>{userInfo?.username}</Text>
                        <Image source={require('../../Assets/mine/member.png')} style={{marginLeft:appSize(6),width:appSize(66),height:appSize(18)}} />
                    </View>
                    <Text style={{color:'#D8B789'}}>ID:{userInfo?.email}</Text>
                </View>

                <Image source={require('../../Assets/mine/hugeicon.png')} style={{width:appSize(24),height:appSize(24)}} />
            </View>
        </TouchableOpacity>
            <View style={{height:appSize(150),width:'100%',marginTop:appSize(25)}}>
                <MemberCarousel onPress={()=>{
                    setisModalVisible(true)
                }} initialIndex={1} data={memberLevelArr} />
            </View>
            <View style={{width:'100%',marginTop:appSize(25)}}>
                <MenuBar iconImg={require('../../Assets/mine/icon1.png')} title={t('profile.aboutUs')} onPress={() => {Nav.navigate('About');}}/>
                <MenuBar iconImg={require('../../Assets/mine/icon2.png')} title={t('profile.purchase')} onPress={() => {Nav.navigate('Purchase');}}/>
                <MenuBar iconImg={require('../../Assets/mine/icon3.png')} title={t('profile.faq')} onPress={() => {Nav.navigate('Faq');}}/>
                <MenuBar iconImg={require('../../Assets/mine/icon4.png')} title={t('profile.feedback')} onPress={() => {Nav.navigate('FeedBack');}}/>
                <MenuBar iconImg={require('../../Assets/mine/icon5.png')} title={t('profile.settings')} onPress={() => {Nav.navigate('Settings');}}/>
            </View>
        </View>
        <VipModal />
    </ScrollView>)


    return (
      <View style={{ flex: 1, paddingTop: area.top }}>
        <ScrollView style={[GStyles.ph12]}>
          <TouchableOpacity
            onPress={() => {
              // console.log('userInfo',userInfo)
              Nav.navigate('ProfileSettings');
            }}
            style={[
              GStyles.row,
              GStyles.ac,
              GStyles.jcBetween,
              { height: 80, width: '100%' },
            ]}
          >
            <View style={[GStyles.row, GStyles.ac, { marginBottom: 10 }]}>

                <TurboImage
                    source={{ uri:userInfo?.avatar}}
                    style={{ width: appSize(64), height: appSize(64),borderRadius:appSize(32) }}
                    resizeMode="cover"
                />

              <View style={{ gap: 10, marginLeft: 10 }}>
                <Text>{userInfo?.username}</Text>
                <Text>2026-04-15</Text>
              </View>
            </View>
            <IconNext />
          </TouchableOpacity>

          <View
            style={{
              height: 160 * 1.1,
              width: '100%',
            }}
          >
            <SimpleCarousel />
          </View>

          {/*<View*/}
          {/*  style={[GStyles.jc, GStyles.ac, { width: '100%', height: 160 }]}*/}
          {/*>*/}
          {/*  <MemberCard />*/}
          {/*</View>*/}

          <MenuBar
            title={t('profile.aboutUs')}
            onPress={() => {
              Nav.navigate('About');
            }}
          />
          <MenuBar
            title={t('profile.purchase')}
            onPress={() => {
              Nav.navigate('Purchase');
            }}
          />
          <MenuBar
            title={t('profile.faq')}
            onPress={() => {
              Nav.navigate('Faq');
            }}
          />
          <MenuBar
            title={t('profile.feedback')}
            onPress={() => {
              Nav.navigate('FeedBack');
            }}
          />
          <MenuBar
            title={t('profile.settings')}
            onPress={() => {
              Nav.navigate('Settings');
            }}
          />
        </ScrollView>
      </View>
    );
}

export default IndexView;
