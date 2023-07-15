import { stat } from "fs";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { SendMessage, StartMessageListening, StopMessagesListening } from "../redux/chat-reducer";
import { AppstateType } from "../redux/redux-store";
import s from './Chat.module.css'
 //const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
 export type ChataType={
     message:string,
     photo:string,
     userId:number,
     userName:string,
 }
 type propsType={
    msg:ChataType
}
  export const ChatPage:React.FC=()=>{
     return (
         <Chat/>
     )
 }
const Chat:React.FC=()=>{
     const dispatch=useDispatch();
     useEffect(()=>{
         dispatch(StartMessageListening()as unknown as AnyAction)
      return()=>{
     dispatch(StopMessagesListening() as unknown as AnyAction)
}
     })
    return(
        <div>
            <Messages  />
            <ChatForm />
         </div>
    )
}
const  Messages:React.FC=({})=>{
    const referenceToobject=useRef<HTMLDivElement>(null)
    const messages=useSelector((state:AppstateType)=>state.chat.messages);
    const [scrollMode,changeScrollMode]=useState(true);

    const scrollHandler=(e:React.UIEvent<HTMLDivElement, UIEvent>)=>{
        const element=e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight)<300){
            console.log('ttt')
             !scrollMode && changeScrollMode(true)
        }
        else{
            scrollMode&& changeScrollMode(false)
        }
    }


    // useEffect(()=>{
    //     referenceToobject.current?.scrollIntoView()
    //   },[messages])
    useEffect(()=>{
        if (scrollMode){
            referenceToobject.current?.scrollIntoView({behavior:'smooth'})
        }
    },[messages])
      
    const parseArrray=messages.map((m,index)=><Mesage key={index} msg={m} />)

    
 return(
    <div>
    <div className={s.mainblock} onScroll={scrollHandler} >
      {parseArrray}
      <div ref={referenceToobject}></div>
    </div>
    </div>

 )
}
////

const ChatForm:React.FC=()=>{


let status=useSelector((state:AppstateType)=>state.chat.status)


const dispatch=useDispatch();
let [curentValue,changeCurrentValue]=useState('');

const [buttonStatus,changeButtonStatus]=useState<'open'|'pending'>('pending');

const sendMessage=()=>{
    if (!curentValue){
        return
    }
    dispatch(SendMessage(curentValue) as unknown as AnyAction)
    curentValue='';
}

return(
    <div>
         <div>
              <textarea onChange={(e)=>changeCurrentValue(e.currentTarget.value)} value={curentValue} ></textarea>
              </div>
              <div>
              <button disabled={status!=='ready'}  onClick={sendMessage}>send</button>
              </div>
          </div>
)
}
/////
 const Mesage:React.FC<propsType>=React.memo(({msg})=>{
    return(
        <div>
            <img  className={s.img} src={msg.photo}/> <b>{msg.userName}</b>
            <br/>
            {msg.message}
           <hr/>
        </div>
    )
})
export default ChatPage



//  const ChatForm:React.FC<mesageType>=({ws})=>{
//      let [curentmesage,changecurrent]=useState('');
//      const [status,changestatus]=useState<'ready'|'pending'>('pending')

//      useEffect(()=>{
//         const openHandler=()=>{
//             changestatus('ready')
//         }
//       ws?.addEventListener('open',openHandler)
//      return ()=>{
//         ws?.removeEventListener('open',openHandler)
//      }
//      },[ws])
//      const sendmessage=()=>{
//          if (!curentmesage){
//              return        }
//          ws?.send(curentmesage)
//          curentmesage=''
//      }
//      return(
//          <div>
//              <div>
//              <textarea onChange={(e)=>changecurrent(e.currentTarget.value)}  value={curentmesage}></textarea>
//              </div>
//              <div>
//              <button disabled={status!=='ready'}  onClick={sendmessage}>send</button>
//              </div>
//          </div>
//      )
//  }


////
//  const Messages:React.FC<mesageType>=({ws})=>{  
//     const [statemessage,setmessage]=useState<ChataType[]>([])
//      useEffect(()=>{
//         const getMessage=(e:any)=>{
//                 const newMessage=JSON.parse(e.data)
//                 console.log(newMessage)
//                setmessage((prevstate)=>[...prevstate,...newMessage])
//             }
//          ws?.addEventListener('message',getMessage)
//           return ()=>{
//             ws?.removeEventListener('message',getMessage)
//           }
//          },[ws])

//      const parsessage=statemessage.map((m,index)=> <Mesage  key={index} msg={m}/>)
//      return(
//          <div className={s.mainblock}>
//              {parsessage}
//          </div>
//      )
//  }
//  const Chat:React.FC=()=>{
//     let [ws,changews]=useState<WebSocket|null>(null)
//     useEffect(()=>{
//         let newws:WebSocket;
//         const reconectFunction=()=>{
//             console.log('closed')
//             createChanell()
//         } 
//      const createChanell=()=>{
//         if (newws!==null){
//             newws?.removeEventListener('close',reconectFunction)
//         }
//       newws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
//       newws?.addEventListener('close',reconectFunction)
//       changews(newws);
//     }
//      createChanell();
//        return ()=>{
//         newws?.removeEventListener('close',reconectFunction);
//         newws.close()
//        }
//      },[])
//      return(
//          <div>
//             <Messages ws={ws} />
//             <ChatForm ws ={ws}/>
//         </div>
//      )
//  }