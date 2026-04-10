import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { appSize, WINDOW_WIDTH } from '../../../Components/GStyles.ts';
import { Image, TouchableOpacity, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import { useState } from 'react';

export const ImageBox = ({data}) => {
  const [showModal, setShowModal] = useState(false);
  const [images,setImages] = useState([])

  if (data?.data?.contentType == 'image'){
      return  null
  }else{
    var arr = [];
    data?.data?.medias.map((value,index)=>{
      arr.push({uri:value?.fileUrl})
    })
    console.log('arr',arr)
    setImages(arr)
  }

  return (
    <View>
      <SwiperFlatList
        autoplay={true}
        autoplayDelay={5}
        autoplayLoop
        loop
        style={{
          width: WINDOW_WIDTH - appSize(100),
          borderRadius: appSize(5),
          marginTop: appSize(10),
          height: appSize(200),
        }}
        getItemLayout={(data, index) => ({
          length: WINDOW_WIDTH - appSize(100),
          offset: (WINDOW_WIDTH - appSize(100)) * index,
          index: index,
        })}
        // showPagination
        data={data?.data?.medias}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setShowModal(true);
            }}
          >
            <Image
              source={{ uri: item?.fileUrl }}
              // resizeMode={'c'}
              style={{
                backgroundColor: '#123',
                height: appSize(200),
                width: WINDOW_WIDTH - appSize(100),
              }}
            />
          </TouchableOpacity>
        )}
      />

      <ImageView
        images={images}
        imageIndex={0}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      />
    </View>
  );
}
