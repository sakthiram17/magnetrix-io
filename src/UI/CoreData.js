
import React from "react";
import { useState } from "react";
import Constants from "./Constants";
import Wire from "./Wire";

const CoreData = (props)=>{
    const showDesignHandler = (inductance,peak_current)=>{
        let turn = inductance*peak_current/(Constants.flux_density*props.core['Core Area']);
        setTurns(parseInt(turn))
    }
    const [turns,setTurns] = useState(null)
    if(!props.core)
    {
        return  <p>help </p>
    }
    let resistance = props.core['Mean Turn Length'] * Constants.rho *1000000 /(Wire.find(obj=>(obj.name === props.parameters.minWire
    ))).Area * turns;
    return(
    <div className = "core-design">
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
        </React.Fragment> : null
        }
        </div>
    )

}
export default CoreData;