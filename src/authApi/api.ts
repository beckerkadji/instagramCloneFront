import axios from 'axios'
import LoginType from "../interfaces/Login.type"
import RegisterType from '../interfaces/Register.type'
import VerifyOptType from '../interfaces/VerifyOtp.type'
import { storage } from '../utils'

export const login = async (data: LoginType.loginFields)=>{
    let res: any = await axios.post(`${<string>process.env.REACT_APP_AUTH_SERVICE_URL}/login`, data)
    return res
}

export const register = async (data: RegisterType.registerFields) => {
    let res: any = await axios.post(`${<string>process.env.REACT_APP_AUTH_SERVICE_URL}/register`, data)
    return res
}

export const loginVerifyOtp = async (data: VerifyOptType.verifyOtp) =>{
    return await axios.post(`${<string>process.env.REACT_APP_AUTH_SERVICE_URL}/login/verifyotp`, data)
}

export const loginResendOtp = async (data: VerifyOptType.ResendOtp) =>{
    return await axios.post(`${<string>process.env.REACT_APP_AUTH_SERVICE_URL}/login/resentotp`, data)
}

export const registerVerifyOpt = async (data: VerifyOptType.verifyOtp) =>{
    return await axios.post(`${<string>process.env.REACT_APP_AUTH_SERVICE_URL}/register/validateEmail`, data)
}

export const registerResendOtp = async (data: VerifyOptType.ResendOtp) =>{
    return await axios.post(`${<string>process.env.REACT_APP_AUTH_SERVICE_URL}/register/resentotp`, data)
}

export const logoutUser = async (token: string) => {
    return await axios.get(`${<string>process.env.REACT_APP_AUTH_SERVICE_URL}/logout`,
    {
        headers:{
            "Authorization": token
        }
    })
}

export const getUserProfile = async () => {
    if(
        storage.getToken() !== null &&
        storage.getToken() !== undefined
    ) {
        let allData : any = []
        let keys = Object.keys(localStorage)
        let i = keys.length

        while (i--){
            allData.push(localStorage.getItem(keys[i]));
        }
        return allData;
    }
}