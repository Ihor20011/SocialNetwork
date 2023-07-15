
import { unsubscribe } from "diagnostics_channel";
import React from "react";
 let allsubscribers={
    'meesage-receive':[] as MessagesubscribeType[],
    'status-changed' :[] as StatusRecived[],
 }
 type MessagesubscribeType=(messages:ChataType[])=>void;
 type StatusRecived=(status:StatusType)=>void;
 
 type StatusType='pending'|'ready';

 let NewWeSocket:WebSocket;

 export type ChataType={
     message:string,
     photo:string,
     userId:number,
     userName:string,
 }

 type EventType='meesage-receive'|'status-changed';

 const chngingStatus=(status:StatusType)=>{
    allsubscribers["status-changed"].forEach((s)=>s(status))
 }

 const reconectFunction=()=>{
     chngingStatus('pending');
     console.log('CloseD')
     createWebSocket()
 }

 const showMessage=(e:any)=>{
     const newArrayofMessage=JSON.parse(e.data)
     console.log(newArrayofMessage)
     allsubscribers["meesage-receive"].forEach((s)=>s(newArrayofMessage))
 }

 const cleanup=()=>{
    NewWeSocket?.removeEventListener('close',reconectFunction)
    NewWeSocket?.removeEventListener('message',showMessage)
    NewWeSocket?.close();
    NewWeSocket?.removeEventListener('open',openHandler)
 }
const openHandler=()=>{
    chngingStatus('ready')
}
 const createWebSocket=()=>{
     if (NewWeSocket!==null){
         cleanup()
     }
     NewWeSocket=new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
     NewWeSocket.addEventListener('close',reconectFunction)
     NewWeSocket.addEventListener('message',showMessage)
     NewWeSocket.addEventListener('open',openHandler)
}
  export const ChatApi={
     subscrbe:(event:EventType, callbek: MessagesubscribeType| StatusRecived)=>{
        //@ts-ignore
         allsubscribers[event].push(callbek)
     },
     unsubscribe:( event:EventType, callbek:MessagesubscribeType| StatusRecived)=>{
        //@ts-ignore
        allsubscribers[event]=allsubscribers[event].filter((s)=>s!==callbek)
     },
     send:(message:string)=>{
         NewWeSocket.send(message)
     },
     startchanel:()=>{
         createWebSocket()
     },

     stop:()=>{
        cleanup()
        allsubscribers['meesage-receive']=[];
        allsubscribers['status-changed']=[];
     }
 }
 
