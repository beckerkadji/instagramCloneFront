import {initReactQueryAuth} from "react-query-auth";
import { login, loginVerifyOtp, loginResendOtp, getUserProfile } from "../authApi/api";
import LoginType from "../interfaces/Login.type";
import { storage } from "../utils";


const loginFn = async (data : LoginType.loginFields)=> {
    const response = await login(data)
    if(response.data.data.code === 5000){
        storage.setData(response.data.data)
    }
    
    return response
}

const loadUser =  async () => {
    let user = null;

    if(
        storage.getToken() !== null &&
        storage.getToken() !== undefined
    ) {
        const data =  await getUserProfile();
        user = data
    }

    return user
}

const loginVerifyOtpFn = async (data : LoginType.verifyOtp)=>{
    const response = await loginVerifyOtp(data)
    if(response.data.data.code === 5000){
        storage.setData(response.data.data)
    }

    return response.data.data
}

const loginResendOtpFn = async (data: LoginType.loginResendOtp)=>{
    const response = await loginResendOtp(data)
    if(response.data.data.code === 5000){
        storage.setData(response.data.data)
    }
}

const authConfig : any = {
    loadUser,
    loginFn,
    loginVerifyOtpFn,
    loginResendOtpFn
}

const testData = () => {
    return initReactQueryAuth(authConfig);
};

const { AuthProvider, useAuth } = initReactQueryAuth(authConfig);

export {AuthProvider, useAuth, testData};
