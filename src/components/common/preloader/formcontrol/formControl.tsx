import React from "react";
import style from "./formControl.module.css"
import { Field, WrappedFieldProps } from "redux-form";
import { FieldValidatorsType } from "../../../../utilits/validators/validatir";

export const Textarea :React.FC<WrappedFieldProps>=({input,meta:{touched,error}, ...props})=>{
    const hasEror=touched && error
    return(
        <div className={style.formControl +" "+ ( hasEror? style.error:"") }>
            <textarea  {...input} {...props} />
            <div>
            { hasEror&&
             <span>{error}</span>}
            </div>
        </div>
    )
}
////Text area for dialogs
export const TextAreaDialogs:React.FC<WrappedFieldProps>=({input,meta,...props})=>{
    const hasError=meta.touched&&meta.error
    return(
        <div className={style.formControl +" "+ ( hasError? style.error:"")}>
            <textarea  {...input}  {...props} />
            <div>
                { hasError
                && <span>{meta.error}</span>}
            </div>
        </div>
    )
}
export const Input: React.FC<WrappedFieldProps>=({input,meta ,...props})=>{
    const hasEror=meta.touched && meta.error
    return(
        <div className={style.formControl +" "+ ( hasEror? style.error:"") }>
            <input  {...input} {...props} />
            <div>
            { hasEror&& <span>{meta.error}</span>}
            </div>
        </div>
    )
} 
///placeholder hav to be string or undefined

export function createFiald<StraightNameOfField extends string>(placeholder:string|undefined,
    name:StraightNameOfField, component: React.FC<WrappedFieldProps>,
    validate:Array<FieldValidatorsType>|null,props={},text = ""){
    return (
        <div>
            <Field placeholder={placeholder} 
            name={name}
            component={component}
            validate={validate}
            {...props}
                />{text}
        </div>
    )
}
