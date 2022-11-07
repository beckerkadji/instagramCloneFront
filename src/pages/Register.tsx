import React, { MutableRefObject, useRef, useState } from "react"
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm} from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../lib/auth";
import {BiHide, BiShow} from "react-icons/bi"
import { registerSchema } from "../validations/register.validation";
import RegisterType from "../interfaces/Register.type";

function Register(){

    const [isPassword, setIsPassword] = useState(false)
    const [visible, setVisible] = useState(false)
    const inputPassword= useRef() as MutableRefObject<HTMLInputElement>

    const CheckPassword = (e: any)=>{
        if(e.target.value === null || e.target.value === undefined || e.target.value === ''){
            setIsPassword(false)
        } else {
            setIsPassword(true)
        }
    }

    const showPassword = (e: any) => {
        e.preventDefault();
        if(inputPassword.current.type === "password"){
            setVisible(true); 
            inputPassword.current.type ="text"
        }else{
            setVisible(false);
            inputPassword.current.type ="password"
        } 
    }

    const {
        register: register2, 
        formState:{ errors },
        handleSubmit
    } = useForm<RegisterType.registerFields>({ resolver: joiResolver(registerSchema)})
    const navigate = useNavigate()
    const {register} = useAuth();

    const onRegister = async (data: any) =>{
        const res: any =  await register(data);
        console.log("data", data)
        if (res.data.code == 5000){
            localStorage.setItem('email', data.email)
            navigate('/verify-otp')
       }
    }

    return(
        <section className="w-full h-[125vh] bg-[#fafafa] flex justify-center text-[#262626]">
            <div className="w-[350px] h-[69%] mt-4 flex flex-col justify-between w-full">
                <form onSubmit={handleSubmit(onRegister)} className="bg-white border-[1px] h-[85%]" >
                    <div className="h-[25%] flex justify-center items-center">
                        <p className="logo">APP</p>
                    </div>
                    <div className="border-black flex justify-center ">
                        <div className="form-floating w-[78%] border-[1px] flex justify-center">
                            <input 
                                type='text'
                                id="floatingfullName" placeholder="Full Name"
                                className="input rounded-sm form-control w-full bg-[#fafafa]"
                                {...register2("fullName")} 
                            /> <label htmlFor="floatingfullName" className="label text-xs text-gray-700 border-2">Full Name</label>
                        </div>
                    </div>
                    <div className="border-black flex justify-center ">
                        <div className="form-floating w-[78%] border-[1px] mt-2 flex justify-center">
                            <input 
                                type='text'
                                id="floatingUserName" placeholder="Username"
                                className="input rounded-sm form-control w-full bg-[#fafafa]"
                                {...register2("userName")} 
                            /> <label htmlFor="floatingUserName" className="label text-xs text-gray-700 border-2">User Name</label>
                        </div>
                    </div>
                    <div className="border-black flex justify-center ">
                        <div className="form-floating w-[78%] border-[1px] mt-2 flex justify-center">
                            <input 
                                type='email'
                                placeholder="name@example.com" id="floatingEmail"
                                className="input rounded-sm form-control w-full bg-[#fafafa]"
                                {...register2("email")} 
                            /> <label htmlFor="floatingEmail" className="label text-xs text-gray-700 border-2">Email</label>
                        </div>
                    </div>
                    <div className="border-black flex justify-center ">
                        <div className="form-floating w-[78%] border-[1px] flex mt-2 relative justify-center">
                            <input 
                                type='password' placeholder="password"
                                {...register2("password")} 
                                onChange={CheckPassword}
                                ref={inputPassword}
                                className="input rounded-sm form-control w-full bg-[#fafafa]" id="floatingPassword"
                            /> <label htmlFor="floatingPassword" className="label text-xs text-gray-700 border-2 focus:outline-none focus:shadow-none">password</label>
                            <span className={`absolute ${isPassword == false? "hidden":null} right-2 inset-y-1/2`}>{visible == false ? <button onClick={showPassword} className="cursor-pointer"><BiShow /></button> : 
                            <button onClick={showPassword}className="cursor-pointer "><BiHide/></button> }</span>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4 h-8">
                        <button className="bg-[#0095f6] rounded-sm font-bold text-sm text-white px-2 w-[78%]">S'Inscrire</button>
                    </div>
                    <div className="text-red-500 translate-y-4 flex justify-center items-center">
                        {errors.email && <span>{errors.email.message}</span>}
                        {errors.password && <span>{errors.password.message}</span>}
                        {errors.fullName && <span>{errors.fullName.message}</span>}
                        {errors.userName && <span>{errors.userName.message}</span>}
                    </div>
                    
                </form>
                <div className="bg-white border-[1px] h-[13%] flex justify-center items-center">
                    <p className="text-sm">Vous avez déjà un compte? <Link to="/"><a className="text-[#0095f6]">Connectez-vous</a></Link></p>
                </div>
            </div>
            
        </section>
        
    )
}

export default Register