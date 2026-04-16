import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Button,
  ImageBackground,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GStyles, {
  appSize,
  TRUE_ONE_LINE,
  WINDOW_WIDTH,
} from '../../Components/GStyles';
import { Shadow } from 'react-native-shadow-2';
import { useTranslation } from 'react-i18next';
import IconNext from '../../Assets/Svgs/IconNext';
import { useNavigation } from '@react-navigation/native';
import CarouselWithScale from './Card.tsx';
import ReanimatedCarousel from './Card.tsx';
import Carousel from './Card.tsx';
import SimpleCarousel from './Card.tsx';
import MineViewModel from './MineViewModel';
import TurboImage from 'react-native-turbo-image/src/TurboImage';
import LinearGradient from 'react-native-linear-gradient';
import { MemberCarousel } from '../../Components/MemberCarousel';
import { useState } from 'react';

import { VipModal } from './VipModal.tsx';
import {MMKVLoader, useMMKVStorage} from "react-native-mmkv-storage";
import {COLORS} from "../../Components/Constant";

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
              GStyles.ffssb,
              {
                color: '#1C1A17',
                fontSize: appSize(15),
                marginTop: Platform.OS == 'ios' ? -appSize(4) : 0,
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
            Nav.navigate('ProfileSettings');
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
                  {userInfo?.username}
                </Text>

              </View>
              <Text style={{ color: '#D8B789' }}>ID:{userInfo?.email}</Text>
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
              }}
              initialIndex={1}
              data={memberLevelArr}
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
              Nav.navigate('FeedBack');
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
      <VipModal isModalVisible={isModalVisible} onDismiss={()=>{
        setisModalVisible(false)
      }} />
    </ScrollView>
  );


}

export default IndexView;
