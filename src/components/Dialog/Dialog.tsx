import React from "react";
import s from "./Dialog.module.css"
import Dialogitem from "./DialogItem/DialogItem";
import Massagecom from "./Message/Message";
import AddMessageWithReduxForm from "../../forms/addmessageform";
import { DialogFormValuesType } from "../../forms/addmessageform";
type PropsType={
  dialogs:Array<{id:string,name:string}>,
  messages:Array<{id:string,message:string}>,
  islogined:boolean
  sendMessageCreator:(text:string)=>void
}

const Dialog :React.FC<PropsType>=(props)=>{

const onclickfunction=(values:DialogFormValuesType)=>{
props.sendMessageCreator(values.dialogsform)
 }

 let dialogsElement=props.dialogs.map((d)=>{
  return <Dialogitem name={d.name} id={d.id}/>
 })
let messageElemts=props.messages.map((m)=>{
  return <Massagecom msg={m.message} />
})
    return(
        <div className={s.dialogs}>
          <div className={s.dialogitems}>
            {dialogsElement}
          </div>
          <div className={s.messages}>
             {messageElemts}
          </div>
          <AddMessageWithReduxForm onSubmit={onclickfunction}/>
        </div>
    )
}
export default Dialog


