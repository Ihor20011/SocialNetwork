import React from "react";
import s from './Friends.module.css'


const Friends=(props)=>{
return(
    <div className={s.container}>
         <div className={s.logo}>
            Friends
         </div>
         <div className={s.friendscontainer}>
            <div className={s.photo}>
                <div className={s.color}></div>
                <div className={s.color}></div>
                <div className={s.color}></div>
            </div>
               <div className={s.box}>
            <div className={s.friend}>{props.frends.friend1}</div>
            <div className={s.friend}>{props.frends.friend2}</div>
            <div className={s.friend}>{props.frends.friend3}</div>
               </div>

         </div>
    </div>
)
}
export default Friends