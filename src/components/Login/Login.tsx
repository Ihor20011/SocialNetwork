import React, { ComponentType } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../common/preloader/formcontrol/formControl";
import { requiredField } from "../../utilits/validators/validatir";
import { connect, useDispatch, useSelector } from "react-redux";
import { LoginThunkCreator } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import style from './login.module.css'
import { createFiald } from "../common/preloader/formcontrol/formControl";
import { AppstateType } from "../../redux/redux-store";
import { AnyAction } from "redux";
type LoginformValuesType={
    email:string,
    password:string,
    rememberMe:boolean,
    captcha:string,
}
type OwnProps={
    captchaUrl:string|null
}
type NameOftheField=Extract <keyof LoginformValuesType,string>///штука которая can help key of the name our loginvalue oblect properties and put them into props name

let LoginForm : React.FC<InjectedFormProps<LoginformValuesType, ///we have to inject our ownprops in injectgenerer
OwnProps>&OwnProps>=({handleSubmit,error,captchaUrl})=>{
    
return(
    <form  onSubmit={handleSubmit} >
        {createFiald<NameOftheField>('login','email',Input,[requiredField])}
        {createFiald<NameOftheField>('password','password',Input,[requiredField],{type:'password'})}
        {createFiald<NameOftheField>('','rememberMe',Input,null,{type:'checkbox'},'remember Me')}
        {captchaUrl&&
         <img src={captchaUrl}/>
        }
        {captchaUrl&& createFiald<NameOftheField>('captcha','captcha',Input,[requiredField])
        }
        { error && <div className={style.formerror}>
            {error}
        </div>}
        <div>
            <button>Submit</button>
        </div>
    </form>
)
}

let ReduxForm=reduxForm<LoginformValuesType,OwnProps>({
    form:'login'
})(LoginForm)

let Loginer:React.FC=()=>{
const islogined=useSelector((state:AppstateType)=>state.auth.islogined)
const captchaUrl=useSelector((state:AppstateType)=>state.auth.captchaUrl)
const dispatch=useDispatch();
   const onSubmit=(formData:LoginformValuesType)=>{
    dispatch(LoginThunkCreator(formData.email,formData.password,formData.rememberMe,formData.captcha) as unknown  as AnyAction)
   }
   if (islogined){
    return <Navigate to={'/profile'}/>
   }
    return(
        <div>
            <h1>Login</h1>
            <ReduxForm  onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}
const mapStateToProps=(state:AppstateType)=>{
    return{
        captchaUrl:state.auth.captchaUrl
    }
}
export default Loginer
