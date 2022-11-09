import React, { useState, useRef, MutableRefObject } from "react"
import { loginSchema } from "../validations/login.validation"
import { useAuth } from "../lib/auth";
import { useForm } from "react-hook-form"
import { joiResolver} from "@hookform/resolvers/joi"
import LoginType from "../interfaces/Login.type";
import { Link, useNavigate } from "react-router-dom"
import {BiHide, BiShow} from "react-icons/bi"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Login(){
    
    const [isPassword, setIsPassword] = useState(false)
    const [visible, setVisible] = useState(false)
    const inputPassword = useRef() as MutableRefObject<HTMLInputElement>

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
            inputPassword.current.type = "text"
        }else{
            setVisible(false);
            inputPassword.current.type ="password"
        } 
    }

    const {
        register, 
        formState:{ errors },
        handleSubmit
    } = useForm<LoginType.loginFields>({ resolver: joiResolver(loginSchema)})
    const { ref, ...rest} = register("password")
    const navigate = useNavigate()
    const {login, isLoggingIn} = useAuth();

    const onLogin = async (data: any)=>{
       const res: any = await login(data);
       console.log("response login", res)
       if (res.data.code === 5000){
            localStorage.setItem('email', data.email)
            navigate('/verify-otp', {state:{page:"login"}})
       } else{
            console.log("data", res.data)
            toast.error(res.data.message);
       }
    }

    return(
        <section className="w-full h-[115vh] bg-[#fafafa] flex justify-center text-[#262626]">
            <div className="w-[350px] h-[69%] mt-4 flex flex-col justify-between w-full">
                <form onSubmit={handleSubmit(onLogin)} className="bg-white border-[1px] h-[85%]" >
                    <div className="h-[35%] flex justify-center items-center">
                        <p className="logo">APP</p>
                    </div>
                    <div className="border-black flex justify-center ">
                        <div className="form-floating w-[78%] border-[1px] flex justify-center">
                            <input 
                                type='email'
                                placeholder="name@example.com" id="floatingEmail"
                                className="input rounded-sm form-control w-full bg-[#fafafa]"
                                {...register("email")} 
                            /> <label htmlFor="floatingEmail" className="label text-xs text-gray-700 border-2">Email</label>
                        </div>
                    </div>
                    <div className="border-black flex justify-center ">
                        <div className="form-floating w-[78%] border-[1px] flex mt-2 relative justify-center">
                            <input 
                                type='password'
                                placeholder="password" id="floatingPassword"
                                {...rest} 
                                onChange={CheckPassword}
                                ref={(e: any) =>{ref(e); inputPassword.current = e}}
                                className="input rounded-sm form-control w-full bg-[#fafafa]"
                            /> <label htmlFor="floatingPassword" className="label text-xs text-gray-700 border-2 focus:outline-none focus:shadow-none">password</label>
                            <span className={`absolute ${isPassword == false? "hidden":null} right-2 inset-y-1/2`}>{visible == false ? <button onClick={showPassword} className="cursor-pointer"><BiShow /></button> : 
                            <button onClick={showPassword}className="cursor-pointer "><BiHide/></button> }</span>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4 h-8">
                            { isLoggingIn ?
                                <div className="bg-[#0095f6] w-[78%] opacity-60 flex justify-center items-center">
                                    <button disabled className="text-white spinner-border animate-spin inline-block w-6 h-6 rounded-full">
                                        <span className="visually-hidden">Loading...</span>
                                    </button>
                                </div> 
                                :
                                <button className="bg-[#0095f6] rounded-sm font-bold text-sm text-white px-2 w-[78%]">Se connecter</button> 
                            }
                    </div>
                    <div className="text-red-500 translate-y-4 text-[10px] flex flex-col justify-center items-center">
                        {errors.email && <p>{errors.email.message}</p>}
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    
                    <div className="w-full flex justify-center mt-12">
                        <Link to="/" className="w-full flex justify-center"><a><p className="text-xs">Mot de passe oublié ?</p></a></Link>
                    </div>
                </form>
                <div className="bg-white border-[1px] h-[13%] flex justify-center items-center">
                    <p className="text-sm">Vous n'avez pas de compte? <Link to="/register"><a className="text-[#0095f6]">Inscrivez-vous</a></Link></p>
                </div>
            </div>
        </section>
        
    )
}

export default Login