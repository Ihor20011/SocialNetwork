import React from "react";
import s from "./Post.module.css"
const Post=(props)=>{
    return(
          <div className={s.item}>
            <img src="https://images.prom.ua/2799285136_w640_h640_kartiny-po-nomeram.jpg"/>
            {props.message}
            <div>

            <span>like {props.likecount} </span>
            </div>
            
          </div>
    )
}
export default Post