import {View,Text, TouchableOpacity, Button } from "react-native";
import NavHeader from "../../../Components/NavHeader";
import { CameraPosition, MapView, Marker } from '../../../Components/amap';
import React, { useRef, useState } from 'react';


const CITIES = [
  { latitude: 39.9087, longitude: 116.3975, title: '北京' },
  { latitude: 31.2304, longitude: 121.4737, title: '上海' },
  { latitude: 30.2741, longitude: 120.1551, title: '杭州' },
  { latitude: 22.5431, longitude: 114.0579, title: '深圳' },
  { latitude: 23.1291, longitude: 113.2644, title: '广州' },
];

function IndexView(props: any) {


  const mapRef = useRef<MapView>(null);
  const [active, setActive] = useState(0);

  function moveTo(index: number) {
    setActive(index);
    const { latitude, longitude } = CITIES[index];
    mapRef.current?.moveCamera(
      { target: { latitude, longitude }, zoom: 13 },
      600,
    );
  }

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <NavHeader title={'购买记录'} />

        <Button
          title={'move'}
          onPress={() => {

            moveTo(1);

          }}
        />

        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialCameraPosition={{
            target: {
              latitude: CITIES[0].latitude,
              longitude: CITIES[0].longitude,
            },
            zoom: 11,
          }}
        >
          {CITIES.map((city, index) => (
            <Marker
              key={city.title}
              position={{ latitude: city.latitude, longitude: city.longitude }}
              zIndex={active === index ? 10 : 1}
            />
          ))}
        </MapView>
      </View>
    );
}

export default IndexView;
