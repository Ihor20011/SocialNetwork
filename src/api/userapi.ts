import { instance } from "./api"

import { GetItemsType } from "./api"

import { responceTypeuniversal } from "./api"
export enum resultcodForstatus{
    good=0,
    bad=1
}

export enum resultcodeSuc {
    sucsess=0,
    error=1
 }
export enum resulcodeCaptcha{
    captcha=10
 }
export const UserApi={
    deleteFromUser(userId:number){
        return instance.delete(`follow/${userId}`).then((responce)=>{
          return responce.data
        }) as Promise<responceTypeuniversal>
      },
    followUser(userId:number){
        return instance.post<responceTypeuniversal>(`follow/${userId}`).then((response)=>{
            return response.data
        })
    },
    
    getTotalcount(){
    return instance.get<GetItemsType>(`users`).then((responce)=>{
     return responce.data
    })
    },
    
     getUsers(currentPage:number,pageSize:number,term:string,friend:null|boolean=null){
         return instance.get<GetItemsType>(`users?page=${currentPage}
         &count=${pageSize}&term=${term}`+(friend===null?'':`&friend=${friend}`))
         .then((responce)=>{
            return responce.data
          })
    },
 }
 