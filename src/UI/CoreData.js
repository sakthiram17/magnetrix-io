
import React, { useEffect } from "react";
import { useState } from "react";
import Constants from "./Constants";
import Wire from "./Wire";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";
import AuthContext from "./Context/auth-context";
import { useContext } from "react";
const CoreData = (props)=>{
    const showDesignHandler = (inductance,peak_current)=>{
        let turn = inductance*peak_current/(Constants.flux_density*props.core['Core Area']);
        setTurns(Math.ceil(turn))
        setTurns((turn)=>{
            designChecker(turn)
            return turn;
        })
    }
    useEffect (()=>{
        setTurns(null)
    },[props.core])

    const [modalState,setModalState] = useState(null)
    const [spinner,setSpinner ] = useState(null)
    const [isValid,setValidity] = useState(true)
    const [turns,setTurns] = useState(null)
    const LoginContext = useContext(AuthContext);
    
    
    let length =  Math.ceil(turns) * props.core['Mean Turn Length']/10;
    if(!props.core)
    {
        return  <p>help </p>
    }
    let resistance;

    let area= 0;
    if(props.selectedWire)
    {
        area = props.selectedWire.Area;
    }

    if(props.parameters.minWire)
    {
         resistance = Constants.rho*length*0.01*1000/(area*10**(-6));
    }
    const designChecker = (turn)=>{
        let t1 = area*turn;
        let t2 = props.parameters.windingFactor * props.core['Window Area'];
        if (t2>=t1)
        {
            setValidity(true)
        }
        else{
            setValidity(false)
        }

    }

    const postData = ()=>{
            setSpinner(<LoadingSpinner></LoadingSpinner>)
            let url = LoginContext.credentials.email;
            url =url.replace(/[^a-zA-Z ]/g, "")
            axios.post(`https://parkingslot-690a3-default-rtdb.firebaseio.com/Designs/${url}.json`,
                {
                    core:props.core,
                    parameters:props.parameters,
                    name :props.parameters.title,
                    data:new Date(),
                    resistance:resistance,
                    turns:turns,
                    length:length,
                    power:props.parameters.rms * props.parameters.rms * Math.ceil(resistance)/1000,
                    selectedWire:props.selectedWire
                }
     
            
            ).then(()=>{
                setSpinner(null)
                setModalState(<Modal code = "success" disabled = {false}>
                    Successfully Stored Your Design in Server
                </Modal>
                )
                setTimeout(() => {
                    setModalState(null)
                }, 1000);

            }).catch((err)=>{
                setSpinner(null)
                setModalState(<Modal code = "error" disabled = {false}>
                    Something went wrong try again later
                </Modal>
                )
                setTimeout(() => {
                    setModalState(null)
                }, 1000);
                
            })
     


    }

    return(
    <div  className = {`core-design + ${props.class}`} style = {{...props.style,transition:'0.15s'}}>
        <div className='generic-text-label'>
            {props.core['SKU']}
        </div>
        <div className='generic-text-label'>
            Area Product : {props.core['Area Product']} mm<sup>4</sup>
        </div>

        <div className='generic-text-label'>
          Window Area :  {props.core['Window Area']} mm<sup>2</sup>
        </div>
        <div className='generic-text-label'>
            Core Area : {props.core['Core Area']} mm<sup>2</sup>
        </div>
        <div className="card-secondary">
        <button className ='btn-secondary' onClick={()=>{
            showDesignHandler(props.parameters.inductance,props.parameters.peak)
        }}>
            Show Design
        </button>
      
       {turns ? 
       <React.Fragment>
            <div className='generic-text-label'>
                Design Requirements
            </div>
            <div className="generic-text-label">
                Turns required: {Math.ceil(turns)}
            </div>
            <div className="generic-text-label">
             DCR (max) mΩ : {Math.ceil(resistance)}
            </div>
            <div className="generic-text-label">
             Power Loss : {props.parameters.rms * props.parameters.rms * Math.ceil(resistance)/1000} W
            </div>
            <div className="generic-text-label">
             Length : {length} cm
            </div>
        </React.Fragment> : null
        }
         {isValid?
       <div>
        {LoginContext.isLoggedIn && turns?<button className="btn-primary" onClick = {
            
            ()=>{
                postData()
                setTimeout(()=>{
                    props.removeCore(props.core)},1000)
            }
            
            }>
            Save Design in Server
        </button>:null}
        
        <button className="btn-primary" onClick = {()=>{
            props.removeCore(props.core)
        }}>
            Discard
        </button>
       </div> : 
       <React.Fragment> 

        <button className="btn-primary" onClick = {()=>{
            props.removeCore(props.core)
        }}>
            Discard
        </button>
        <div className='generic-text-label'>Invalid Design</div>
       </React.Fragment>
      
        }
        {spinner}
        {modalState}
        </div>
        </div>
    )

}
export default CoreData;