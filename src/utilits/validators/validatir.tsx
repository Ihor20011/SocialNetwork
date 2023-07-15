
export type FieldValidatorsType = (value:string)=>string|undefined
 
 export const requiredField:FieldValidatorsType=(value)=>{
    if (value) return undefined
     return 'Field is Reauired'
}
 export const maxLenght=(max:number):FieldValidatorsType=>{
    return (value)=>{
        if (value.length>max){
            return 'Erorr'
        }
        return undefined
    }
}


///Validators for dialog.js
export const requiredFieldforDialogs:FieldValidatorsType=(value)=>{
    if (value) return undefined
    return "idi naxyi"
}


export const maxLenghtDialogs=(max:number):FieldValidatorsType=>{
    return (value)=>{
        if (value.length>max){
            return "maxLenght is 20 "
        }
        return undefined
    }

}

