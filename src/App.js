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
function App() {
  const [page,setPage] = useState(<DesignForm></DesignForm>)
  const [sidebaron,setSidebaron] = useState(false);
  const offSideBar = ()=>{
    setSidebaron(false)
  }
  const turnOnSideBar = ()=>{
    setSidebaron(true)
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
        default:setPage(<DesignForm></DesignForm>)
    }
  }

  return (
    <div className="App">
      <Navbar
      first = "Magne"
      last = "trix.io"
      off = {offSideBar}
      list = {["Design Tool","Cores","Wires"]}
      changePage = {pageSwitchter}
      expand = {turnOnSideBar}
      >
      </Navbar>
      <SideBar
      off = {offSideBar}
      disabled = {!sidebaron}
      header = "Magnetrix.io"
      list = {["Design Tool","Cores","Wires"]}
      changePage = {pageSwitchter}
      expand = {turnOnSideBar}
      >
      


      </SideBar>
      <Backdrop
        off = {offSideBar}
        on = {sidebaron}
      ></Backdrop>
      {page}

    </div>
  );
}

export default App;
