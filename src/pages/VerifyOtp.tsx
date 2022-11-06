import { joiResolver } from "@hookform/resolvers/joi"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {useNavigate } from "react-router-dom"
import { loginResendOtp, loginVerifyOtp } from "../authApi/api"
import LoginType from "../interfaces/Login.type"
import { storage } from "../utils"
import { verifyOtpSchema } from "../validations/login.validation"

function VerifyOtp(){
    const navigate = useNavigate()
    useEffect(()=>{
        if( localStorage.getItem('email') == null && localStorage.getItem('token') == null ){
            navigate('/')
          }
    }, [])

    const [disabled, setDesabled] = useState(true)
    const [email, setEmail] = useState('')
    

    const {
        handleSubmit,
        formState: {errors},
        register,
    } = useForm<LoginType.verifyOtp>({ resolver : joiResolver(verifyOtpSchema)})

    const onVerifyOtp = async (data : any) =>{
        const res: any = await loginVerifyOtp(data)
        setEmail(data.email)
        setDesabled(false)
        console.log(res.data.code)
        if (res.data.code == 5000){
            const userdata = Object.entries(res.data.data)
            console.log(userdata)
            storage.setData(userdata)
            navigate('/home')
        }

    }

    const resend =  async () =>{
        const res =  await loginResendOtp({email})
        setDesabled(true)
        console.log(res)
    }

    return (
        <>
            <div>
                Verify OTP Page
                <form onSubmit={handleSubmit(onVerifyOtp)}>
                    <input 
                        type='email'
                        value={localStorage.getItem('email') || ''}
                        {...register("email")} 
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                    <input 
                        type='number'
                        {...register("otp")} 
                    />
                    {errors.otp && <p>{errors.otp.message}</p>}
                    <button>Submit</button>
                </form>
                <button disabled={disabled} onClick={() => resend()}>Resend OTP</button>
            </div>
            
        </>
    )
}

export default VerifyOtp