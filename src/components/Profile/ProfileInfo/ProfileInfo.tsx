import React, { useState,ChangeEvent } from "react";
import s from "./Profileinfo.module.css"
import Preloader from "../../common/preloader/preloader";
import ProfileDataFormReduks from "./ProfileInforForm";
import ProfileStatusHook from "./profileStatusHooks";
//@ts-ignore
import picture from "../../../assets/images/images.png"
import { ProfileType } from "../ProfileContainer";
import { ProfielFildObjectType } from "./ProfileInforForm";
import { profile } from "../../../redux/profile-reducer";
import { type } from "os";
type PropsType=mapStatePropsType&mapDispatchToPropsType
type mapStatePropsType={
    profile:ProfileType|null,
    profileStatusUpsate:boolean|null,
    isOwner:boolean,
    status:string,
}
type mapDispatchToPropsType={
    UpdateStatusThunkCreator:(status:string)=>void
    UpdateProfileTunkCreator:(updateProfile:ProfileType)=>void,
    CloseThinkCreator:()=>void,
    OpenTHinkCreator:()=>void,
    SetPhotoThunk:(photo:File)=>void,
}
const Profileinfo:React.FC<PropsType>=({profile,UpdateProfileTunkCreator,profileStatusUpsate,
    CloseThinkCreator,OpenTHinkCreator,isOwner,status,UpdateStatusThunkCreator,SetPhotoThunk})=>{
    const closeData=(data:any)=>{
     UpdateProfileTunkCreator(data);
    }
    if (!profile){
        return <Preloader/>
    }
    const sendPhoto=(e:ChangeEvent<HTMLInputElement>)=>{
        if (e.target.files?.length){ 
            SetPhotoThunk(e.target.files[0])
        }
    }
    return(
         <div>
          <div className={s.card}>
               <img src={profile.photos.large || picture} className={s.card__img}  />
               {isOwner && <input type={'file'} onChange={sendPhoto}/>}
               </div>
               { profileStatusUpsate 
                    ? <ProfileDataFormReduks  initialValues={profile} 
                     profile={profile} onSubmit={closeData}/>

                    :<ProfileData profile={profile}  
                    isOwner={isOwner} activateEditMode={OpenTHinkCreator}/>
               }
               <ProfileStatusHook status={status} UpdateStatusThunkCreator={UpdateStatusThunkCreator} />
                 { 
                } 
          </div>
    )
}
type profileDataType={
    profile:profile,
    isOwner:boolean,
    activateEditMode:()=>void
}
const ProfileData:React.FC<profileDataType>=({profile,isOwner,activateEditMode})=>{
    return(
        <div >
            <div>
                {isOwner
                &&<button onClick={activateEditMode}>edit</button>}
            </div>
                <div>
                    <b>FullName:</b>{profile.fullName}
                </div>
                  <div>
                    <b>Looking for a Job:</b>{profile.lookingForAJob? 'yes':'No'}
                  </div>
                      <div>
                      <div><b>My professiobnal Skills:</b> {profile.lookingForAJobDescription}</div>
                  </div>
                  <div>
                    <b>About Me:</b>{profile.aboutMe}
                  </div>
                  <div>
                    <b>Contacts</b>{Object.keys(profile.contacts).map((key)=>{
                        return <Contact  key={key} contactTitle={key} contactValue={profile.contacts[key as keyof contactsType]}  />
                    })}
                  </div>
               </div>
    )
}
type contactsType={
    github:string,
    vk:string,
    facebook:string,
    instagram:string,
    twitter:string,
    website:string,
    youtube:string,
    mainLink:string
  }
type ContactType={
    contactTitle:string,
    contactValue:string
}
const Contact:React.FC<ContactType>=({contactTitle,contactValue})=>{
    return(
       <div className={s.block}>
        <b> {contactTitle}:</b>{contactValue}
        </div>
    )
}
export default Profileinfo