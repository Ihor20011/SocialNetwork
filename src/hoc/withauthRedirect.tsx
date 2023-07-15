import React, { Component, ComponentType, Suspense } from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { Navigate } from "react-router-dom";
import { useLocation,useNavigate,useParams } from "react-router-dom";
import { AppstateType } from "../redux/redux-store";
let mapStateTopropsForRedirect=(state:AppstateType):mapStateType=>{
    return{
        islogined:state.auth.islogined
    }
}
type mapStateType={
    islogined:boolean|null
}
type madDispatchProps={
    fake:()=>void
}
export function DialogHocFunction<WCP extends JSX.IntrinsicAttributes>(WrapedComponent:ComponentType<WCP>){
    const  DialogHocFunctionInner:React.FC<mapStateType & madDispatchProps>=(props)=>{
        let {islogined,fake,...restProps}=props
        if (!islogined){
            return <Navigate to={'/login'}/>
        }
        return <WrapedComponent {...restProps as WCP}/>
    }

    let DialogHocFunctionInnerConnect=connect<mapStateType,madDispatchProps,WCP,AppstateType>(mapStateTopropsForRedirect,{fake:()=>{}})
    (DialogHocFunctionInner)
    return DialogHocFunctionInnerConnect
}
export function UsersHocFunction<WCP extends JSX.IntrinsicAttributes>(WrapedComponent:ComponentType<WCP>){
 const UsersHocFunctionInner:React.FC<mapStateType & madDispatchProps>=(props)=>{
    let {islogined,fake,...restProps}=props
   if(!islogined){
    return <Navigate to={'/login'}/>
   }
    return <WrapedComponent {...restProps as WCP}/>
 }
let UserHocFunctionInnerConnect=connect<mapStateType,madDispatchProps,WCP,AppstateType>(mapStateTopropsForRedirect,{fake:()=>{}})
(UsersHocFunctionInner)
return UserHocFunctionInnerConnect
}



type RouterType={
    location:Location,
    navigate:(to:string)=>void,
    params:any
}
type Router={
    router:RouterType
}
type Location={
    hash:string,
    key:string,
    pathname:string,
    search:string,
    state:null,
}

export function withRouterr<WCP extends Router>(Component:ComponentType<WCP>){
    const RouterComponent=(props : Omit<WCP,'Router'>)=>{
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
         return <Component {...props as WCP} router={{location,navigate,params}}/>
    }
    return RouterComponent
}

/// Training
export function WithSuspence<WCP extends JSX.IntrinsicAttributes >(WrappedComponent:ComponentType<WCP>){
    const SuspenceContainer=(props:WCP)=>{
       return <Suspense fallback={<div>loading</div>}>
        <WrappedComponent {...props}/>
       </Suspense>
    }
    return SuspenceContainer
}




