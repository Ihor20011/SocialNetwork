import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogReducer from "./dialog-reducer";
import usersReducer from "./users-reducer";
import autReducer from "./auth-reducer";
import  thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import { compose } from "redux";
import ChatReducer from "./chat-reducer";
let reducers=combineReducers({
    profilePage:profileReducer,
    dialogPage:dialogReducer,
    usersPage:usersReducer,
    auth:autReducer,
    app:appReducer,
    form:formReducer,
    chat:ChatReducer
});

type rootReducer= typeof reducers;

export type AppstateType = ReturnType<rootReducer> ///даная фернкия помогает затраьб тип который возвращает main reducer

type PropertiesType<T> = T extends {[key:string]:infer R}? R : never;

export type ActionsTypeInfern<T extends{[key:string]:(...arg:any)=>any}>=ReturnType<PropertiesType<T>>;

export type BaseThunkType< A extends Action>=ThunkAction<Promise<void>,AppstateType,unknown,A> 
//@ts-ignore

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store= createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)))
//@ts-ignore
window.store=store
export default store











