
import React from "react";
import { Dispatch } from "redux";
import { ChatApi } from "../api/chatapi";
import { ActionsTypeInfern, BaseThunkType } from "./redux-store";
import { v1 } from "uuid";
const MESSAGES_RECAIVED="MESSAGES_RECAIVED";
const STATUS_CHANGED='STATUS_CHANGED';

type ChataType={
    message:string,
    photo:string,
    userId:number,
    userName:string,
}

type SuperChatType=ChataType & {id:string}

type StatusType='pending'|'ready';

let initialState={
    messages:[] as SuperChatType[],
    status:'pending' as StatusType
}
type initialStateType= typeof initialState
const ChatReducer=(state=initialState,action:ActionsType) :initialStateType =>{
    switch(action.type){
        case MESSAGES_RECAIVED:{
            return {...state,
            messages:[...state.messages,...action.payload.messaeges].map((m)=>({...m,id:v1()})).filter((e,i,array)=> i>= array.length-100 )
            }
        }
        case STATUS_CHANGED:{
            return{...state,
            status:action.payload.status
            }
        }
        default:
            return state
    }
}
type dataobject={
    email:string|null,
    id:number|null,
    login:string|null,
    islogined:boolean|null,
}
type ActionsType= ActionsTypeInfern<typeof actions>
const actions={
    messgaeRecived:(messaeges:ChataType[])=>({
       type:MESSAGES_RECAIVED,payload:{messaeges}
    } as const ),
    statusChanged:(status:StatusType)=>({
        type:STATUS_CHANGED,payload:{status}
    } as const)
}
type thunkType=BaseThunkType<ActionsType>


let newStatushedler:((status:StatusType)=>void)|null=null;


const newStatushedlerCreator=(dispatch:Dispatch)=>{
    if (newStatushedler===null){
        newStatushedler=(status:StatusType)=>{
            dispatch(actions.statusChanged(status))
        }
    }
    return newStatushedler
}


let newMessagehandler:((messages:ChataType[])=>void)|null=null;

const newMessageHandlerCreator=(dispacth:Dispatch)=>{
    if (newMessagehandler===null){
      newMessagehandler=(messages:ChataType[])=>{
        dispacth(actions.messgaeRecived(messages))
      }
    }
    return newMessagehandler
}
export const StartMessageListening=():thunkType=>{
    return async(dispatch)=>{
        ChatApi.startchanel();
        ChatApi.subscrbe('meesage-receive',newMessageHandlerCreator(dispatch))
        ChatApi.subscrbe('status-changed', newStatushedlerCreator(dispatch))
    }
}
 export const StopMessagesListening=():thunkType=>{
    return async(dispatch)=>{
        ChatApi.unsubscribe( 'meesage-receive',newMessageHandlerCreator(dispatch))
        ChatApi.unsubscribe('status-changed',newStatushedlerCreator(dispatch))
    }
}

  export const SendMessage=(message:string):thunkType=>{
    return async(dispacth)=>{
        ChatApi.send(message)
    }
}

export default ChatReducer

