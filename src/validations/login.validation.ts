import { schema } from "../utils";
import Joi from 'joi'

export const loginSchema = Joi.object({
    email : schema.email,
    password : schema.loginPassword
})

export const verifyOtpSchema = Joi.object({
    email : schema.email,
    otp: schema.otp
})