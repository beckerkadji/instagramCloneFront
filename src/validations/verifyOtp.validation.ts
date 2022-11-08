import { schema } from "../utils";
import Joi from 'joi'


export const verifyOtpSchema = Joi.object({
    email : schema.email,
    otp: schema.otp
})