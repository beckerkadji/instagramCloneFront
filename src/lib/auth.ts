import {initReactQueryAuth} from "react-query-auth";
import { login, register, logoutUser, loginVerifyOtp, loginResendOtp, getUserProfile } from "../authApi/api";
import LoginType from "../interfaces/Login.type";
import RegisterType from "../interfaces/Register.type";
import VerifyOptType from "../interfaces/VerifyOtp.type";
import { storage } from "../utils";


const loginFn = async (data : LoginType.loginFields)=> {
    const response = await login(data)
    if(response.data.data.code === 5000){
        storage.setData(response.data.data)
    }
    
    return response
}

const registerFn = async (data: RegisterType.registerFields) => {
    const response = await register(data)
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

const loginVerifyOtpFn = async (data : VerifyOptType.verifyOtp)=>{
    const response = await loginVerifyOtp(data)
    if(response.data.data.code === 5000){
        storage.setData(response.data.data)
    }

    return response.data.data
}

const loginResendOtpFn = async (data: VerifyOptType.ResendOtp)=>{
    const response = await loginResendOtp(data)
    if(response.data.data.code === 5000){
        storage.setData(response.data.data)
    }
}

const logoutFn = async (data: string)=>{
    const response = await logoutUser(data)
    return response
}

const authConfig : any = {
    loadUser,
    loginFn,
    registerFn,
    logoutFn,
    loginVerifyOtpFn,
    loginResendOtpFn
}

const testData = () => {
    return initReactQueryAuth(authConfig);
};

const { AuthProvider, useAuth } = initReactQueryAuth(authConfig);

export {AuthProvider, useAuth, testData};
