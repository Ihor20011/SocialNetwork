import axios from "axios"
import { type } from "os"
import { photos, profile } from "../types/types"
import { user } from "../types/types"
import { resultcodForstatus } from "./profile"
export const instance = axios.create({
   withCredentials:true,
   baseURL:'https://social-network.samuraijs.com/api/1.0/',
   headers:{
    "API-KEY":'50f439ec-c21d-41ff-865f-993cdfa55a63'
   }
})
export type GetItemsType={
   items:Array<user>,
   totalcount:number,
   error:string|null
}
export enum resultcodeSuc {
   sucsess=0,
   error=1
}
export type responceTypeuniversal={
data:any,
messages:Array<string>,
resultCode:resultcodeSuc|resultcodForstatus
}

 export type responceType<D,RC=resultcodeSuc>={
   data:D,
   messages:Array<string>,
   resultCode:RC
}





