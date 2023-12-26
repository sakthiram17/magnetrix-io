import logo from './logo.svg';
import './App.css';
import Card from './UI/Card';
import Input from './UI/Input';
import DesignForm from './UI/DesignForm';
import Navbar from "./UI/Navbar"
import React from 'react';
import { useState } from 'react';
import CoreList from './UI/Pages/CoresList';
import WiresList from './UI/Pages/WiresList';
import SideBar from "./UI/SideBar"
import Backdrop from "./UI/Backdrop/Backdrop"
import Constants from './UI/Constants';
import LoadingSpinner from './UI/LoadingSpinner';
import Modal from './UI/Modal';
import YourDesigns from './UI/Pages/YourDesigns';
import Login from "./UI/Pages/Login"
import AuthContext from './UI/Context/auth-context';
import { useCallback } from 'react';
function App() {
  const [page,setPage] = useState(<DesignForm></DesignForm>)
  const [sidebaron,setSidebaron] = useState(false);
  const [isLoggedIn,setLoggedIn] = useState(false);
  const [credentials,setCredentials] = useState({})
  const offSideBar = ()=>{
    setSidebaron(false)
  }
  const turnOnSideBar = ()=>{
    setSidebaron(true)
  }
  const login = useCallback(()=>{
    setLoggedIn(true);
  },[])
  const logout = useCallback(()=>{
    setLoggedIn(false);
    
  },[])

  const setCreds = useCallback((credentials)=>{
    setCredentials(credentials)
    
  },[])
  const pageChanger = (page)=>{
    switch(page)
    {
      case 'Design Tool':
        setPage(<DesignForm></DesignForm>)
        break;
      case 'Cores' :
        setPage(<CoreList></CoreList>)
        break;
      case 'Wires':
        setPage(<WiresList></WiresList>)
        break;
        default:setPage(<DesignForm></DesignForm>)

    }
  }
  
  const pageSwitchter = (event)=>{
    let pageToDisplay = event.target.innerHTML;

    switch(pageToDisplay)
    {
      case 'Design Tool':
        setPage(<DesignForm></DesignForm>)
        break;
      case 'Cores' :
        setPage(<CoreList></CoreList>)
        break;
      case 'Wires':
        setPage(<WiresList></WiresList>)
        break;
      case 'Your Designs':
        setPage(<YourDesigns></YourDesigns>)
        break;
      case 'Login':
        setPage(<Login changePage = {pageChanger}></Login>)
        break;
      default:setPage(<DesignForm></DesignForm>)
    }
  }
  let list = ["Design Tool","Cores","Wires","Login"]
  if(isLoggedIn)
  {
    list.push("Your Designs")
  }

  return (
    <div className="App">
      <AuthContext.Provider value = {{isLoggedIn:isLoggedIn,login:login,logout:logout,credentials:credentials,setCreds:setCreds }}>
      <Navbar
      first = "Magne"
      last = "trix.io"
      off = {offSideBar}
      list ={list}
      changePage = {pageSwitchter}
      changePageAlt = {pageChanger}
      expand = {turnOnSideBar}
      >
      </Navbar>
      <SideBar
      off = {offSideBar}
      disabled = {!sidebaron}
      header = "Magnetrix.io"
      list = {list}
      changePage = {pageSwitchter}
      changePageAlt = {pageChanger}
      expand = {turnOnSideBar}
      >
      


      </SideBar>
      <Backdrop
        off = {offSideBar}
        on = {sidebaron}
      ></Backdrop>
      {page}

      </AuthContext.Provider>
    </div>
  );
}

export default App;
