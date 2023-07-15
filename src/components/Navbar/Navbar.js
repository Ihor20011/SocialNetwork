import React from "react";
import { NavLink } from "react-router-dom";
import s from"./Navbar.module.css"
const Nav=(props)=>{
    return(
        <nav className={s.nav}>
      <div className={s.item}>
       <NavLink to="/profile" className={(item)=>(item.isActive?`${s.active}`:'none')}>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" className={(item)=>(item.isActive? `${s.active}`:'none')}>Dialog</NavLink>
      </div>
      <div className={s.item}>
        <a>News</a>
      </div>
      <div className={s.item}>
        <a>Music</a>
      </div>
      <div className={s.item}>
        <a>Settings</a>
      </div>
      <div className={s.item}>
      <NavLink to="/users" className={(item)=>(item.isActive?`${s.active}`:'none')}>Users</NavLink>
      </div>
      <div className={s.item}>
      <NavLink to="/chat" className={(item)=>(item.isActive?`${s.active}`:'none')}>Chat</NavLink>
      </div>
      <div>
      </div>
     </nav>
    )
}
export default Nav