
import { stopSubmit } from "redux-form";

import { resulcodeCaptcha,resultcodeSuc } from "../api/userapi";
import { AuthApi } from "../api/authme";
import { SecurityOblect } from "../api/securityApi";
import { ActionsTypeInfern, BaseThunkType } from "./redux-store";
const SET_USER_DATA='samurai/SET_USER_DATA';
const CAPTCHA='CAPTCHA';
let initialState={
    email: null  as string | null ,
    id:null as number|null,
    login:null as string|null,
    islogined:false as boolean|null,
    captchaUrl:null as string|null
}
 type initialStateType= typeof initialState
const autReducer=(state=initialState,action:ActionsType) :initialStateType =>{
    switch(action.type){
        case SET_USER_DATA:{
            return {...state,
                ...action.data
            }
        }
        case CAPTCHA:{
            return {...state,
            captchaUrl:action.url
            }
        }
        default:
            return state
    }
}
type dataobject={
    email:string|null,
    id:number|null,
    login:string|null,
    islogined:boolean|null,
}
type ActionsType= ActionsTypeInfern<typeof actions>

const actions={
    setUserData:(email:string|null,id:number|null,login:string|null,islogined:boolean|null)=>{
        return{ type:SET_USER_DATA,data:{email,id,login,islogined}} as const
    },
    setCaptchaCreator:(url:string)=>{return{type:CAPTCHA, url:url} as const
    }
}
type thunkType=BaseThunkType<ActionsType>//|ReturnType<typeof stopSubmit>>///this way how to add other actions for dispatching
 export const AuthThunkCreator=():thunkType=>{
    return async (dispatch)=>{
            let data = await AuthApi.authMeApi();
            if (data.resultCode==resultcodeSuc.sucsess){ 
                let {email,id,login,}=data.data
                dispatch(actions.setUserData(email,id,login,true))
            }
    }
}
 
export const LoginThunkCreator=(email:string,password:string,rememberMe:boolean,captcha:string):thunkType=>{
     return async (dispatch)=>{
             let responce = await AuthApi.login(email,password,rememberMe,captcha)
             if (responce.data.resultCode===resultcodeSuc.sucsess){
                 dispatch(AuthThunkCreator())
             }
             else{
                if (responce.data.resultCode==resulcodeCaptcha.captcha){
                     dispatch(CaptchaThinkCreator())
                }
                let message=responce.data.messages.length>0 ? responce.data.messages[0]:'some error'
                //@ts-ignore
                dispatch(stopSubmit('login',{_error:message}));
             }
     }
}

export const logOutThunkCreator=():thunkType=>{
    return async (dispatch)=>{
         let responce= await AuthApi.logout()
         dispatch(actions.setUserData(null,null,null,false));
    }
}

export const CaptchaThinkCreator=():thunkType=>{
    return async(dispatch)=>{
        let responce = await SecurityOblect.getcaptcha();
        let url=responce.data.url;
        dispatch(actions.setCaptchaCreator(url))
    }
}
export default autReducer

