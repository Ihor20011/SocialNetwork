import { type } from "os";
import { InferThunkActionCreatorType } from "react-redux";
import { ActionsTypeInfern } from "./redux-store";
const ADD_MESSAGE="ADD-MESSAGE";
type dialogs={
  id:string,
  name:string
}
type message={
  id:string,
  message:string,
}
let initialState={
    dialogs:[
        {id:"1",name:'ihor'},
        {id:"2",name:'Yarko'},
        {id:"3",name:'Padal'},
        {id:"4",name:'Vitalic'},
        {id:"5",name:'Victor'},
        {id:"6",name:'Fyan'}
      ] as Array <dialogs>,
    messages:[
        {id:"1",message:'Hi'},
        {id:"2",message:'How you doing today'},
        {id:"3",message:'Wheake looser'},
        {id:"4",message:'Yoo'},
        {id:"5",message:'Yoo'},
      ] as Array <message> ,
}

export type initialStateType= typeof initialState

const dialogReducer=(state=initialState,action:ActionsType): initialStateType=>{
    switch(action.type){
        case ADD_MESSAGE: 
        let body =action.NewchangeText
        return {...state,
        messages:[...state.messages,{id:'6',message:body}], 
        }
          default:
            return state
    }
}
type ActionsType=ActionsTypeInfern<typeof actions>


export const actions={
  sendMessageCreator:(text:string)=>{
    return{
      type:ADD_MESSAGE,
      NewchangeText:text
    } as const
  }
}
export default dialogReducer