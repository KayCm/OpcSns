import {Dimensions, Platform, StyleSheet} from "react-native";

export const WINDOW_WIDTH = Dimensions.get('window').width //这个手机 的屏幕宽度
export const WINDOW_HEIGHT = Dimensions.get('window').height //这个手机 的屏幕高度
export const APP_SCALE = WINDOW_WIDTH / 393
export let NAVIGATOR_HEIGHT = Platform.OS == 'ios' ? appSize(45):appSize(64); //导航栏
export let TRUE_ONE_LINE = StyleSheet.hairlineWidth

export function appSize(num){
    return num ? Math.floor(num * APP_SCALE) : num
}

const STYLE = StyleSheet.create({
    container: {
        height: '100%',
        overflow: 'hidden',
        flex:1,
    },
    ffh1:{
        ...Platform.select({
            ios:{fontFamily:'SourceHanSerifCN-SemiBold'},
            android:{fontFamily:'SourceHanSerifCN-SemiBold-7'}
        }),
        fontSize:appSize(18),
        fontWeight:'500'
    },
    ffh11:{
        ...Platform.select({
            ios:{fontFamily:'SourceHanSerifCN-SemiBold'},
            // android:undefined
            android: {fontWeight:'600'}
        }),
        fontSize:appSize(18),
        fontWeight:'500'
    },

    ffh2:{

    },
    ffh3:{
        ...Platform.select({
            ios:{fontFamily:'SourceHanSerifCN-Medium'},
            android:{fontFamily:'SourceHanSerifCN-Medium-6'}
        }),
        fontSize:appSize(14),
        fontWeight:'500'
    },
    ff:{

    },
    ffsmall:{

    },
    ffssb:{
        ...Platform.select({
            ios:{fontFamily:'SourceHanSerifCN-SemiBold'},
            android:{fontFamily:'SourceHanSerifCN-SemiBold-7'}
        })
    },
    ffb:{
        ...Platform.select({
            ios:{fontFamily:'SourceHanSerifCN-Heavy'},
            android:{fontFamily:'SourceHanSerifCN-Heavy-4'}
        })
    },
    pr: {
        position: 'relative',
    },
    pa: {
        position: 'absolute'
    },
    tc: {
        textAlign: 'center'
    },
    tl: {
        textAlign: 'left'
    },
    tr: {
        textAlign: 'right'
    },
    fb: {
        fontWeight: 'bold'
    },
    displayFlex: {
        display: 'flex'
    },
    flex: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
    ac: {
        alignItems: 'center'
    },
    atBase: {
        alignItems: 'baseline'
    },
    jc: {
        justifyContent: 'center'
    },
    jcBetween: {
        justifyContent: 'space-between'
    },
    flexEnd: {
        justifyContent: 'flex-end'
    },
    ph10: {
        paddingHorizontal: appSize(10)
    },
    ph12: {
        paddingHorizontal: appSize(12)
    },
    ph16: {
        paddingHorizontal: appSize(16)
    },
    ph15: {
        paddingHorizontal: appSize(15)
    },
    ph20: {
        paddingHorizontal: appSize(20)
    },
    ph25: {
        paddingHorizontal: appSize(25)
    },
    ph30: {
        paddingHorizontal: appSize(30)
    },
    pv5: {
        paddingVertical: appSize(5)
    },
    pv6: {
        paddingVertical: appSize(6)
    },
    pv10: {
        paddingVertical: appSize(10)
    },
    pv12: {
        paddingVertical: appSize(12)
    },
    pv15: {
        paddingVertical: appSize(15)
    },
    pv20: {
        paddingVertical: appSize(20)
    },
    pv25: {
        paddingVertical: appSize(25)
    },
    pv30: {
        paddingVertical: appSize(30)
    },
});
export default STYLE
