import React from "react";
import Paginator from "./paginator";
import User from "./Users";
import { Formik, } from "formik";
import { Form } from "formik";
import { Field } from "formik";
import { FilterType, GetUserThunkCreator } from "../../redux/users-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { unFollowThunkCreator,followThunkCreator } from "../../redux/users-reducer";
import { getButtonDisabled, getCurrentPage, getFilter, getPageSize, getTotalUserCount, getUserSuperCelector, } from "../../redux/users-celectors";
import { AppstateType } from "../../redux/redux-store";
type NewUserType={}
let NewUser: React.FC<NewUserType>=()=>{
      const totalUserCount=useSelector(getTotalUserCount)
      const pageSize=useSelector(getPageSize)
      const currentPage=useSelector(getCurrentPage)
      const users=useSelector(getUserSuperCelector)
      const buttonDisabled=useSelector(getButtonDisabled)
      const filter=useSelector(getFilter)
      const dispatch=useDispatch();
      const onFilterChange=(filter:FilterType)=>{
         dispatch(GetUserThunkCreator(currentPage,pageSize,filter) as unknown  as AnyAction) ///check this shit
       }
       const onPageChange=(pageNumber:number)=>{
        dispatch(GetUserThunkCreator(pageNumber,pageSize,filter) as unknown as AnyAction )
       }
        const  follow=(id:number)=>{
          dispatch(followThunkCreator(id) as unknown as AnyAction)
        }
        const unfollow=(id:number)=>{
          dispatch(unFollowThunkCreator(id)as unknown as AnyAction)
        }
        const getUser=(currentPage:number,pageSize:number,filter:FilterType)=>{
          dispatch(GetUserThunkCreator(currentPage,pageSize,filter) as unknown as AnyAction)
         }
         
         const Urlnavidate=useNavigate();
         const location=useLocation();
         const [params]=useSearchParams(location.search);
         const parsed=Object.fromEntries(params) as parsedType;
         type parsedType={
           term:string,
           friend:string,
           page:string
         }
         useEffect(()=>{
          let actualpage=currentPage;
          let actualFilter=filter;
          if(parsed.page){
            actualpage=+parsed.page
          }
          if (parsed.page){
            actualpage=+parsed.page
          }
          if (parsed.term){
            actualFilter={...actualFilter,term:parsed.term}
          }
          switch(parsed.friend){
            case 'null':{
             actualFilter={...actualFilter,friend:null}
             break
            }
            case 'false':{
              actualFilter={...actualFilter,friend:false}
              break
            }
            case "true":{
              actualFilter={...actualFilter,friend:true}
              break
            }
          }
          getUser(actualpage,pageSize,actualFilter)
         },[])

         useEffect(()=>{
          Urlnavidate({search:`term=${filter.term}&friend=${filter.friend}&page=${currentPage}`})
         },[filter,currentPage])
    return(
            <div>
              <SerarchFormikForm onFilterChange={onFilterChange}/>
               {/* <FormikIhor onFilterchange={onFilterchange}/> */}
               <Paginator  totalItemsCount={totalUserCount} 
               pageSize={pageSize} currentPage={currentPage}
               onPageChange={onPageChange}/>
               <div>
            {
                users.map((u)=>{
                    return <User  user={u}  buttonDisabled={buttonDisabled}
                    unFollowThunkCreator={unfollow}
                    followThunkCreator={follow}
                    />
            })}
               </div>
             </div>
    )
}

type PropsType={
  onFilterChange:(filter:FilterType)=>void
}
const validate=(values:FilterType)=>{
const errors={}
return errors
}
const SerarchFormikForm:React.FC<PropsType>=(props)=>{
  console.log('here')
  const filter=useSelector((state:AppstateType)=>state.usersPage.filter)
  const submit=(values:FilterType,{setSubmitting}:{setSubmitting:(isSubmitting: boolean)=>void})=>{
    setSubmitting(false);
    props.onFilterChange(values)
  }
return(
       <div>
          <Formik  enableReinitialize={true}  initialValues={{term:filter.term,friend:filter.friend}} validate={validate} onSubmit={submit} >
          {(isSubmitting)=>(
            <Form>
              <Field type='text' name='term'/>
              <Field name='friend' as="select" >
               <option value='null'>all</option>
               <option value='true'>my friends</option>
               <option value='false'>my enemies</option>
              </Field>
              <button>Find</button>
            </Form>
          )}
          </Formik> 
       </div>
)
}

export default NewUser

