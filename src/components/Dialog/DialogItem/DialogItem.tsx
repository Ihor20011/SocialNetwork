import React from "react";
import s from "./../Dialog.module.css"
import { NavLink } from "react-router-dom";
type dialogType={
  name:string,
  id:string
}
const Dialogitem:React.FC<dialogType>=(props)=>{
    let path="/dialogs/"+props.id
    return (
      <div className={s.dialog + ' ' + s.active}>
                <NavLink to={path}>{props.name}</NavLink>
                </div>  
    )
  }
  export default Dialogitem 
  