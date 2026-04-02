import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { appSize, NAVIGATOR_HEIGHT, TURE_ONE_LINE } from './GStyles';
import { Shadow } from 'react-native-shadow-2';
import GStyles from './GStyles';
import IconNavBack from '../Assets/Svgs/IconNavBack';
import { useNavigation } from '@react-navigation/native';
import IconNavClose from '../Assets/Svgs/IconNavClose';
function NavHeader({ onPressLeft = null, title = 'Title',showLeft=true, showClose = false }) {
  const nav = useNavigation();
  const area = useSafeAreaInsets();

  return (
    <View
      style={{
        borderBottomColor: '#00000030',
        borderBottomWidth: TURE_ONE_LINE,
      }}
    >
      <Shadow distance={3}>
        <View style={{ height: area.top, backgroundColor: '#fff' }} />
        <View
          style={[
            GStyles.row,
            GStyles.ph12,
            GStyles.jcBetween,
            GStyles.ac,
            {
              height: NAVIGATOR_HEIGHT,
              width: '100%',
              backgroundColor: '#fff',
            },
          ]}
        >

            {showLeft?<TouchableOpacity
                onPress={() => {
                    if (!onPressLeft) nav.goBack();
                }}
            >
                {showClose ? <IconNavClose /> : <IconNavBack />}
            </TouchableOpacity>:<View style={{ width: 32 }} />}



          <Text
            style={{
              fontSize: appSize(18),
              fontWeight: '600',
              color: '#000000',
            }}
          >
            {title}
          </Text>

          <View style={{ width: 32 }} />
        </View>
      </Shadow>
    </View>
  );
}

export default NavHeader;
