import { type } from "os";
import React from "react";
import { connect } from "react-redux";
import { actions} from "../../../redux/profile-reducer";
import { AppstateType } from "../../../redux/redux-store";
import MoPosts from "./MoPosts";
const addpost=actions.addpost
type post={
    id:string|number,
    msg:string,
    like:number
}
type mapStateToprops={
    posts:Array<post>
}
type mapDispatchToprops={
    addpost:(text:string)=>void
}
type PropsType=mapStateToprops&mapDispatchToprops

const mapStatetoProps=(state:AppstateType):mapStateToprops=>{
    return {
        posts:state.profilePage.posts,
        // newPosttext:state.profilePage.newPostText
    }
}
  const MoPostsContainer= connect(mapStatetoProps,{addpost})
  (MoPosts)
 export default MoPostsContainer

 