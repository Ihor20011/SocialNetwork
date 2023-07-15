import React ,{PureComponent} from "react"; 
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import s from "./MoPosts.module.css"
import Post from "./Post/Post";
import { requiredField,maxLenght } from "../../../utilits/validators/validatir";
import { Textarea } from "../../common/preloader/formcontrol/formControl";
const maxLenght10=maxLenght(10)
type formFieldPropertiesType={
  adderMassage:string
}
let MoPostsForm:React.FC<InjectedFormProps<formFieldPropertiesType>>=(props)=>{
  return(
    <form  onSubmit={props.handleSubmit}>
      <Field  placeholder="hellow" component={Textarea} name ={'adderMassage'} 
      validate={[requiredField,maxLenght10]}
       />
     <button>add</button>
    </form>
  )
}
let ReduxForm=reduxForm<formFieldPropertiesType>({
  form:'my-Post'
})(MoPostsForm)

type PropsType={
  addpost:(text:string)=>void
  posts:Array<post>
}
type post={
  id:string|number,
  msg:string,
  like:number
}
 const MoPosts:React.FC<PropsType>=React.memo((props)=>{
   const add=(values:formFieldPropertiesType)=>{
   props.addpost(values.adderMassage)
   }
   let postElements=props.posts.map((p)=>{
    return <Post message={p.msg} likecount={p.like} />
    })
    //
   //
    return(
     <div className={s.postsblock}>
         <h3>My posts</h3>
         <div>
          <ReduxForm  onSubmit={add}/>
       </div>
         <div className={s.posts}>
         {postElements}
         </div>
       </div>
     )
 })
export default MoPosts