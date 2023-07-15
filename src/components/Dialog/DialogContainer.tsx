import React, { ComponentType } from "react";
import { connect } from "react-redux";
import { actions} from "../../redux/dialog-reducer";
import Dialog from "./Dialog";

import { compose } from "redux";
import { DialogHocFunction } from "../../hoc/withauthRedirect";
import { AppstateType } from "../../redux/redux-store";
type mapStateToPropsType={
    dialogs:Array<{id:string,name:string}>,
    messages:Array<{id:string,message:string}>,
    islogined:boolean|null
}
type actiontype={
    sendMessageCreator:(text:string)=>void
}
const mapStatetoProps=(state:AppstateType):mapStateToPropsType=>{
    return {
        dialogs:state.dialogPage.dialogs,
        messages:state.dialogPage.messages,
        islogined:state.auth.islogined
    }
}
let Dialogcontainer=compose<ComponentType>(
   connect <mapStateToPropsType,actiontype, null,AppstateType>(mapStatetoProps,{ 
    sendMessageCreator:actions.sendMessageCreator}) ,
   DialogHocFunction 
)(Dialog)


export default Dialogcontainer
