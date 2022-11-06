import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { logoutUser } from "../authApi/api";
import { useAuth } from "../lib/auth";
import { storage } from "../utils"


function Home () {

    const {logout} = useAuth();
    const token: any = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(()=>{
        if( localStorage.getItem('token') == null && localStorage.getItem('token') == undefined ){
            navigate('/')
          }
    }, [])
    
    
    const logoutFn = async ()=>{
        const res = await logoutUser(token)
        console.log(res)
        if (res.data.code == 5000){
            storage.clearData()
            navigate('/')
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