import React, { useEffect }  from "react"
import { useLocation, useNavigate } from "react-router-dom"
import FormOtp from "../components/FormOtp"

function VerifyOtp(){
    
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
        console.log("use effect")
        if( localStorage.getItem('email') == null && localStorage.getItem('token') == null){
            console.log("hello")
            navigate('/login')
          }
    }, [])

    return (
        <FormOtp page={`${location.state?.page}`}/>
    )
}

export default VerifyOtp