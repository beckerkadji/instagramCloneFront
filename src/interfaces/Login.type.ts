namespace LoginType {

    export interface loginFields{
        email: string,
        password: string
    }
    export interface verifyOtp {
        email: string,
        otp: number
    }
    export interface loginResendOtp {
        email: string
    }
}

export default LoginType