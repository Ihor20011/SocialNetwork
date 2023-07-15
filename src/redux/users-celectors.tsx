import { createSelector } from "reselect"
import { AppstateType } from "./redux-store"

    const getUsers=(state:AppstateType)=>{
    return state.usersPage.users
}
export const getUserSuperCelector=createSelector(getUsers,(users)=>{
   return users.filter((u)=>true)
})

export const getPageSize=(state:AppstateType)=>{
    return state.usersPage.pageSize
}
export const getTotalUserCount=(state:AppstateType)=>{
    return state.usersPage.totalUserCount
}
export const getCurrentPage=(state:AppstateType)=>{
    return state.usersPage.currentPage
}
export const  getIsfetching=(state:AppstateType)=>{
    return state.usersPage.isfetching
}
export const getButtonDisabled=(state:AppstateType)=>{
    return state.usersPage.buttonDisabled
}
export const getFilter=(state:AppstateType)=>{
    return state.usersPage.filter
}