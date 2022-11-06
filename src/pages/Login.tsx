import React from "react"
import { loginSchema } from "../validations/login.validation"
import { useAuth } from "../lib/auth";
import { useForm } from "react-hook-form"
import { joiResolver} from "@hookform/resolvers/joi"
import LoginType from "../interfaces/Login.type";
import { Navigate, useNavigate } from "react-router-dom"


function Login(){

    const {
        register, 
        formState:{ errors },
        handleSubmit
    } = useForm<LoginType.loginFields>({ resolver: joiResolver(loginSchema)})
    const navigate = useNavigate()
    const {login} = useAuth();

    const onLogin = async (data: any)=>{
       const res: any =  await login(data);
       console.log('res', res.data)
       if (res.data.code == 5000){
            localStorage.setItem('email', data.email)
            navigate('/verify-otp')
       }
    }
    // const onLogin = async (data: any)=>{
    //     console.log('res', data)
    //  }

    return(
        <div>
            <form onSubmit={handleSubmit(onLogin)} >
            <input 
                type='email'
                placeholder="example@gmail.com"
                {...register("email")} 
                className="border-2 outline-none"
            />
            {errors.email && <p>{errors.email.message}</p>}
            <input 
                type='password'
                {...register("password")} 
                className="border-2 outline-none"
            />
            {errors.password && <p>{errors.password.message}</p>}
            <button className="bg-black text-slate-100 px-2">Submit</button>
            </form>
            <p className="text-red-700">hello men</p>
        </div>
        
    )
}

export default Login