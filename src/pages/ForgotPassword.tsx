import { joiResolver } from "@hookform/resolvers/joi"
import React from "react"
import {useForm } from "react-hook-form"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { forgotPassword } from "../authApi/api"
import ForgotPasswordType from "../interfaces/ForgotPassword.type"
import { forgotPasswordSchema } from "../validations/forgot.validation"
import { CiLock } from "react-icons/ci"

function ForgotPassword(){
    
    const {
        register, 
        formState:{ errors },
        handleSubmit
    } = useForm<ForgotPasswordType.ForgotPasswordField>({ resolver: joiResolver(forgotPasswordSchema)})
    const navigate = useNavigate()

    const {isLoading, mutateAsync} = useMutation( async (data: any) =>{
       const res: any = await forgotPassword(data);

       if (res.data.code === 5000){
            localStorage.setItem('email', data.email)
            navigate('/login', {state:{email: data.email}})
       } else{
            console.log("data", res.data)
            toast.error(res.data.message);
       }
       return res
    })

    const onForgotPassword = async (data: any)=>{
        const res = await mutateAsync(data)
        if(res.data.code === 5000){
            toast.success(res.data.message)
        } 
    }

    return(
        <section className="w-full h-[100vh] bg-[#fafafa] flex justify-center items-center text-[#262626]">
            <div className="w-[350px] h-[500px]  mt-4 flex flex-col justify-between w-full">
                <form onSubmit={handleSubmit(onForgotPassword)} className="bg-white border-[1px] h-[85%] flex flex-col" >
                    <div className="h-[35%] flex justify-center items-center">
                        <p className="border-2 border-[#0095f6] w-20 h-20 rounded-full flex justify-center items-center text-3xl text-[#0095f6]"><CiLock/></p>
                    </div>
                    <div className="flex w-2/3 text-sm mb-8 justify-center self-center">
                        <p className="text-center">Saisir votre email pour recevoir un nouveau mot de passe<br/></p>
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
                    <div className="flex justify-center mt-4 h-8">
                            { isLoading ?
                                <div className="bg-[#0095f6] w-[78%] opacity-60 flex justify-center items-center">
                                    <button disabled className="text-white spinner-border animate-spin inline-block w-6 h-6 rounded-full">
                                        <span className="visually-hidden">Loading...</span>
                                    </button>
                                </div> 
                                :
                                <button className="bg-[#0095f6] rounded-sm font-bold text-sm text-white px-2 w-[78%]">Envoyer</button> 
                            }
                    </div>
                    <div className="text-red-500 translate-y-4 text-[10px] flex flex-col justify-center items-center">
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>          
                </form>
                <div className="bg-white border-[1px] h-[13%] flex justify-center items-center">
                    <p className="text-sm"><Link to="/"><a className="text-[#0095f6]">Revenir à la page de connexion</a></Link></p>
                </div>
            </div>
        </section>
        
    )
}

export default ForgotPassword