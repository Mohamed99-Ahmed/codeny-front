type submitType  = {
    name: string;
    email: string;
    phone: string;
    password: string;
    rePassword: string;
    location: string;
}
type loginType  = {
    email: string;
    password: string;
}
type forgetPasswordType = {
    email: string
}
type resetPasswordType  = {
    token:string,
    password: string;
    rePassword: string;
}
type payload = {
    exp: number,
    iat: number, 
    id: string,
    name: string,
    role: string
}

export type { submitType,loginType, forgetPasswordType,resetPasswordType,payload };