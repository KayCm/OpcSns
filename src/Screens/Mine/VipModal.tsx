import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GStyles, { appSize, WINDOW_WIDTH } from '../../Components/GStyles.ts';

import { useState } from 'react';
import Modal from 'react-native-modal';

const vip1Arr = [
  {text:'观看资讯',icon:require('../../Assets/mine/vip1icon1.png')},
  {text:'同城活动',icon:require('../../Assets/mine/vip1icon2.png')},
  {text:'国内社区',icon:require('../../Assets/mine/vip1icon3.png')}
]


const vip2Arr = [
  { text: '兼职副业', icon: require('../../Assets/mine/vip2icon1.png') },
  { text: '搞钱案例', icon: require('../../Assets/mine/vip2icon2.png') },
  { text: '创业社群', icon: require('../../Assets/mine/vip2icon3.png') },
  { text: '闭门直播', icon: require('../../Assets/mine/vip2icon4.png') },
  { text: '同城活动', icon: require('../../Assets/mine/vip2icon5.png') },
  { text: '资源对接', icon: require('../../Assets/mine/vip2icon6.png') },
];


export const VipModal = ({ isModalVisible=false,onDismiss }) => {
  // const [isModalVisible, setisModalVisible] = useState(true);
  const [modalVipNum, setModalVipNum] = useState(0);

  return (
    <Modal style={{ margin: 0, padding: 0 }} isVisible={isModalVisible}>
      <View
        style={{
          flex: 1,
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View>
          <View
            style={[
              GStyles.row,
              GStyles.jc,
              GStyles.ac,
              { gap: appSize(10), marginBottom: appSize(15) },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVipNum(0);
              }}
            >
              <ImageBackground
                source={require('../../Assets/mine/vipBtnBg1.png')}
                style={[
                  GStyles.row,
                  GStyles.jc,
                  GStyles.ac,
                  { width: appSize(90), height: appSize(32) },
                ]}
              >
                <Image
                  source={require('../../Assets/mine/vip1.png')}
                  style={{
                    width: appSize(24),
                    height: appSize(24),
                    marginTop: appSize(5),
                  }}
                />
                <Text style={[GStyles.ffh11, { fontSize: appSize(14) }]}>
                  会员
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVipNum(1);
              }}
            >
              <ImageBackground
                source={require('../../Assets/mine/vipBtnBg2.png')}
                style={[
                  GStyles.row,
                  GStyles.jc,
                  GStyles.ac,
                  { width: appSize(90), height: appSize(32) },
                ]}
              >
                <Image
                  source={require('../../Assets/mine/vip2.png')}
                  style={{
                    width: appSize(24),
                    height: appSize(24),
                    marginTop: appSize(5),
                  }}
                />
                <Text style={[GStyles.ffh11, { fontSize: appSize(14) }]}>
                  精英会员
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          {modalVipNum == 0 ? (
            <View
              style={{
                width: appSize(350),
                height: appSize(300),
                backgroundColor: '#fff',
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={[GStyles.ffh11, { fontSize: appSize(28) }]}>
                  会员尊享功能
                </Text>

                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    gap: appSize(36),
                    marginTop: appSize(20),
                  }}
                >
                  {vip1Arr.map((value, index, array) => {
                    return (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#F8F8F8',
                            width: appSize(48),
                            height: appSize(48),
                            borderRadius: appSize(24),
                          }}
                        >
                          <Image
                            style={{ width: appSize(30), height: appSize(30) }}
                            source={value.icon}
                          />
                        </View>

                        <Text
                          style={{
                            marginTop: appSize(18),
                            color: '#1C1A17',
                            fontSize: appSize(16),
                          }}
                        >
                          {value.text}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
              <View
                style={[
                  GStyles.row,
                  {
                    width: '100%',
                    backgroundColor: '#000',
                    height: appSize(56),
                  },
                ]}
              >
                <ImageBackground
                  style={[
                    GStyles.jc,
                    GStyles.ac,
                    { height: appSize(56), width: appSize(170) },
                  ]}
                  source={require('../../Assets/mine/vipBottomBg1.png')}
                >
                  <View style={[GStyles.row]}>
                    <Text
                      style={[
                        GStyles.ffh11,
                        { color: '#000', fontSize: appSize(14) },
                      ]}
                    >
                      优惠价:¥
                    </Text>
                    <Text
                      style={[
                        GStyles.ffh11,
                        {
                          color: '#000',
                          fontSize: appSize(30),
                          marginTop: -appSize(10),
                        },
                      ]}
                    >
                      29.9
                    </Text>
                  </View>
                </ImageBackground>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('');
                  }}
                  style={[GStyles.jc, GStyles.ac, { flex: 1 }]}
                >
                  <Text style={[GStyles.ffh11, { color: '#fff' }]}>
                    确认协议并支付
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View
              style={{
                width: appSize(350),
                height: appSize(420),
                backgroundColor: '#fff',
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={[GStyles.ffh11, { fontSize: appSize(28) }]}>
                  精英会员尊享功能
                </Text>

                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    gap: appSize(36),
                    marginTop: appSize(20),
                  }}
                >
                  {vip2Arr.map((value, index, array) => {
                    return (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#F8F8F8',
                            width: appSize(48),
                            height: appSize(48),
                            borderRadius: appSize(24),
                          }}
                        >
                          <Image
                            style={{ width: appSize(30), height: appSize(30) }}
                            source={value.icon}
                          />
                        </View>

                        <Text
                          style={{
                            marginTop: appSize(18),
                            color: '#1C1A17',
                            fontSize: appSize(16),
                          }}
                        >
                          {value.text}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
              <View
                style={[
                  GStyles.row,
                  {
                    width: '100%',
                    backgroundColor: '#000',
                    height: appSize(56),
                  },
                ]}
              >
                <ImageBackground
                  style={[
                    GStyles.jc,
                    GStyles.ac,
                    { height: appSize(56), width: appSize(170) },
                  ]}
                  source={require('../../Assets/mine/vipBottomBg.png')}
                >
                  <View style={[GStyles.row]}>
                    <Text
                      style={[
                        GStyles.ffh11,
                        { color: '#000', fontSize: appSize(14) },
                      ]}
                    >
                      优惠价:¥
                    </Text>
                    <Text
                      style={[
                        GStyles.ffh11,
                        {
                          color: '#000',
                          fontSize: appSize(30),
                          marginTop: -appSize(10),
                        },
                      ]}
                    >
                      199
                    </Text>
                  </View>
                </ImageBackground>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('');
                  }}
                  style={[GStyles.jc, GStyles.ac, { flex: 1 }]}
                >
                  <Text style={[GStyles.ffh11, { color: '#fff' }]}>
                    确认协议并支付
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            if (onDismiss) onDismiss();
          }}
          style={[
            { width: '100%', height: '100%', flex: 1, zIndex: -1 },
            GStyles.pa,
          ]}
        ></TouchableOpacity>
      </View>
    </Modal>
  );
};
