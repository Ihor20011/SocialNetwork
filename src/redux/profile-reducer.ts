import { type } from "os";
import { stopSubmit } from "redux-form";

import { ProfileApi } from "../api/profile";
import { ActionsTypeInfern, AppstateType, BaseThunkType } from "./redux-store";
import { resultcodForstatus } from "../api/userapi";

const ADD_POST="ADD-POST"
const SET_PROFILE="SET_PROFILE"
const SET_STATUS="SET_STATUS";
const SET_PHOTO="SET_PHOTO";
const OPEN_PROFILE='OPEN_PROFILE';
const CLOSE_PROFILE='CLOSE_PROFILE';

type postType={
 id:string|number,msg:string,like:number
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

 export type profile={
  aboutMe:string,
  userId:number,
  lookingForAJob:boolean,
  lookingForAJobDescription:string,
  fullName:string ,
  contacts:contactsType,
  photos:photos,
  profileStatusUpsate:null,
  status:string
}
let initialState={
    posts:[
        {id:'1',msg:" Who are you", like:11},
        {id:'2',msg:"I will get this fucking work", like:17}
       ] as Array<postType>,  
       newPostText:null as string| null ,
       profile : null as profile | null,
       profileStatusUpsate:null as boolean| null,
       status:null as string| null,
}
export type initialStateType = typeof initialState
const profileReducer=(state=initialState,action:ActionsType):initialStateType=>{
    switch (action.type){
        case ADD_POST:{
          let body=action.text
          let newObj={
            id:5,
            msg:body,
            like:90
          }
          return{...state,
          posts:[...state.posts,newObj],
          }
        }
        case SET_STATUS:{
          return {...state,
            status:action.status
          }
        }
        case SET_PROFILE:{
          return{...state,
          profile:action.profile
          }
        }
        case SET_PHOTO:{
          return{...state,
          profile:{...state.profile, photos:action.photos}  as profile }///check this shit later!!!!!!
        }
         case OPEN_PROFILE:{
           return{...state,
             profileStatusUpsate:true
           }
         }
         case CLOSE_PROFILE:{
           return {...state,
            profileStatusUpsate:false
           }
         }
            default:
                return state
    }
}
type ActionsType=ActionsTypeInfern<typeof actions>
type thunkType=BaseThunkType<ActionsType>
 export const actions={
  OpenProfileCreator:()=>{return{type:OPEN_PROFILE,boolian:true }as const},
  CloseProfileCreator:()=>{return{type:CLOSE_PROFILE,boolian:false } as const},
  savePhotoCreator:(photos:photos)=>{return {type:SET_PHOTO,photos:photos}as const},
  addpost:(text:string)=>{return {type:ADD_POST,text:text} as const},
  setUserProfile:(profile:profile)=>{return{type:SET_PROFILE,profile:profile} as const},
  setStatus:(status:string|any)=>{return{ type:SET_STATUS, status:status }as const}
}
export const OpenTHinkCreator=():thunkType=>{
    return async(dispatch)=>{
    dispatch(actions.OpenProfileCreator())
  }
}
export const CloseThinkCreator=():thunkType=>{
  return async (dispatch)=>{
    dispatch(actions.CloseProfileCreator())
  }
}
   export const getStatusThunkCreator=(userId:number):thunkType=>{
    return async (dispatch)=>{
       let responce = await ProfileApi.getStatus(userId);
         dispatch(actions.setStatus(responce.data))
       }
   }
   export const UpdateStatusThunkCreator=(status:string):thunkType=>{
    return async (dispatch)=>{
       let responce= await ProfileApi.updateStatus(status)
       if (responce.data.resultCode===resultcodForstatus.good)
        dispatch(actions.setStatus(status))
    }
   }
  export const ProfileThunkCreator=(numberofProfile:number|null):thunkType=>{
    return async (dispatch)=>{
       let data = await ProfileApi.SetUserProfile(numberofProfile);
          dispatch(actions.setUserProfile(data));
    }
  }
  export const SetPhotoThunk=(photo:File):thunkType=>{
     return async(dispatch)=>{
      let responce=await ProfileApi.SavePhotosinDal(photo);
      if (responce.data.resultCode===0){
        dispatch(actions.savePhotoCreator(responce.data.data))///check this shit
      }
     }
  }
  export const UpdateProfileTunkCreator=(updateObject:profile):thunkType=>{
     return async (dispatch,getState)=>{
     let userId= getState().auth.id;
     let responce =await ProfileApi.updateProfile(updateObject);
      if (responce.data.resultCode==resultcodForstatus.good){
        if (userId !=null){
          dispatch(ProfileThunkCreator(userId));
          dispatch(actions.CloseProfileCreator())
        }
        }
      else{
        //@ts-ignore
        dispatch(stopSubmit('edit-profile',{_error : responce.data.messages[0]}))///////!!!!!!!!!!!
        dispatch(actions.OpenProfileCreator())
        
      }
     }
  }
export default profileReducer

let nullarray:any=[];
let superarray=[{name:12},{name:12},{name:15}]
nullarray.forEach((n:any)=>n(superarray))
console.log(nullarray)
 

