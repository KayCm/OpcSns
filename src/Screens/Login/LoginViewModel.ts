import {useState} from "react";


export const LoginViewModel = () => {

    const [loginEmail,setLoginEmail] = useState()
    const [loginPassword,setLoginPassword] = useState()

    const loginAct = async () => {
        const url = 'https://api.freeapi.app/api/v1/users/login';

        const options = {
            method: 'POST',
            headers: {accept: 'application/json', 'content-type': 'application/json'},
            body: '{"password":"test@123","username":"doejohn"}'
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
