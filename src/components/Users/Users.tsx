import React from "react"
import s from "./Newuser.module.css"
import { NavLink } from "react-router-dom";
//@ts-ignorets
import picture from "../../assets/images/images.png";
import { user } from "../../types/types";
type PropsType={
  user:user,
  buttonDisabled:Array<number>,
  unFollowThunkCreator:(id:number)=>void,
  followThunkCreator:(id:number)=>void,
 }
const User :React.FC<PropsType> =({user,buttonDisabled,unFollowThunkCreator,followThunkCreator})=>{
    return  (
                 <div>
                    <span>
                       <div>
                          <NavLink  to={'/profile/'+ user.id }>
                         <img className={s.img} src={ user.photos.small != null? user.photos.small:picture } />
                          </NavLink>
                       </div>
                       <div>
                           {user.followed? <button disabled={buttonDisabled.some((id:number)=> {
                         return  id === user.id}
                           )}  
                            onClick={()=>{
                             unFollowThunkCreator(user.id)
                        }
                        } >Unfollow</button>:
                           <button    
                              disabled={buttonDisabled.some((id)=>{
                                return id===user.id
                              })}
                               
                            onClick={()=>{
                                followThunkCreator(user.id)
                        }
                            }>Follow</button>}
                       </div>
                    </span>
                    <span> 
                      <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                      </span>
                      <span>
                     <div>{'user.location.city'} </div>
                     <div> {'user.location.country'}</div>
                      </span>
                    </span>
                    </div>
    )
}
export default User