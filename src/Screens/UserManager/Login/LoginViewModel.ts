import {useState} from "react";


export const LoginViewModel = () => {

    const [loginEmail,setLoginEmail] = useState()
    const [loginPassword,setLoginPassword] = useState()

    const loginAct = async () => {
        // const url = 'https://api.freeapi.app/api/v1/users/login';
        const url = 'https://vps-sg-aws-opc.43046721.xyz/open-api/mobile/register/sendEmailCode';

        const options = {
            method: 'POST',
            headers: {accept: 'application/json', 'content-type': 'application/json'},
            body: '{"email":"123@456.com","username":"doejohn"}'
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return{
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
        loginAct
    }

}
