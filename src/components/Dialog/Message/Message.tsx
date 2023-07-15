import { type } from "os";
import React from "react";
import s from "./../Dialog.module.css"
type messageType={
  msg:string
}
const Massagecom:React.FC<messageType>=(props)=>{
    return( 
      <div>
      <div className={s.message}>
                {props.msg}
               </div>
      </div>
    )
  }
  export default Massagecom