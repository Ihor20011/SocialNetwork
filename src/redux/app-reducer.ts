
import { AuthThunkCreator } from "./auth-reducer";
import { AppstateType, BaseThunkType } from "./redux-store";
const SET_INITIAL='SET_INITIAL';

const initialState = {
    isInitial:false
}  
export type initialStateType =typeof initialState
  const appReducer=(state=initialState, action:actionsType):initialStateType=>{
 switch (action.type){
    case SET_INITIAL:{
        return{...state,
        isInitial:true
        }
    }
    default:
        return state
 }
}
const actions ={
    InitialActionCreator:()=>{return{type:SET_INITIAL} as const
    }
}
type SuperAction<T>=T extends {[key:string]: infer R } ? R : never;

type workType<T extends {[key:string]:(...arg:any)=>any}>=ReturnType<SuperAction<T>>;

type actionsType=workType<typeof actions>;

type thunkType=BaseThunkType<actionsType>

  export  const initialThunkCreator=():thunkType=>{
    return async (dispatch)=>{
      const promise = await dispatch(AuthThunkCreator())
      dispatch(actions.InitialActionCreator())
    //   promise.then(()=>{
    //       dispatch(InitialActionCreator())
    //   })
    }
}
export default appReducer