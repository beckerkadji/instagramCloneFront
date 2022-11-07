namespace RegisterType{
    
    export interface registerFields{
        fullName: string;
        userName: string;
        email: string;
        tel?: string;
        password: string
    }

    export interface verifyOtp {
        email: string,
        otp: number
    }

    export interface registerResendOtp {
        email: string
    }
}

export default RegisterType