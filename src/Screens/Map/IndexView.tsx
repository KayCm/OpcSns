import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import GStyles, { WINDOW_WIDTH } from '../../Components/GStyles.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRef, useState } from 'react';
import IconNavClose from '../../Assets/Svgs/IconNavClose';
function IndexView() {
  const insets = useSafeAreaInsets();

  const [showDetail, setShowDetail] = useState(false);

  const [cam, setCam] = useState(null);

  const DetailCard = () => {
    return (
      <View
        style={[
          GStyles.pa,
          GStyles.jc,
          GStyles.ac,
          {
            bottom: 10,
            width: WINDOW_WIDTH,
            height: 200,
          },
        ]}
      >
        <View
          style={{
            width: WINDOW_WIDTH - 24,
            height: 200,
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 10,
          }}
        >
          <View
            style={[
              GStyles.row,
              GStyles.ac,
              GStyles.jcBetween,
              { marginBottom: 10 },
            ]}
          >
            <Text style={{ fontSize: 24, fontWeight: '600' }}>Title</Text>
            <TouchableOpacity
              onPress={() => {
                setShowDetail(false);
              }}
            >
              <IconNavClose />
            </TouchableOpacity>
          </View>
          <Text>
            TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText
          </Text>
        </View>
      </View>
    );
  };

  const mapRef = useRef(null);

  const LATITUDE = 30.16;
  const LONGITUDE = 120.17;

  const initialCamera = {
    center: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
    },
    pitch: 45,
    heading: 90,
    altitude: 1000,
    zoom: 1,
  };

  const getLoacl = () => {
    mapRef?.current.getCamera().then(res => {
      setCam(res);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        ref={mapRef}
        initialCamera={initialCamera}
        showsCompass={true}
      >
        <Marker
          onPress={() => {
            setShowDetail(true);
          }}
          onSelect={e => {
            console.log(e.nativeEvent);
          }}
          onCalloutPress={() => {
            console.log('onCalloutPress');
          }}
          identifier={'abc123123123'}
          coordinate={{ latitude: LATITUDE, longitude: LONGITUDE }}
        />
      </MapView>

      {showDetail && <DetailCard />}
    </View>
  );
}

export default IndexView;
