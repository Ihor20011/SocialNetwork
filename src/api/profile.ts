import { instance } from "./api"
import { photos, profile } from "../types/types";
import { responceTypeuniversal } from "./api";
export enum resultcodForstatus{
    good=0,
    bad=1
}
type profileStatusType={
    resultCode:resultcodForstatus,
    messages:string,
    data:any
}
type profilePhotoType={
    data:any,//////check this shit cause thats very important
    resultCode:resultcodForstatus,
    messages:Array<string>
}
export type deleteUserType={
    resultCode:resultcodForstatus,
    messages:Array<string>,
    data:profile/////maybe this sentance has error
}
export const ProfileApi={
    updateStatus(status:string){
        return instance.put<responceTypeuniversal>(`/profile/status`,{status : status })
    },
    getStatus(userId:number){
        return instance.get<string>(`profile/status/  ${userId}`)
    },
    
    SetUserProfile(numberofProfile:number|null){
        return  instance.get<profile>(`/profile/${numberofProfile}`).then((responce)=>{
            return responce.data
        })
    },
   SavePhotosinDal(photo:any){
     const formData = new FormData();
     formData.append('image',photo);
     return instance.put<profilePhotoType>('/profile/photo',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
     })
   },
   updateProfile(object:any){
    return instance.put<responceTypeuniversal>('profile',object)
   }
}