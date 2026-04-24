import {useState} from "react";
import {R_POST} from "../../../Services/NetRequestService";
import {useDispatch} from "react-redux";
import {updateToken, updateUserInfo} from "../../../Redux/persistedReducer";


export const LoginViewModel = () => {

    const dispatch =  useDispatch()

    const [loginEmail,setLoginEmail] = useState(null)
    const [loginPassword,setLoginPassword] = useState(null)
    const [agree,setAgree] = useState(false)

    const loginAct = async () => {

        let url = '/open-api/mobile/member/login'
        let params = {
            "email": loginEmail,
            "password": loginPassword
        }
        const res = await R_POST(url,params)

        console.log(res)

        if (res?.code == 200 && res?.token){
            dispatch(updateToken(res))
            global.token = res?.token
            getUserInfo()
            return {res:true}
        }else{
            return {res:false,msg:res?.msg}
        }
    }

    const getUserInfo = async () => {
        let url = '/open-api/mobile/member/getMemberInfo'
        const res = await R_POST(url, {})
        if (res?.code == 200 && res?.data){
            dispatch(updateUserInfo(res?.data))
        }
        console.log('userInfo:',res)
    }

    return{
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
        loginAct,
        getUserInfo,
        agree,
        setAgree
    }

}
