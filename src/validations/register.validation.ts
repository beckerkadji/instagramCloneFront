import { schema } from "../utils";
import Joi from 'joi'

export const registerSchema = Joi.object({
    fullName : schema.fullName,
    userName: schema.userName,
    email: schema.email,
    tel: schema.tel,
    password : schema.password
})

export const verifyOtpSchema = Joi.object({
    email : schema.email,
    otp: schema.otp
})