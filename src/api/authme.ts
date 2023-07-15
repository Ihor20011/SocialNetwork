
import { instance } from "./api"
import { responceType } from "./api"
type meResponceType={
    id:number,
    email:string,
    login:string,
}
type LoginType={
    id:number
}
export enum resulcodeCaptcha{
    captcha=10
 }
export enum resultcodeSuc {
    sucsess=0,
    error=1
 }
export const AuthApi={
    authMeApi(){
        return instance.get<responceType<meResponceType,resultcodeSuc>>(`auth/me`).then((responce)=>{
            return responce.data
        })
    },
    login(email:string,password:string,rememberMe:boolean,captcha:string){
        return instance.post<responceType<LoginType,resultcodeSuc | resulcodeCaptcha >>('/auth/login',{email,password,rememberMe,captcha})
    },
    logout(){
        return instance.delete('/auth/login')
    }
}