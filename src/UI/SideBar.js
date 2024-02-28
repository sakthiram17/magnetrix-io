import React from 'react'
import { useEffect,useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './SideBar.css'
import { useContext } from 'react';
import AuthContext from './Context/auth-context';
import dp from "../dp.jpg"

const SideBar = (props)=>{
    let navElementList = props.list;
    let header = props.header;
    let navList = [];
    const LoginContext = useContext(AuthContext)
    // if(props.disabled)
    // {
    //     return(<div className = 'SideBar'></div>)
    // }
    if(LoginContext.isLoggedIn)
    { navList.push(<li onClick = {()=>{
        props.changePageAlt("Your Profile")
        }} key = {11} className='NavbarElement'><img src = {dp}
        style = {{height : '2rem',width:'2rem',borderRadius:'2rem'}}
          ></img></li>)} 

    for(var i = 0;i<props.list.length;i++)
    {
        if(props.list[i]==props.active)
            {
                navList.push(<li onClick = {props.changePage }key = {props.list[i]} className='SideBarElement Active1'>{props.list[i]}</li>)
            }
        else{
                navList.push(<li onClick = {props.changePage }key = {props.list[i]} className='SideBarElement'>{props.list[i]}</li>)
            }
            
            if(props.list[i] == "Login")
        {
            if(LoginContext.isLoggedIn===true)
            {
                navList.pop()
            }
            
        }
    }
    if(LoginContext.isLoggedIn===true)
        {
            navList.push(<li onClick = {()=>{LoginContext.logout();
            props.changePageAlt("Design Tool")
            }} key = {10} className='NavbarElement'>logout</li>) 
            
                
              
        }
   
    
  
    const closeClass =  props.disabled ? ' close' : ' open';
    const classes = closeClass + ' SideBar'; 
    const nav = (
      
        
        <div className={classes}>
        <ul>
        <li className ='close-icon' onClick = {()=>{
            props.off();
        }}>
            <FontAwesomeIcon icon = {faClose}></FontAwesomeIcon>
        </li>
        {navList}
       
        </ul>
        </div>
    );
    return nav;


}
export default SideBar