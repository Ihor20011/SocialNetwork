//@ts-ignore
import logo from './logo.svg';
import React, { Component, ComponentType, useEffect, useState } from 'react';
import { Suspense } from 'react';
import './App.css';
import Nav from './components/Navbar/Navbar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderConectContainer from './components/Header/Header-container';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { initialThunkCreator } from './redux/app-reducer';
import Preloader from './components/common/preloader/preloader'; 
import { AppstateType} from './redux/redux-store';
import { compose } from 'redux';


const Dialogcontainer = React.lazy(() => import('./components/Dialog/DialogContainer'));
const UsersContainer = React.lazy(()=> import ('./components/Users/UsersContainer'));
const ChatLazy=React.lazy(()=> import('./pages/Chat'))


type MapPropsType=ReturnType<typeof mapStateToProps>
type DispatchPropsType={
  initialThunkCreator:()=>void
}

class AppC extends Component<MapPropsType & DispatchPropsType>{
  componentDidMount(){
   this.props.initialThunkCreator()
  }
  render(){
    if (!this.props.isInitial){
      return <Preloader/>
    }
    return(
      <BrowserRouter>
       <div className='app-wrapper'>
        <HeaderConectContainer/>
        <Nav/>
        <div className='app-wrapper-content'>
          <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route path='/' element={<Navigate to={'/profile'} />}/>  
          <Route path='/profile/:id?' element={<ProfileContainer/>}/>
          <Route path='/dialogs' element={<Dialogcontainer/>}/>
          <Route path='/users' element={<UsersContainer/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/chat' element={<ChatLazy/>} />
          <Route path='*' element={<div>404 Not FOUND</div>} />
        </Routes>
          </Suspense>
        </div>
      </div>
      </BrowserRouter>
    )
  }
}
const mapStateToProps=(state:AppstateType)=>{
return {
  isInitial:state.app.isInitial
}
}
const App=compose<ComponentType>(connect(mapStateToProps,{initialThunkCreator}))(AppC)        
export default App 

























 