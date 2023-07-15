import React, { Component, ComponentType } from "react";
import { useLocation,useNavigate,useParams } from "react-router-dom";
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
export function withRouter<WCP extends Router>(Component:ComponentType<WCP>){
    const RouterComponent=(props:Omit<WCP,'Router'>)=>{
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
         return <Component {...props as WCP} router={{location,navigate,params}}/>
    }
    return RouterComponent
}


