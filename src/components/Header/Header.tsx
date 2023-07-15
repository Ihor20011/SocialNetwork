import React from "react";
import { NavLink } from "react-router-dom";
import  s from "./Header.module.css"
type PropsType={
    logOutThunkCreator:()=>void,
    islogined:boolean|null,
    login:string|null
}
const Header : React.FC<PropsType>=(props)=>{
    const logout=()=>{
        props.logOutThunkCreator()
    }
    return(
        <header className={s.header}>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2IUMXk9pOmzKD2ID0Rcp11pCGvi4YG84NXA&usqp=CAU'/>
      <div className={s.login}>
          {props.islogined
          ? <div> {props.login} {  <button onClick={logout} >Logout</button>}</div>
          : <NavLink to={'/login'} >LOGIN</NavLink>
          }
      </div>
     </header>
    )
}
export default Header