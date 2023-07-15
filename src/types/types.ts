 export  type postType={
    id:string|number,msg:string,like:number
   }
  export type contactsType={
    github:string,
    vk:string,
    facebook:string,
    instagram:string,
    twitter:string,
    website:string,
    youtube:string,
    mainLink:string
  }
  export type photos={
    small: string|null,
    large: string|null,  
}
export type profile={
    aboutMe:string,
    userId:number,
    lookingForAJob:boolean,
    lookingForAJobDescription:string,
    fullName:string ,
    contacts:contactsType,
    profileStatusUpsate:null
    photos:photos,
    status:string
  }
  ///user type 
  export type user={
    name:string,
    id:number,
    status:string,
    photos: photos,
    followed:boolean
    }

