import React from "react"
import { InjectedFormProps, reduxForm } from "redux-form"
import { createFiald, Input, Textarea } from "../../common/preloader/formcontrol/formControl"
import style from '../../Login/login.module.css'
export type ProfielFildObjectType={
  userid:number,
  
  fullname:string,
  lookingForAJob:boolean,
  lookingForAJobDescription:string,
  aboutMe:string,
  contacts:contactsType,

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
type photos={
  small: string|null,
  large: string|null, 
}
type profile={
    aboutMe:string,
    userId:number,
    lookingForAJob:boolean,
    lookingForAJobDescription:string,
    fullName:string ,
    contacts:contactsType,
    profileStatusUpsate:null
    photos:photos,
    status:string
}
type ownProps={
  profile:profile
}
type straightnameOftheFiald=Extract<keyof ProfielFildObjectType,string >
let  ProfileDataForm:React.FC<InjectedFormProps<ProfielFildObjectType,ownProps>&ownProps>=({handleSubmit,profile,error})=>{
    return(
           <form onSubmit={handleSubmit} >
            <button>Save</button>
            {error &&
            <div className={style.formerror}>
            {error}
            </div>
            }
                <div>
                    <b>FullName:</b>{createFiald<straightnameOftheFiald>('fullname','fullname',Input,[])}
                </div>
                  <div>
                    <b>Looking for a Job:</b>{createFiald<straightnameOftheFiald>('','lookingForAJob',Input,[],{type:'checkBox',})}
                  </div>
                      <div>
                      <div> <b>My professiobnal Skills:</b> {createFiald('My sckills',
                      'lookingForAJobDescription',Textarea,[],)}</div>
                  </div>
                  <div>
                    <b>About Me:</b>{createFiald<straightnameOftheFiald>('about Me','aboutMe',Textarea,[])}
                  </div>
                    <div>
                      <b>Contacts</b> {Object.keys(profile.contacts).map((key)=>{
                        return <div>
                          <b>{key}:{createFiald(key,'contacts'+ key,Input,[])}</b>
                        </div>
                      })}
                    </div> 
               </form>
    )
}

const ProfileDataFormReduks=reduxForm<ProfielFildObjectType,ownProps>({
    form:'edit-profile',
    enableReinitialize: true,
    destroyOnUnmount: false
})(ProfileDataForm)
export default ProfileDataFormReduks