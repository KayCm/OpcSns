import {View,Text} from "react-native";
import MapView,{ Marker } from 'react-native-maps';
import GStyles, { WINDOW_WIDTH } from '../../Components/GStyles.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

function IndexView() {

  const insets = useSafeAreaInsets()

  const [showDetail, setShowDetail] = useState(false);

   const DetailCard = () => {

     return (
       <View
         style={[
           GStyles.pa,
           GStyles.jc,
           GStyles.ac,
           {
             bottom: 64 + insets.bottom + 10,
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
           <Text style={{ fontSize: 24, fontWeight: '600' }}>Title</Text>
           <Text>
             TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText
           </Text>
         </View>
       </View>
     );

   }

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
            onSelect={e => {
              console.log(e.nativeEvent);
              setShowDetail(true);
            }}
            onCalloutPress={()=>{
              console.log('onCalloutPress');
            }}
            identifier={'abc123123123'}
            coordinate={{ latitude: 30.16, longitude: 120.12 }}
          />
        </MapView>

        {showDetail && <DetailCard />}
      </View>
    );
}

export default IndexView;
