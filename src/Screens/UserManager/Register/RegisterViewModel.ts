import {useState} from "react";
import {R_POST} from "../../../Services/NetRequestService";

export const RegisterViewModel = () => {

    const [nickName,setNickName] = useState('abc123')
    const [password,setPassword] = useState('123456')
    const [email,setEmail] = useState('1@2.com')
    const [code,setCode] = useState('1234')
    const [invCode,setInvCode] = useState('INV123456')

    async function sendVerificationCode() {

        const url = '/open-api/mobile/register/sendEmailCode';
        const res = await R_POST(url, {email: "zhangsan@example.com"})

        if (res?.code == 200){
            return true
        }
        return false;
    }

    const submitRegister = async () => {

        // /open-api/mobile/register/registerByEmail
        const url = '/open-api/mobile/register/registerByEmail';
        let params = {
            "username": nickName,
            "password": password,
            "email": email,
            "code": code,
            "inviteCode": invCode
        }
        const res = await R_POST(url, params)

        console.log('res',res)

    }

    return{
        nickName,
        setNickName,
        password,
        setPassword,
        email,
        setEmail,
        code,
        setCode,
        invCode,
        setInvCode,
        sendVerificationCode,
        submitRegister
    }
}
