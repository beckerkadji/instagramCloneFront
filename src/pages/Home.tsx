import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { useAuth } from "../lib/auth";
import { storage } from "../utils"


function Home () {

    const {logout} = useAuth();
    const token: any = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(()=>{
        if( localStorage.getItem('token') === null && localStorage.getItem('token') === undefined ){
            navigate('/')
          }
    }, [])
    
    
    const logoutFn = async ()=>{
        const res = await logout(token)
        if (res.data.code === 5000){
            storage.clearData()
            navigate('/')
        }else{
            toast.error(res.data.message)
        }
    }
    return (
        <>
            Home Page
            <p>{localStorage.getItem('token')}</p>
            <p>{localStorage.getItem('roleId')}</p>
            <button onClick={()=> logoutFn()}>Logout</button>
        </>
    )
}

export default Home