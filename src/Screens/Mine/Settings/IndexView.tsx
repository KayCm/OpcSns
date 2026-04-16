import {View, Text, TouchableOpacity, Switch, Image} from 'react-native';
import NavHeader from "../../../Components/NavHeader";
import GStyles, {appSize, TRUE_ONE_LINE} from '../../../Components/GStyles.ts';
import IconNext from '../../../Assets/Svgs/IconNext.tsx';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {logout} from "../../../Redux/persistedReducer";
import {useDispatch} from "react-redux";
import {removeLastLoginInfo} from "../../../Components/Tools";

function IndexView(props: any) {


  const [isEnabled, setIsEnabled] = useState(false);

  const Nav = useNavigation()

    const dispatch = useDispatch();

  const {navigation,route} = props

  const nav = useNavigation()

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
              marginTop:appSize(8),
            borderBottomWidth: TRUE_ONE_LINE,
            borderColor: '#2c2c2c50',
            ...style
          },
        ]}
      >
        <Text style={{ fontSize: appSize(14), fontWeight: '600' }}>{title}</Text>
        <View style={[GStyles.row, GStyles.jc, GStyles.ac]}>
          {LeftDom}
          {showRightIcon&&(<Image source={require('../../../Assets/mine/icon-right.png')} style={{height:appSize(24),width:appSize(25)}} />)}
        </View>
      </TouchableOpacity>
    );
  };

    return (
      <View style={{ flex: 1 }}>
        <NavHeader title={'设置'} />
        <MenuBar
          title={'账号管理'}
          onPress={() => {
              Nav.navigate('ProfileSettings');
          }}
          style={{
            backgroundColor: '#ffffff',
            borderBottomWidth: 0,
            marginTop: 10,
          }}
        />
        {/*<MenuBar*/}
        {/*  title={'跟随系统外观'}*/}
        {/*  style={{ backgroundColor: '#ffffff', marginTop: 10 }}*/}
        {/*  LeftDom={<Switch value={isEnabled} onValueChange={toggleSwitch} />}*/}
        {/*  showRightIcon={false}*/}
        {/*/>*/}
        {/*<MenuBar*/}
        {/*  title={'消息推送'}*/}
        {/*  style={{ backgroundColor: '#ffffff' }}*/}
        {/*  LeftDom={<Switch value={isEnabled} onValueChange={toggleSwitch} />}*/}
        {/*  showRightIcon={false}*/}
        {/*/>*/}
        <MenuBar
          title={'语言'}
          onPress={() => {
              nav.navigate('Language')
          }}
          style={{ backgroundColor: '#ffffff' }}
          LeftDom={
            <Text style={{ color: '#5F5F5F', fontSize: appSize(14) }}>
              中文
            </Text>
          }
          showRightIcon={true}
        />
        <MenuBar
          onPress={() => {
            nav.navigate('Agreement', { type: 1 });
          }}
          title={'隐私协议'}
          style={{ backgroundColor: '#ffffff' }}
        />
        <MenuBar
          onPress={() => {
            nav.navigate('Agreement', { type: 2 });
          }}
          title={'用户协议'}
          style={{ backgroundColor: '#ffffff' }}
        />
        <MenuBar
          title={'版本号'}
          style={{ backgroundColor: '#ffffff' }}
          LeftDom={
            <Text style={{ color: '#5F5F5F', fontSize: appSize(14) }}>
              1.2.3
            </Text>
          }
          showRightIcon={false}
        />
        {/*<MenuBar*/}
        {/*  title={'清除缓存'}*/}
        {/*  style={{ backgroundColor: '#ffffff' }}*/}
        {/*  LeftDom={*/}
        {/*    <Text style={{ color: '#5F5F5F', fontSize: appSize(14) }}>*/}
        {/*      1000M*/}
        {/*    </Text>*/}
        {/*  }*/}
        {/*  showRightIcon={false}*/}
        {/*/>*/}

        <TouchableOpacity
          onPress={() => {

              dispatch(logout(null));

              // removeLastLoginInfo()

              props?.navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });

          }}
          style={[
            GStyles.jc,
            GStyles.ac,
            {
              marginTop: appSize(56),
              height: appSize(64),
              width: '100%',
              backgroundColor: '#ffffff',
            },
          ]}
        >
          <Text style={[GStyles.ffh1, { color: '#FF6A6A' }]}>退出登录</Text>
        </TouchableOpacity>
      </View>
    );
}

export default IndexView;
