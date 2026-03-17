import {View,Text} from "react-native";
import MapView,{ Marker } from 'react-native-maps';

function IndexView() {

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 30.16,
            longitude: 120.12,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: 37.78825, longitude: 122.4324 }}
            title={'title'}
            description={'description'}
          />
        </MapView>
      </View>
    );
}

export default IndexView;
