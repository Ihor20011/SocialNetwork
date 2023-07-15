import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { TextAreaDialogs } from "../components/common/preloader/formcontrol/formControl";
import { requiredFieldforDialogs,maxLenghtDialogs } from "../utilits/validators/validatir";
import { createFiald } from "../components/common/preloader/formcontrol/formControl";
let  maxLenght20=maxLenghtDialogs(20)
 export type DialogFormValuesType={
  dialogsform:string
}
type ExacttypeofDialogsValueProperty=Extract<keyof DialogFormValuesType,string>

let addMessageForm:React.FC<InjectedFormProps<DialogFormValuesType>>=(props)=>{
  console.log('here')
    return(
      <form  onSubmit={props.handleSubmit}>
      {createFiald<ExacttypeofDialogsValueProperty>('hellow','dialogsform',TextAreaDialogs,[requiredFieldforDialogs,maxLenght20])}
     <button>add</button>
    </form>
    )
}
let AddMessageWithReduxForm=reduxForm<DialogFormValuesType>({
    form:'dialogsForm'
})(addMessageForm)



export default AddMessageWithReduxForm