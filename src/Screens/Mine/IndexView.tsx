import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet, Image,
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
                <Image source={iconImg} style={{width:appSize(18),height:appSize(18)}} />
                <Text style={[GStyles.ffb,{fontSize:appSize(16),fontWeight:'600',marginLeft:appSize(8)}]}>{title}</Text>
            </View>
            <Image source={require('../../Assets/mine/hugeicon.png')} style={{width:appSize(24),height:appSize(24)}} />
        </TouchableOpacity>)
    }

    const MemberCard = () => {

        return(<View style={[GStyles.jcBetween,{paddingVertical:30,paddingHorizontal:12,width:'90%',height:150,borderRadius:10,backgroundColor:'#23232330'}]}>

            <View style={[GStyles.row,GStyles.ac,{gap:10}]}>
                <Text>OPC NEWS会员</Text>

                <View style={[GStyles.jc,GStyles.ac,GStyles.pv5,GStyles.ph10,{borderRadius:20,borderColor:'#232323',borderWidth:1}]}>
                    <Text>已开通</Text>
                </View>
            </View>

            <View style={[GStyles.row,GStyles.ac,{gap:10}]}>
                <Text>登录后查看您的会员等级</Text>
                <View style={[GStyles.jc,GStyles.ac,GStyles.pv5,GStyles.ph10,{borderRadius:20,backgroundColor:'#123'}]}>
                    <Text style={{color:'#fff'}}>查看详情</Text>
                </View>
            </View>

        </View>)
    }

    return (<ScrollView style={{flex:1}}>
        <View style={{flex:1,paddingTop:insets.top}}>
            <LinearGradient colors={['#F7E3D1', '#ffffff']} style={[GStyles.pa,{width:'100%',height:appSize(280)}]} />
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
                <MemberCarousel initialIndex={1} data={[{imageUrl:require('../../Assets/mine/member1.png')},{imageUrl:require('../../Assets/mine/member2.png')},{imageUrl:require('../../Assets/mine/member3.png')}]} />
            </View>

            <View style={{width:'100%',marginTop:appSize(25)}}>
                <MenuBar iconImg={require('../../Assets/mine/icon1.png')} title={t('profile.aboutUs')} onPress={() => {Nav.navigate('About');}}/>
                <MenuBar iconImg={require('../../Assets/mine/icon2.png')} title={t('profile.purchase')} onPress={() => {Nav.navigate('Purchase');}}/>
                <MenuBar iconImg={require('../../Assets/mine/icon3.png')} title={t('profile.faq')} onPress={() => {Nav.navigate('Faq');}}/>
                <MenuBar iconImg={require('../../Assets/mine/icon4.png')} title={t('profile.feedback')} onPress={() => {Nav.navigate('FeedBack');}}/>
                <MenuBar iconImg={require('../../Assets/mine/icon5.png')} title={t('profile.settings')} onPress={() => {Nav.navigate('Settings');}}/>
            </View>




        </View>


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
