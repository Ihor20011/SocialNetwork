import axios from "axios";
import React, { ComponentType } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import {logOutThunkCreator } from "../../redux/auth-reducer"; ///setUserData
import { AppstateType } from "../../redux/redux-store";
import { compose } from "redux";
type PropsType= mapDispatchToPropsType & mapStateToPropsType
type mapDispatchToPropsType={
    logOutThunkCreator:()=>void
}
type mapStateToPropsType={
    login:string|null,
    islogined:boolean|null
}
const HeaderContainer:React.FC<PropsType>=(props)=>{
    return(
        <Header {...props} />
    )
}
const mapStateToProps=(state:AppstateType):mapStateToPropsType=>{
    return{
        login:state.auth.login,
        islogined:state.auth.islogined

    }
}
 const HeaderConectContainer=compose<ComponentType>(
    connect<mapStateToPropsType,mapDispatchToPropsType,null,AppstateType>(mapStateToProps,{logOutThunkCreator})
 )(HeaderContainer)


export default  HeaderConectContainer




