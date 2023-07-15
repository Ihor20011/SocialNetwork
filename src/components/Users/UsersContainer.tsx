import React, { useEffect } from "react";
//@ts-ignore i have to check this moment later
import { connect, useDispatch, useSelector } from "react-redux";
import NewUser from "./NewUser";
import Preloader from "../common/preloader/preloader";
import {  getIsfetching,} from "../../redux/users-celectors"; 
type PropsType={}
   let UsersApi : React.FC<PropsType>=()=>{
     const isfetching=useSelector(getIsfetching);
     const dispatch=useDispatch();
    return(
      <div> 
      {
      (isfetching? <Preloader/>:null)
      }
    <NewUser/>
  </div>
    )
   }
  export default UsersApi
  