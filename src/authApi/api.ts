import axios from 'axios'
import LoginType from "../interfaces/Login.type"
import { storage } from '../utils'

export const login = async (data: LoginType.loginFields)=>{
    console.log("data is :",data)
    let res: any = await axios.post(`${<string>process.env.REACT_APP_AUTH_SERVICE_URL}/login`, data)
    console.log('Login', res )
    return res
}

export const loginVerifyOtp = async (data: LoginType.verifyOtp) =>{
    return await axios.post(`${<string>process.env.REACT_APP_AUTH_SERVICE_URL}/login/verifyotp`, data)
}

export const loginResendOtp = async (data: LoginType.loginResendOtp) =>{
    return await axios.post(`${<string>process.env.REACT_APP_AUTH_SERVICE_URL}/login/resentotp`, data)
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