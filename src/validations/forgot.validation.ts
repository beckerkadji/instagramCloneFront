import { schema } from "../utils";
import Joi from 'joi'

export const forgotPasswordSchema = Joi.object({
    email : schema.email,
})