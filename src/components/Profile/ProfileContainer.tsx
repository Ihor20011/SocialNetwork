import React, { ComponentType, useEffect } from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { actions } from "../../redux/profile-reducer";
import {ProfileThunkCreator,getStatusThunkCreator,
UpdateStatusThunkCreator,SetPhotoThunk,UpdateProfileTunkCreator,OpenTHinkCreator,CloseThinkCreator,} from "../../redux/profile-reducer";
import { withRouter } from "./ProfileInfo/withRouter";
import { compose } from "redux";
import { photos } from "../../types/types";
import { AppstateType } from "../../redux/redux-store";
const setUserProfile=actions.setUserProfile

type Contacts={
  github:string,
  vk:string,
  facebook:string,
  instagram:string,
  twitter:string,
  website:string,
  youtube:string,
  mainLink:string
}
 export type ProfileType={
    aboutMe:string,
    contacts:Contacts,
    lookingForAJob:boolean,
    lookingForAJobDescription:string,
    fullName:string,
    userId:number,
    photos:photos,
    profileStatusUpsate:null,
    status:string
}
type Location={
    hash:string,
    key:string,
    pathname:string,
    search:string,
    state:null,
}
type RouterType={
    location:Location,
    navigate:(to:string)=>void,
    params:any
}
type PropsType=mapStateTopropsType&mapDispatchToprops&Router


type mapStateTopropsType={
    status:string,
    id:number|null,
    islogined:boolean|null,
    profile:ProfileType|null,
    profileStatusUpsate:null|boolean,
    //router:RouterType|undefined,
}
type Router={
    router:RouterType
}
type mapDispatchToprops={
    CloseThinkCreator:()=>void,
    OpenTHinkCreator:()=>void,
    ProfileThunkCreator:(namberofProfile:number)=>void,
    SetPhotoThunk:(photo:File)=>void,
    UpdateProfileTunkCreator:(updateobject:ProfileType)=>void,
    UpdateStatusThunkCreator:(status:string)=>void,
    getStatusThunkCreator:(namberofProfile:number)=>void,
    setUserProfile:(profile:ProfileType)=>void,
}

const ProfileContainerr:React.FC<PropsType>=(props)=>{
    useEffect(()=>{
        let numberofProfile=props.router.params.id;
        if (!numberofProfile){
            numberofProfile=props.id;
            if (!numberofProfile){
                props.router.navigate('/login')
            }
        }
        props.ProfileThunkCreator(numberofProfile);
        props.getStatusThunkCreator(numberofProfile)
    },[props.router.params.id])
    return(
        <Profile  {...props}  profile={props.profile}  isOwner = {!props.router.params.id}
        profileStatusUpsate={props.profileStatusUpsate} CloseThinkCreator={props.CloseThinkCreator}
        OpenTHinkCreator={props.OpenTHinkCreator} 
        status={props.status} UpdateStatusThunkCreator={props.UpdateStatusThunkCreator} 
        SetPhotoThunk={props.SetPhotoThunk} UpdateProfileTunkCreator={props.UpdateProfileTunkCreator}
        /> 
    )
}
let mapStateToProps=(state:AppstateType)=>{
    return{
        profile:state.profilePage.profile,
        islogined:state.auth.islogined,
        status:state.profilePage.status,
        id:state.auth.id,
        profileStatusUpsate:state.profilePage.profileStatusUpsate,
    }
}
let ProfileContainer=compose<ComponentType>(
    connect(mapStateToProps,{setUserProfile,
    ProfileThunkCreator,getStatusThunkCreator,UpdateStatusThunkCreator,
    SetPhotoThunk,UpdateProfileTunkCreator,OpenTHinkCreator,CloseThinkCreator,}),
    withRouter,   
)(ProfileContainerr)
export default ProfileContainer
