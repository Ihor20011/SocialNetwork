
export const updateObjectInArray=(items,itemId,objPropName,newObjPropsNAme)=>{
    return items.map((u)=>{
        if (u[objPropName]===itemId){
            return{...u,...newObjPropsNAme}
        }
        return u
    })
}


