import React, {useState} from "react";
import Modal from "react-native-modal";
import {Alert, Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import GStyles, {appSize} from "../../Components/GStyles";
import {R_POST} from "../../Services/NetRequestService";

const starFilled = require('../../Assets/map/score_on.png');
const starOutline = require('../../Assets/map/score_off.png');


export const CommentModal = ({item,isModalVisible,onPress,dismiss}) => {

    if (!item) return null

    // const [show,SetShow] = useState(isModalVisible)
    const [modalNum,setModalNum] = useState(item?.rating)
    const {name,address,image,rating,details,id} = item

    console.log(item)

    const commenting = () => {

        R_POST('/open-api/mobile/community/review',{communityId:id,rating:modalNum}).then(res=>{
            if (onPress)onPress({...item,rating:modalNum})
        })
    }


    return(<Modal style={{margin:0,padding:0}} isVisible={isModalVisible}>
        <View style={{ flex: 1, padding: 0, justifyContent: 'center', alignItems: 'center' }}>
            <ImageBackground source={require('../../Assets/map/commentBg.png')} style={{justifyContent:'flex-end',width:appSize(327),height:appSize(283),backgroundColor:'#fff'}}>

                <View style={[GStyles.jc,GStyles.ac,{flex:1}]}>
                    <Text style={[GStyles.ffh11,{fontSize:appSize(24)}]}>请评价</Text>
                    <Text style={{fontSize:appSize(16),marginTop:appSize(20)}}>{name}</Text>
                    <View style={{flexDirection:'row',marginTop:appSize(20)}}>
                        {[{score:1,text:'很糟糕',icon:''}, {score:2,text:'较差',icon:''}, {score:3,text:'一般',icon:''}, {score:4,text:'还可以',icon:''}, {score:5,text:'很棒',icon:''}].map((score) => (
                            <TouchableOpacity
                                key={score.score}
                                style={[GStyles.jc,GStyles.ac,{width:appSize(50)}]}
                                onPress={() => {
                                    setModalNum(score.score)
                                }}>
                                <Text>{score.text}</Text>
                                <Image
                                    source={score.score <= modalNum ? starFilled : starOutline}
                                    style={{marginTop:appSize(20),width: appSize(32), height: appSize(32) }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        ))}



                    </View>
                </View>


                <TouchableOpacity style={[GStyles.jc,GStyles.ac,{width:'100%',height:appSize(48),backgroundColor:'#A5885F'}]} onPress={()=>{
                    commenting()
                }}>
                    <Text style={[GStyles.ffh11,{color:'#fff',fontSize:appSize(20)}]}>发 布</Text>
                </TouchableOpacity>

            </ImageBackground>
        </View>

        <TouchableOpacity onPress={()=>{
            // setisModalVisible(false)

            if (dismiss)dismiss()

        }} style={[{width:'100%',height:'100%',flex:1,zIndex:-1},GStyles.pa]} />

    </Modal>)

}
