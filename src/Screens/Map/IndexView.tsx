import {View, Text, TouchableOpacity, Platform} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import GStyles, { WINDOW_WIDTH } from '../../Components/GStyles.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRef, useState } from 'react';
import IconNavClose from '../../Assets/Svgs/IconNavClose';
import {R_POST} from "../../Services/NetRequestService";
import {useQuery} from "@tanstack/react-query";
function IndexView({navigation}) {

  const insets = useSafeAreaInsets();

  const [showDetail, setShowDetail] = useState(false);
  const [select, setSelect] = useState('');

  const [cam, setCam] = useState(null);

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['mapList'],
        queryFn: ()=> R_POST('/open-api/mobile/community/list',{"pageNum": 1, "pageSize": 100}),
    })



    // {
    //     "createBy": "",
    //     "createTime": null,
    //     "updateBy": "",
    //     "updateTime": null,
    //     "remark": null,
    //     "id": 15,
    //     "name": "江北新区 AI + 新材料 OPC 社区",
    //     "image": null,
    //     "address": "江苏省南京市江北新区宁六路 606 号新材料国际创新社区 D 栋",
    //     "longitude": 118.7302,
    //     "latitude": 32.2015,
    //     "details": null,
    //     "wantToGoCount": 0,
    //     "visitedCount": 0,
    //     "reviewCount": 0,
    //     "rating": 5,
    //     "status": "0",
    //     "sortOrder": 0
    // }




  const mapRef = useRef(null);

  const LATITUDE = 30;
  const LONGITUDE = 120;

  const initialCamera = {
    center: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
    },
    pitch: 45,
    heading: 90,
    altitude: 3000000,
    zoom: 10,
  };

  const getLoacl = () => {
    mapRef?.current.getCamera().then(res => {
      setCam(res);
    });
  };

  const moveTo =(latitude,longitude)=>{

      console.log(longitude)
      console.log(latitude)

      const camera = {
          center: {
              latitude: latitude,
              longitude: longitude,
          },
          pitch: 45,
          heading: 90,
          altitude: 10000,
          zoom: 10,
      }

      mapRef?.current?.animateCamera(camera,1000)

  }

    if (isPending)return null

    const mapArray = Object.values(data?.data).reduce((acc, curr) => acc.concat(curr), []);

    const DetailCard = () => {

        const {name,address,rating} = mapArray[select]

        //  console.log(data?.data[select])

        return (
            <View
                style={[
                    GStyles.pa,
                    GStyles.ac,
                    {
                        left:10,
                        bottom: 10,
                        width: WINDOW_WIDTH-20,
                        height: 330,
                        justifyContent:'flex-end'
                    },
                ]}
            >
                <View style={{zIndex:2,borderRadius:10,borderColor:'#000',borderWidth:1,position: 'absolute',left:12,top:0,backgroundColor:'#8a8a8a',width:120,height:160}}>

                </View>

                <View style={[GStyles.ph12,{width:'100%',borderRadius:10,backgroundColor:'#fff',height:280}]}>

                    <View style={{alignItems:'flex-end',width:'100%',height:110,backgroundColor:''}} >
                        <View style={{width:WINDOW_WIDTH-180,paddingTop:12,height:110,backgroundColor:''}}>
                            <Text numberOfLines={1} style={{fontSize:30,fontWeight:'600'}}>{name}</Text>
                            <Text numberOfLines={2} style={{fontSize:14}}>{address}</Text>
                        </View>
                    </View>

                    <View style={{width:'100%',marginTop:10,height:100,backgroundColor:''}} >
                        <Text style={{fontSize:14}}>address</Text>
                    </View>

                    <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,{flex:1,gap:12}]}>
                        <TouchableOpacity style={[GStyles.jc,GStyles.ac,{borderRadius:10,backgroundColor:'#000',flex:1,height:44}]} onPress={()=>{

                        }}>
                            <Text style={{color:'#fff'}}>想去</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[GStyles.jc,GStyles.ac,{borderRadius:10,backgroundColor:'#000',flex:1,height:44}]} onPress={()=>{

                        }}>
                            <Text style={{color:'#fff'}}>去过</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[GStyles.jc,GStyles.ac,{borderRadius:10,backgroundColor:'#000',flex:1,height:44}]} onPress={()=>{

                        }}>
                            <Text style={{color:'#fff'}}>评价</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        );
    };


    return (
    <View style={{ flex: 1 }}>
        <TouchableOpacity style={{width:80,height:30,zIndex:9,borderRadius:5,justifyContent:'center',alignItems:'center',position: 'absolute',right:12,backgroundColor:'#fff',top:insets.top+10}} onPress={()=>{
            navigation.push('CommunityList',{list:data?.data,click:(item,index)=>{
                    setSelect(index)
                    moveTo(item?.latitude,item?.longitude)
                    setShowDetail(true);
            }})
        }}>
            <Text>社区列表</Text>
        </TouchableOpacity>

        {Platform.OS == 'ios' && ( <MapView
            style={{ flex: 1 }}
            ref={mapRef}
            onPanDrag={()=>{
                setShowDetail(false)
            }}
            pitchEnabled={false}
            showsCompass={false}
            initialCamera={initialCamera}>
            {mapArray.map((v,index)=>{
                return <Marker
                    key={index}
                    onPress={(e) => {
                        // console.log(e?.nativeEvent)
                        setSelect(e?.nativeEvent?.id)
                        moveTo(e?.nativeEvent?.coordinate?.latitude,e?.nativeEvent?.coordinate?.longitude)
                        setShowDetail(true);
                    }}
                    onSelect={e => {
                        // console.log(e.nativeEvent);
                    }}
                    onCalloutPress={() => {
                        // console.log('onCalloutPress');
                    }}
                    identifier={index+""}
                    coordinate={{ latitude: v.latitude, longitude: v.longitude }}
                />
            })}
        </MapView>)}


      {showDetail && <DetailCard  />}
    </View>
  );
}

export default IndexView;
