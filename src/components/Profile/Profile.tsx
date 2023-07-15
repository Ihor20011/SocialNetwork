import React from "react";
import MoPostsContainer from "./MoPosts/Mopost-container";
import { ProfileType } from "./ProfileContainer";
import Profileinfo from "./ProfileInfo/ProfileInfo";
type PropsType={
    profile:ProfileType|null,
    status:string
    isOwner:boolean,
    profileStatusUpsate:null|boolean,

    OpenTHinkCreator:()=>void,
    CloseThinkCreator:()=>void,
    UpdateStatusThunkCreator:(status:string)=>void,
    SetPhotoThunk:(photo:File)=>void,
    UpdateProfileTunkCreator:(updateobject:ProfileType)=>void
}
 const Profile:React.FC<PropsType>=(props)=>{
    return(
         <div >
            <Profileinfo profile={props.profile}  
            profileStatusUpsate={props.profileStatusUpsate}
            OpenTHinkCreator={props.OpenTHinkCreator}
            CloseThinkCreator={props.CloseThinkCreator}
            status={props.status} isOwner={props.isOwner} 
             UpdateStatusThunkCreator={props.UpdateStatusThunkCreator} 
             SetPhotoThunk={props.SetPhotoThunk} UpdateProfileTunkCreator={props.UpdateProfileTunkCreator}
             />
            <MoPostsContainer/>
        </div>
    )
}
export default Profile
