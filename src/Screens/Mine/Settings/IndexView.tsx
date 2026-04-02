import { View, Text, TouchableOpacity, Switch } from 'react-native';
import NavHeader from "../../../Components/NavHeader";
import GStyles, { TRUE_ONE_LINE } from '../../../Components/GStyles.ts';
import IconNext from '../../../Assets/Svgs/IconNext.tsx';
import { useState } from 'react';

function IndexView(props: any) {


  const [isEnabled, setIsEnabled] = useState(false);

  const {navigation,route} = props

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
            height: 64,
            width: '100%',
            borderBottomWidth: TRUE_ONE_LINE,
            borderColor: '#2c2c2c50',
            ...style
          },
        ]}
      >
        <Text style={{ fontSize: 16, fontWeight: '600' }}>{title}</Text>
        <View style={[GStyles.row, GStyles.jc, GStyles.ac]}>
          {LeftDom}
          {showRightIcon&&(<IconNext />)}
        </View>
      </TouchableOpacity>
    );
  };

    return (
      <View style={{ flex: 1 }}>
        <NavHeader title={'设置'} />
        <MenuBar
          title={'账号管理'}
          onPress={()=>{
              navigation.push('')
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
        <MenuBar
          title={'消息推送'}
          style={{ backgroundColor: '#ffffff' }}
          LeftDom={<Switch value={isEnabled} onValueChange={toggleSwitch} />}
          showRightIcon={false}
        />
        <MenuBar
          title={'语言'}
          onPress={()=>{
              navigation.push('')
          }}
          style={{ backgroundColor: '#ffffff' }}
          LeftDom={<Text>中文</Text>}
          showRightIcon={false}
        />
        <MenuBar title={'隐私协议'} style={{ backgroundColor: '#ffffff' }} />
        <MenuBar title={'用户协议'} style={{ backgroundColor: '#ffffff' }} />
        <MenuBar
          title={'版本号'}
          style={{ backgroundColor: '#ffffff' }}
          LeftDom={<Text>1.2.3</Text>}
          showRightIcon={false}
        />
        <MenuBar
          title={'清除缓存'}
          style={{ backgroundColor: '#ffffff' }}
          LeftDom={<Text>1000M</Text>}
          showRightIcon={false}
        />
      </View>
    );
}

export default IndexView;
