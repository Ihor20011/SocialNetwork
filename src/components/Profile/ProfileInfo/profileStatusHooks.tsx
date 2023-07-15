import React, { ChangeEvent, useEffect, useState } from "react";
type PropsType={
    status:string,
    UpdateStatusThunkCreator:(status:string)=>void
}
const ProfileStatusHook:React.FC<PropsType>=(props)=>{
    ///hooks
    let [editMode,changeEditMode]=useState(false as boolean);
    let [status,changeStatus]=useState(props.status as string);
    useEffect(()=>{
        changeStatus(props.status)
    },[props.status]);
    ///
    const openEdit=()=>{
        changeEditMode(true)
    }
    const closeEdit=()=>{
        changeEditMode(false);
        props.UpdateStatusThunkCreator(status)
    }
    const onchange=(e:ChangeEvent<HTMLInputElement>)=>{
    changeStatus(e.currentTarget.value)
    }
    return(
        <div>
                {!editMode&&
                <div>
                    <b>Status:</b>  <span onClick={openEdit}  > {status || 'minus' } </span>
                </div>
                 }
                 {editMode&&
                 <div>
                    <input  onChange={onchange} onBlur={closeEdit}   autoFocus={true} 
                     value={status}
                    />
                </div>
                }
            </div>
    )
}
export default ProfileStatusHook
