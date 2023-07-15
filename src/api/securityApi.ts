import { instance } from "./api"
type getcaptcha={
    url:string
}
export const  SecurityOblect={
    getcaptcha(){
        return instance.get<getcaptcha>('security/get-captcha-url')
    }
}