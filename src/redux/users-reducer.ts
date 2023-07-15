
import { Dispatch } from "redux";
import { UserApi } from "../api/userapi";
import { updateObjectInArray } from "../utilits/validators/oblectChangeHelper";
import { ActionsTypeInfern, AppstateType, BaseThunkType } from "./redux-store";
const FOLLOW='FOLLOW';
const UNFOLLOW="UNFOLLOW";
const SET_USERS='SET_USERS'
const SET_CURRENTPAGE='SET_CURRENTPAGE';
const TOGLE_ISFETCHING='TOGLE_ISFETCHING';
const BUTTON_DISABLED='BUTTON_DISABLED';
const  SET_COUNT='SET_COUNT';
const SET_FLTER='SET_FILTER';
const GOPD='ggg'
type photos={
    small:string|null,
    large:string|null,
}
type user={
name:string,
id:number,
status:string,
photos: photos,
followed:boolean
}
let initialsate={
    users:[] as Array<user>,
    pageSize:5 as number,
    totalUserCount:300 as number,
    currentPage:1 as number,
    isfetching:false as boolean,
    buttonDisabled:[] as Array<number>,
    filter:{
        term:"",
        friend:null as null|boolean
    }
};
//export type FilterType = typeof initialsate.filter
type initialsateType=typeof initialsate
export type FilterType=typeof initialsate.filter
 const usersReducer  = (state=initialsate,action:ActionsType):initialsateType=>{
    switch(action.type){
       case FOLLOW :{
           return{
            ...state,
            users:updateObjectInArray(state.users,action.userId,'id',{followed:true})
           }
       }
        case UNFOLLOW:{
            return{
                ...state,
                users:updateObjectInArray(state.users,action.userId,'id',{followed:false})
            }
        }
           case SET_USERS:{
             return {...state,users:[...action.users]}
            }
            case SET_CURRENTPAGE:{
            return {...state,
                currentPage:action.count
            }
            }
            case  TOGLE_ISFETCHING:{
           return {...state,
            isfetching:action.isfetching
        }
            }
            case SET_COUNT:{
                return{...state,
                    totalUserCount:action.count
                }
            }
            case BUTTON_DISABLED:{
                return{...state,
                buttonDisabled: action.isfetchin
                ? [...state.buttonDisabled,action.userId]
                : [...state.buttonDisabled.filter((id)=>{
                    return id !=action.userId
                })]
                }
            }
            case SET_FLTER:{
                return{...state,
                filter:action.payload
                }
            }
         default:
            return state 
    }
 }
 ///Action
type ActionsType=ActionsTypeInfern<typeof actions>
export const actions={
     follow:(userId:number)=>({type:FOLLOW,userId:userId} as const ),
     unfollow:(userId:number)=>({type:UNFOLLOW,userId:userId} as const),
     setUsers:(users:Array<user>)=>({ type:SET_USERS,users:users } as const),
     setCurrentpage:(count:number)=>({type:SET_CURRENTPAGE,count:count}as const),
     toggle:(isfetching:boolean)=>({type: TOGLE_ISFETCHING,isfetching:isfetching }as const),
     buttonDisabledCreator:(isfetching:boolean,userId:number)=>({type:BUTTON_DISABLED,isfetchin:isfetching,userId:userId }as const),
     SetCountofUsers:(count:number)=>({ type:SET_COUNT,count:count}as const),
     setFilter:(filter:FilterType)=>({type:SET_FLTER,payload:filter} as const),
}
type thunkType= BaseThunkType<ActionsType>

export const  SetTotalCount=(currentPage:number,pageSize:number):thunkType=>{
    return async (dispatch,getState)=>{
        dispatch(actions.toggle(true))
         let data = await UserApi.getTotalcount();
           dispatch( actions.toggle(false))
             dispatch(actions.SetCountofUsers(data.totalcount))
    }
}
export const GetUserThunkCreator=(pageNumber:number,pageSize:number,filter:FilterType):thunkType=>{
    return async (dispatch)=>{
        dispatch(actions.toggle(true))
        dispatch(actions.setCurrentpage(pageNumber))
        dispatch(actions.setFilter(filter))
        let data = await UserApi.getUsers(pageNumber,pageSize,filter.term,filter.friend)
        dispatch( actions.toggle(false))
        dispatch(actions.setUsers(data.items))
    }
}
export const ChangeFilter=(pageNumber:number,pageSize:number,filter:FilterType):thunkType=>{
    return async (dispatch)=>{
        dispatch(actions.toggle(true))
        dispatch(actions.setCurrentpage(pageNumber))
        dispatch(actions.setFilter(filter))
        let data = await UserApi.getUsers(pageNumber,pageSize,filter.term,filter.friend)
        dispatch( actions.toggle(false))
        dispatch(actions.setUsers(data.items))
    }
}
type DispatchType=Dispatch<ActionsType>
///Редечення коду вынесення в общу функ
const  followUnfollowfunck = async(dispatch:DispatchType,id:number,api:any,
    actionCreator:any)=>{
    dispatch(actions.buttonDisabledCreator(true,id))
    let data = await api(id)
    if (data.resultCode==0){
     dispatch(actionCreator(id))
     }
    dispatch(actions.buttonDisabledCreator(false,id))
}
///
 export const unFollowThunkCreator=(id:number):thunkType=>{
    return  async (dispatch)=>{
        followUnfollowfunck(dispatch,id,UserApi.deleteFromUser.bind(UserApi),actions.unfollow) 
    }
 }
 export const followThunkCreator=(id:number):thunkType=>{
    return async (dispatch)=>{
        followUnfollowfunck(dispatch,id,UserApi.followUser.bind(UserApi),actions.follow)
    }
 }
 export default usersReducer



 


 