import {View, Text, TouchableOpacity, Platform, ImageBackground, Image} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import GStyles, {appSize, WINDOW_WIDTH} from '../../Components/GStyles.ts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useRef, useState } from 'react';
import {R_POST} from "../../Services/NetRequestService";
import {useQuery} from "@tanstack/react-query";
import Rating from "../../Components/Rating";
import {CommentModal} from "./CommentModal";
import {
  CameraPosition as ACameraPosition,
  MapView as AMapView,
  Marker as AMapMarker,
} from '../../Components/amap';


// import {AMapSdk,MapView} from '../../Components/amap'


const starFilled = require('../../Assets/map/score_on.png');
const starOutline = require('../../Assets/map/score_off.png');


function IndexView({navigation}) {

    const insets = useSafeAreaInsets();

    const [showDetail, setShowDetail] = useState(false);
    const [select, setSelect] = useState('');
    const [isModalVisible,setisModalVisible] = useState(false)
    const mapRef = useRef(null);
    const [score, setScore] = useState(3);
    const [nameShow,SetNameShow] = useState(false)

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


    const moveTo =(latitude,longitude)=>{

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

    const { isPending,isLoading, isError, data, error,refetch } = useQuery({
        queryKey: ['mapList'],
        queryFn: ()=> R_POST('/open-api/mobile/community/list',{"pageNum": 1, "pageSize": 100}),
    })

    if (isPending)return null
    if (isLoading)return <Text>Loading</Text>
    if (error) return <Text>{error.message}</Text>

    var mapArray = Object.values(data?.data).reduce((acc, curr) => acc.concat(curr), []);


    const wantGO = (id:string) => {

        R_POST('/open-api/mobile/community/want',{communityId:id}).then(res=>{
            refetch()
        })
    }

    const BeenGo = (id:string) => {
        R_POST('/open-api/mobile/community/visited',{communityId:id}).then(res=>{
            refetch()
        })
    }

    const evaluate = (id,rating) => {
        // /open-api/mobile/community/review

        R_POST('/open-api/mobile/community/visited',{communityId:id,rating:rating}).then(res=>{

        })
    }




    const InfoCard = () => {

    const {name,address,image,rating,details,reviewed,wantToGo,visited,id,visitTime} = mapArray[select]

    console.log(mapArray[select])

    return(<ImageBackground source={require('../../Assets/map/bg.png')} style={[GStyles.pa,{bottom:0,right:0,width:appSize(380),height:appSize(260),overflow:'hidden'}]}>
        <Image source={require('../../Assets/map/topleft.png')} style={[GStyles.pa,{width:appSize(380),height:appSize(260)}]} />

        <View style={[GStyles.jcBetween,{flex:1,backgroundColor:"",paddingHorizontal:appSize(16),paddingTop:appSize(30),paddingBottom:appSize(15)}]}>

            <View style={[GStyles.row,{}]}>

                {image?<Image source={{uri:image}} resizeMode={'contain'} style={{height:appSize(108),width:appSize(80),backgroundColor:'#000'}} />
                    :<Image source={require('../../Assets/icon.png')} resizeMode={'contain'} style={{height:appSize(108),width:appSize(80),backgroundColor:'#000'}} />
                }



                <View style={[GStyles.jcBetween,{flex:1,marginLeft:appSize(12),backgroundColor:''}]}>

                    <Text style={GStyles.ffh1}>{name}</Text>

                    <Rating value={rating} readOnly={true} activeImg={starFilled} inactiveImg={starOutline} size={appSize(20)} gap={appSize(4)}/>

                    <Text numberOfLines={3} style={{fontSize:appSize(14),color:'#8A7E71'}}>{address}</Text>
                </View>
            </View>

            <Text numberOfLines={3} style={{fontSize:appSize(14),lineHeight:appSize(18),color:'#6E6E6E'}}>{details?details:'专注于OPC技术创新与人才培育的专业社区，依托OPC基金会标准体系，人才净流入持续领先聚焦OPC UA、TSN等核心技术的研发与应用，为开发者提供技术培训、项目孵化…'}</Text>


            <View style={[GStyles.row,GStyles.flexEnd,{height:appSize(28),width:'100%',gap:appSize(10)}]}>


                {!visited && (wantToGo?(<View style={[GStyles.row,GStyles.jc,GStyles.ac,{height:appSize(28),gap:appSize(4),width:appSize(76),borderWidth:1,backgroundColor:''}]}>
                    <Image style={{height:appSize(18),width:appSize(18)}} source={require('../../Assets/map/xiangkan1_on.png')} />
                    <Text style={{color:'#000'}}>已想去</Text>
                </View>):(<TouchableOpacity onPress={()=>{
                    wantGO(id)
                }} style={[GStyles.row,GStyles.jc,GStyles.ac,{height:appSize(28),gap:appSize(4),width:appSize(76),backgroundColor:'#000'}]}>
                    <Image style={{height:appSize(18),width:appSize(18)}} source={require('../../Assets/map/xiangkan1.png')} />
                    <Text style={{color:'#fff'}}>想去</Text>
                </TouchableOpacity>))}


                {visited ?(<View style={[GStyles.row,GStyles.jcBetween,GStyles.ac,{paddingHorizontal:appSize(6),height:appSize(28),gap:appSize(4),width:appSize(76*2),borderWidth:1,backgroundColor:''}]}>
                    <View style={[GStyles.row,GStyles.ac]}>
                        <Image style={{height:appSize(18),width:appSize(18)}} source={require('../../Assets/map/xiangkan2_on.png')} />
                        <Text style={{color:'#000'}}>已去过</Text>
                    </View>



                    <Text style={{color:'#A5885F',fontSize:appSize(11)}}>{visitTime.split(' ',1)}</Text>

                </View>):(<TouchableOpacity onPress={()=>{
                    BeenGo(id)
                }} style={[GStyles.row,GStyles.jc,GStyles.ac,{height:appSize(28),gap:appSize(4),width:appSize(76),backgroundColor:'#000'}]}>
                    <Image style={{height:appSize(18),width:appSize(18)}} source={require('../../Assets/map/xiangkan2.png')} />
                    <Text style={{color:'#fff'}}>去过</Text>
                </TouchableOpacity>)}







                {reviewed?(<View  style={[GStyles.row,GStyles.jc,GStyles.ac,{height:appSize(28),gap:appSize(4),width:appSize(76),borderWidth:1,backgroundColor:''}]}>
                    <Image style={{height:appSize(18),width:appSize(18)}} source={require('../../Assets/map/xiangkan3_on.png')} />
                    <Text style={{color:'#000'}}>已评价</Text>
                </View>):(<TouchableOpacity onPress={()=>{
                    setisModalVisible(true)
                }} style={[GStyles.row,GStyles.jc,GStyles.ac,{height:appSize(28),gap:appSize(4),width:appSize(76),backgroundColor:'#000'}]}>
                    <Image style={{height:appSize(18),width:appSize(18)}} source={require('../../Assets/map/xiangkan3.png')} />
                    <Text style={{color:'#fff'}}>评价</Text>
                </TouchableOpacity>)}



            </View>


        </View>



    </ImageBackground>)

    }
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            zIndex: 9,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            backgroundColor: '#fff',
            bottom: insets.bottom + appSize(250),
          }}
          onPress={() => {
            navigation.push('CommunityList', {
              list: data,
              click: item1 => {
                const index = mapArray.findIndex(item => item.id === item1.id);
                setSelect(index);
                if (Platform.OS == 'ios')
                  moveTo(item1?.latitude, item1?.longitude);
                setShowDetail(true);
              },
            });
          }}
        >
          <Image
            style={{ width: appSize(44), height: appSize(44) }}
            source={require('../../Assets/map/listIcon.png')}
          />
        </TouchableOpacity>

        {Platform.OS == 'ios' && (
          <MapView
            style={{ flex: 1 }}
            ref={mapRef}
            onPanDrag={() => {
              setShowDetail(false);
            }}
            pitchEnabled={false}
            showsCompass={false}
            initialCamera={initialCamera}
          >
            {mapArray.map((v, index) => {
              //     return(<Marker
              //         key={index}
              //         style={[GStyles.jc,GStyles.ac]}
              //         coordinate={{ latitude: v.latitude, longitude: v.longitude }}>
              //
              //         {nameShow&& <View style={{width:appSize(200),height:appSize(20),backgroundColor:'#123'}} >
              //
              //         </View>}
              //
              //     <View style={[GStyles.jc,GStyles.ac,{backgroundColor: "#fff", padding: 10,width:appSize(20),height:appSize(20),borderRadius:appSize(10)}]}>
              //         <View style={{backgroundColor:'#A5885F',width:appSize(16),height:appSize(16),borderRadius:appSize(8)}} />
              //     </View>
              // </Marker>)

              return (
                <Marker
                  key={index}
                  onPress={e => {
                    // console.log(e?.nativeEvent)
                    setSelect(e?.nativeEvent?.id);
                    moveTo(
                      e?.nativeEvent?.coordinate?.latitude,
                      e?.nativeEvent?.coordinate?.longitude,
                    );
                    setShowDetail(true);
                  }}
                  onSelect={e => {
                    // console.log(e.nativeEvent);
                  }}
                  onCalloutPress={() => {
                    // console.log('onCalloutPress');
                  }}
                  identifier={index + ''}
                  coordinate={{ latitude: v.latitude, longitude: v.longitude }}
                />
              );

              return (
                <Marker
                  key={index}
                  onPress={e => {
                    // console.log(e?.nativeEvent)
                    setSelect(e?.nativeEvent?.id);
                    moveTo(
                      e?.nativeEvent?.coordinate?.latitude,
                      e?.nativeEvent?.coordinate?.longitude,
                    );
                    setShowDetail(true);
                  }}
                  onSelect={e => {
                    // console.log(e.nativeEvent);
                  }}
                  onCalloutPress={() => {
                    // console.log('onCalloutPress');
                  }}
                  identifier={index + ''}
                  coordinate={{ latitude: v.latitude, longitude: v.longitude }}
                >
                  <Text>123</Text>
                </Marker>
              );
            })}
          </MapView>
        )}

        {/*<InfoCard />*/}

        <AMapView style={{ flex: 1 }} />

        {showDetail && <InfoCard />}
        <CommentModal
          item={mapArray[select]}
          isModalVisible={isModalVisible}
          onPress={item => {
            console.log('CommentModal', item);
            setisModalVisible(false);
            // mapArray[select] = item

            refetch();

            console.log('mapArray', mapArray);
          }}
          dismiss={() => {
            setisModalVisible(false);
          }}
        />
      </View>
    );
}



// const DetailCard = () => {
//
//     const {name,address,rating} = mapArray[select]
//
//     //  console.log(data?.data[select])
//
//     return (
//         <View
//             style={[
//                 GStyles.pa,
//                 GStyles.ac,
//                 {
//                     left:10,
//                     bottom: 10,
//                     width: WINDOW_WIDTH-20,
//                     height: 330,
//                     justifyContent:'flex-end'
//                 },
//             ]}
//         >
//             <View style={{zIndex:2,borderRadius:10,borderColor:'#000',borderWidth:1,position: 'absolute',left:12,top:0,backgroundColor:'#8a8a8a',width:120,height:160}}>
//
//             </View>
//
//             <View style={[GStyles.ph12,{width:'100%',borderRadius:10,backgroundColor:'#fff',height:280}]}>
//
//                 <View style={{alignItems:'flex-end',width:'100%',height:110,backgroundColor:''}} >
//                     <View style={{width:WINDOW_WIDTH-180,paddingTop:12,height:110,backgroundColor:''}}>
//                         <Text numberOfLines={1} style={{fontSize:30,fontWeight:'600'}}>{name}</Text>
//                         <Text numberOfLines={2} style={{fontSize:14}}>{address}</Text>
//                     </View>
//                 </View>
//
//                 <View style={{width:'100%',marginTop:10,height:100,backgroundColor:''}} >
//                     <Text style={{fontSize:14}}>address</Text>
//                 </View>
//
//                 <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,{flex:1,gap:12}]}>
//                     <TouchableOpacity style={[GStyles.jc,GStyles.ac,{borderRadius:10,backgroundColor:'#000',flex:1,height:44}]} onPress={()=>{
//
//                     }}>
//                         <Text style={{color:'#fff'}}>想去</Text>
//                     </TouchableOpacity>
//
//                     <TouchableOpacity style={[GStyles.jc,GStyles.ac,{borderRadius:10,backgroundColor:'#000',flex:1,height:44}]} onPress={()=>{
//
//                     }}>
//                         <Text style={{color:'#fff'}}>去过</Text>
//                     </TouchableOpacity>
//
//                     <TouchableOpacity style={[GStyles.jc,GStyles.ac,{borderRadius:10,backgroundColor:'#000',flex:1,height:44}]} onPress={()=>{
//
//                     }}>
//                         <Text style={{color:'#fff'}}>评价</Text>
//                     </TouchableOpacity>
//                 </View>
//
//             </View>
//
//         </View>
//     );
// };

export default IndexView;
