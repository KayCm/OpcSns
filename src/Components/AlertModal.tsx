import React, {useState} from "react";
import Modal from "react-native-modal";
import {Alert, Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import GStyles, {appSize} from "./GStyles";

function AlertModal({isModalVisible,title='操做',onDismiss}) {



    return(<Modal style={{margin:0,padding:0}} isVisible={isModalVisible}>
        <View style={{ flex: 1, padding: 0, justifyContent: 'center', alignItems: 'center' }}>

            <View style={[GStyles.jc,GStyles.ac,{height:appSize(200),width:appSize(326),backgroundColor:'#fff'}]}>

                <Text style={[GStyles.ffh11,{fontSize:appSize(20)}]}>{title}</Text>

                <TouchableOpacity onPress={()=>{
                    if (onDismiss)onDismiss()
                }} style={[GStyles.jc,GStyles.ac,{marginTop:appSize(30),backgroundColor:"#A5885F",height:appSize(40),width:appSize(120)}]}>
                    <Text style={{color:'#fff'}}>确定</Text>
                </TouchableOpacity>

            </View>
        </View>
    </Modal>)



}

export default AlertModal
