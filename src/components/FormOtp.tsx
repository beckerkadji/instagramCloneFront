import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import VerifyOptType from "../interfaces/VerifyOtp.type";
import { joiResolver } from "@hookform/resolvers/joi";
import { verifyOtpSchema } from "../validations/verifyOtp.validation";
import { storage } from "../utils";
import { loginResendOtp, loginVerifyOtp, registerResendOtp, registerVerifyOpt } from "../authApi/api";
import { useMutation } from "react-query";
import {toast} from "react-toastify"



function FormOtp (props: any){

    const fromPage = props.page
    const [disabled, setDesabled] = useState(true)
    const [email, setEmail] = useState('')
    const localEmail : any = localStorage.getItem('email')
    
    const navigate = useNavigate()
    useEffect(()=>{
        if( localStorage.getItem('email') === null && localStorage.getItem('token') === null && (fromPage === undefined || fromPage === null || fromPage === "")){
            navigate('/')
          }
    }, [])

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<VerifyOptType.verifyOtp>({ resolver: joiResolver(verifyOtpSchema)})

    const {isLoading: isresentOtpRegister, mutateAsync: mutateAsyncRegisterResentOpt} = useMutation(async (data: any) =>{
        const res =  await registerResendOtp({email})
        setDesabled(true)
        console.log(res)
        return res
    })
    const registerResend =  async (data: any) =>{
        const res = await mutateAsyncRegisterResentOpt(data)
        if(res.data.code === 5000){
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message);
        }
    }

    const {isLoading: isresentOtpLogin, mutateAsync: mutateAsyncLoginResentOpt} = useMutation(async (data: any) =>{
        const res =  await loginResendOtp({email})
        setDesabled(true)
        console.log(res)

        return res
    })
    const loginResend =  async (data: any) =>{
        const res = await mutateAsyncLoginResentOpt(data) 
        if(res.data.code === 5000){
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message);
        }   
    }

    const {isLoading: isloadingVerifyOtp, mutateAsync: mutateAsyncLoginVerify} = useMutation(async (data: any)=>{
        const res: any = await loginVerifyOtp(data)
        setEmail(data.email)
        setDesabled(false)
        console.log(res.data)
        if (res.data.code === 5000){
            const userdata = Object.entries(res.data.data)
            console.log(userdata)
            storage.setData(userdata)
            navigate('/home')
        }
        return res
    })
    const onLoginVerifyOtp = async (data : any) =>{
        const res = await mutateAsyncLoginVerify(data)
        if(res.data.code === 5000){
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message);
        }
    }

    const { isLoading: isLoadingRegisterVerifyOtp, mutateAsync: mutateAsyncRegisterVerifyOtp} = useMutation(async (data:any) => {
        const res: any = await registerVerifyOpt(data)
        setEmail(data.email)
        setDesabled(false)
        console.log(res.data.code)
        if (res.data.code === 5000){
            const userdata = Object.entries(res.data.data)
            console.log(userdata)
            storage.setData(userdata)
            navigate('/')
        }

        return res
    })
    const onRegisterVerifyOtp = async (data: any) =>{
       const res=  await mutateAsyncRegisterVerifyOtp(data)
       if(res.data.code === 5000){
        toast.success(res.data.message)
    } else {
        toast.error(res.data.message);
    }
    }

    return(
        <section className="w-full h-[115vh] bg-[#fafafa] flex justify-center text-[#262626]">
        <div className="w-[350px] h-[69%] mt-4 flex flex-col justify-between w-full">
            { fromPage === 'login' ? 
                <form onSubmit={handleSubmit(onLoginVerifyOtp)} className="bg-white border-[1px] h-[85%]" >
                    <div className="h-[35%] flex justify-center items-center">
                        <p className="logo">APP</p>
                    </div>
                    <div className="flex w-full text-sm mb-8 justify-center items-center">
                        <p className="text-center">Saisir le code envoyé à l'adresse:<br/> <span className="font-bold">{localEmail}</span></p>
                    </div>
                    
                    <div className="border-black flex justify-center hidden">
                        <div className="form-floating w-[78%] border-[1px] flex justify-center">
                            <input 
                                type='email'
                                placeholder="name@example.com" id="floatingEmail"
                                className="input rounded-sm form-control w-full bg-[#fafafa]"
                                value={localEmail}
                                {...register("email")} 
                            /> <label htmlFor="floatingEmail" className="label text-xs text-gray-700 border-2">Email</label>
                        </div>
                    </div>
                    <div className="border-black flex mt-2 justify-center ">
                        <div className="form-floating w-[78%] border-[1px] flex justify-center">
                            <input 
                                type='number'
                                placeholder="otp" id="floatingOtp"
                                className="input rounded-sm form-control w-full bg-[#fafafa]"
                                {...register("otp")} 
                            /> <label htmlFor="floatingOtp" className="label text-xs text-gray-700 border-2">Otp</label>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4 h-8">
                            {  isloadingVerifyOtp ?
                                <div className="bg-[#0095f6] w-[78%] opacity-60 flex justify-center items-center">
                                    <button disabled className="text-white spinner-border animate-spin inline-block w-6 h-6 rounded-full">
                                        <span className="visually-hidden">Loading...</span>
                                    </button>
                                </div> 
                                :
                                <button disabled={isresentOtpLogin ? true: false} className={` ${isresentOtpLogin ? "opacity-60": null} bg-[#0095f6] rounded-sm font-bold text-sm text-white px-2 w-[78%]`}>Verifier</button> 
                            }
                    </div>
                    <div className="text-red-500 translate-y-4 flex mb-4 justify-center items-center">
                        {errors.email && <span>{errors.email.message}</span>}
                        {errors.otp && <span>{errors.otp.message}</span>}
                    </div>
                    <div className="flex justify-center text-xs translate-y-4">
                        {  isresentOtpLogin ?
                            <button disabled className="text-[#0095f6] spinner-border animate-spin inline-block w-6 h-6 rounded-full">
                                <span className="visually-hidden">Loading...</span>
                            </button>
                            :
                            <button disabled={disabled} onClick={loginResend} className= "cursor-pointer text-[#0095f6]">Resend OTP</button>
                        }
                    </div>
                </form> : 
                <form onSubmit={handleSubmit(onRegisterVerifyOtp)} className="bg-white border-[1px] h-[85%]" >
                    <div className="h-[35%] flex justify-center items-center">
                        <p className="logo">APP</p>
                    </div>
                    <div className="flex w-full text-sm mb-8 justify-center items-center">
                        <p className="text-center">Saisir le code envoyé à l'adresse:<br/> <span className="font-bold">{localEmail}</span></p>
                    </div>
                    
                    <div className="border-black flex justify-center hidden">
                        <div className="form-floating w-[78%] border-[1px] flex justify-center">
                            <input 
                                type='email'
                                placeholder="name@example.com" id="floatingEmail"
                                className="input rounded-sm form-control w-full bg-[#fafafa]"
                                value={localEmail}
                                {...register("email")} 
                            /> <label htmlFor="floatingEmail" className="label text-xs text-gray-700 border-2">Email</label>
                        </div>
                    </div>
                    <div className="border-black flex mt-2 justify-center ">
                        <div className="form-floating w-[78%] border-[1px] flex justify-center">
                            <input 
                                type='number'
                                placeholder="otp" id="floatingOtp"
                                className="input rounded-sm form-control w-full bg-[#fafafa]"
                                {...register("otp")} 
                            /> <label htmlFor="floatingOtp" className="label text-xs text-gray-700 border-2">Otp</label>
                        </div>
                    </div>
                    
                    <div className="flex justify-center mt-4 h-8">
                            {  isLoadingRegisterVerifyOtp?
                                <div className="bg-[#0095f6] w-[78%] opacity-60 flex justify-center items-center">
                                    <button disabled className="text-white spinner-border animate-spin inline-block w-6 h-6 rounded-full">
                                    <span className="visually-hidden">Loading...</span>
                                    </button>
                                </div> 
                                :
                                <button className="bg-[#0095f6] rounded-sm font-bold text-sm text-white px-2 w-[78%]">Verifier</button> 
                            }
                    </div>
                    <div className="text-red-500 translate-y-4 flex justify-center items-center">
                        {errors.email && <span>{errors.email.message}</span>}
                        {errors.otp && <span>{errors.otp.message}</span>}
                    </div>
                    <div className="flex justify-center text-xs translate-y-4">
                        {  isresentOtpRegister ?
                            <button disabled className="text-[#0095f6] spinner-border animate-spin inline-block w-6 h-6 rounded-full">
                                <span className="visually-hidden">Loading...</span>
                            </button>
                            :
                            <button disabled={disabled} onClick={registerResend} className= "cursor-pointer text-[#0095f6]">Resend OTP</button>
                        }
                    </div>
                </form>
            }



        </div>
        
    </section>
    )
}

export default FormOtp