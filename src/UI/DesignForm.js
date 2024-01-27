import Card from "./Card";
import Input from "./Input";
import { useEffect,useState,useReducer} from "react";
import TopUsers from "./Pages/TopUsers";
import "./Buttons.css"
import CoreData from "./CoreData";
import React from "react";
import Wire from "./Wire";
import { v4 as uuid } from 'uuid';
import { useSpring, animated,useTransition } from 'react-spring';
import Constants from "./Constants";
const coreList = [
    {
      "SKU": "ETD-29/16/10",
      "Core Area": 76,
      "Window Area": 95,
      "Area Product": 14440,
      "Mean Turn Length": 53
    },
    {
      "SKU": "ETD 34/17/11",
      "Core Area": 97.1,
      "Window Area": 123,
      "Area Product": 23800,
      "Mean Turn Length": 60
    },
    {
      "SKU": "ETD 39/20/13",
      "Core Area": 123,
      "Window Area": 177,
      "Area Product": 44420,
      "Mean Turn Length": 69
    },
    {
      "SKU": "ETD 44/22/15",
      "Core Area": 173,
      "Window Area": 214,
      "Area Product": 74000,
      "Mean Turn Length": 77
    },
    {
      "SKU": "ETD 49/25/16",
      "Core Area": 221,
      "Window Area": 273,
      "Area Product": 115200,
      "Mean Turn Length": 85
    },
    {
      "SKU": "ETD 54/28/19",
      "Core Area": 280,
      "Window Area": 316,
      "Area Product": 176736,
      "Mean Turn Length": 96
    },
    {
      "SKU": "ETD 59/31/22",
      "Core Area": 368,
      "Window Area": 366,
      "Area Product": 270000,
      "Mean Turn Length": 106
    }

  ]

 



const DesignForm = (props)=>{
    const [isValid,setValidity] = useState([false,true,true])
    const [areaProduct,setAreaProduct ]= useState(0);
    const [parameters,setParameters] = useState({
        inductance: 0,
        peak: 0,
        rms : 0,
        windingFactor :0.2,
        minWire:0,
        title:''

    })
    const [chosenWire,setChosenWire] = useState(null);
    

    const actionHandler = (prevState,action)=>{
      let newStateObject = null;
      switch(action.type)
      {
          case 'ADD_ANIM':newStateObject = [...prevState];
                          
                          const lastTrueIndex = newStateObject.findIndex((ele) => ele.style);
                          if (lastTrueIndex !== -1) {
                            newStateObject[lastTrueIndex].style = null;
                          }
                          return newStateObject;

          case 'ADD' :newStateObject= [...prevState]
                      let core = action.core;
                      core.style= {opacity:0.5,
                        transform: "translateX(-40vw)",
                                 transform : "scale(0.5)",
                                 transition: '0.15s'
                    };
                      newStateObject.push(core)
                     
 
          return newStateObject;
          
          case 'DEL':newStateObject = [...prevState];
                     newStateObject = newStateObject.filter(ele=>{
                      return ele!=action.core;
                     })
          return newStateObject;
          case 'DEL_ANIM' :newStateObject= [...prevState];
                          for(var i = 0;i<newStateObject.length;i++)
                            {
                              if(action.core==newStateObject[i])
                              {
                                newStateObject[i].style= {opacity:0.5,
                                  transform: "translateX(-40vw)",
                                 transform : "scale(0.5)",
                                 transition: '0.15s'
                                };
                              }
                            }
            return newStateObject;
            case 'RESET': return []
            
                          }}
    const simpleCoreAdder = (core)=>{
      dispatch({type : 'ADD',core:core})
      setTimeout(()=>{
        dispatch({type : 'ADD_ANIM',core : core})
      },150)
    }
    const removeCoreHandler = (core)=>{
      dispatch({type : 'DEL_ANIM',core:core})
      setTimeout(()=>{
        dispatch({type : 'DEL',core : core})
      },150)
    }
    const wireChangeHandler = (event)=>{
      setChosenWire(event.target.value);
      dispatch({type : 'RESET'})
    }
    const [validCores,dispatch] = useReducer(actionHandler,[])
    const coreDisplayHanlder= ()=>{
        dispatch({type : 'RESET'})
        let res = coreList.filter(
            (ele)=>{
                if(ele["Area Product"] >= areaProduct)
                    simpleCoreAdder(ele)
                return ele["Area Product"]>=areaProduct;

            }
        )

      
        let temp = [...res];
   
    }

    const calculateAreaProduct = (L,Irms,Ipeak)=>{
        let num = L*Irms*Ipeak*(10**(-6))
        let magneticFluxDensity = 0.2;
        let dem = (parameters.windingFactor)*magneticFluxDensity * 3 *(10**6);
        return Math.round((num/dem)*(10**12))
    }
    
    const sliderChangeHandler = (event)=>{
      let temp = {...parameters}
      temp.windingFactor = event.target.value/100
      dispatch({type : 'RESET'})
      setParameters(temp);
    }
    const NumberFieldOnChange = (event)=>{
        let flag = true;
        let minWire = '';
      
        
        if(isNaN(event.target.value))
        {
            flag = false;
        }
        else if(event.target.value<=0)
        {
            flag = false;
        }
       let index = event.target.getAttribute('index')
       if(index==0)
       {
        let tempParameters = parameters;
        tempParameters.inductance = event.target.value;
        setParameters(tempParameters)
       }
       if(index==1)
       {
        let tempParameters = parameters;
        tempParameters.rms = event.target.value;
        let minWire;
        for(let i = 0;i<Wire.length;i++)
        {
          if(Wire[i].Current>=tempParameters.rms)
          {
            minWire = Wire[i].name;
            setChosenWire(minWire)

          }
        }
        
        tempParameters.minWire = minWire;
        setParameters(tempParameters)
      }
       if(index==2)
       {
        let tempParameters = parameters;
        tempParameters.peak = event.target.value;
        setParameters(tempParameters)
        if(tempParameters.peak>=30)
        {
          flag = false;
        }
      }
       
      if(index==3)
      {
        let tempParameters = parameters;
        tempParameters.title = event.target.value;
        setParameters(tempParameters)
      }
      setAreaProduct(calculateAreaProduct(
        parameters.inductance,parameters.rms,parameters.peak
       ))
       let updatedValidity = [...isValid]
       updatedValidity[index] = flag;
       if(!parameters.minWire)
        {
          updatedValidity[1] = false;
          setAreaProduct(0);
        }
       setValidity(updatedValidity)
       dispatch({type : 'RESET'})
    }
    let suitableWires = Wire.filter((ele)=>{
      return ele.Current>= parameters.rms
    })
    const selectedWireData = Wire.find(ele=>{
      return ele.name === chosenWire
    })
  
    return(
        <div className="parent-container">
        
        <Card>
        <div className = 'form-inductor-design form-label login-box'>
      
            
            <Input
            type = "number"
            label = "Inductance (&micro;H)"
            place = "Enter inductance in mH and uH"
            valid = {isValid[0]}
            ind = {0}
            handleChange= {NumberFieldOnChange}
            ></Input>
              <Input
            type = "number"
            label = "RMS current in(A)"
            place = "Enter the RMS current in A"
            valid = {isValid[1]}
            ind = {1}
            handleChange= {NumberFieldOnChange}
            ></Input>
            <Input
            type = "number"
            label = "Peak current(A)"
            place = "Enter the Peak current in A"
            valid = {isValid[2]}
            ind = {2}
            handleChange= {NumberFieldOnChange}
            ></Input>
              <Input
            type = "text"
            label = "Project Title (Optional)"
            place = "Title "
            valid = {true}
            ind = {3}
            handleChange= {NumberFieldOnChange}
            ></Input>
             <button
             disabled = {!isValid[0] || !isValid[1] || !isValid[2]}
             className="btn-primary"
             onClick = {coreDisplayHanlder}
             >
             Show suitable Cores
            </button>
            </div>
          </Card>
            <Card>
            {areaProduct ?
             <React.Fragment>
            <div className='generic-text-label'>
             Area Product (req) : {calculateAreaProduct(parameters.inductance,parameters.rms,parameters.peak)} mm<sup>4</sup>
            </div> 
           </React.Fragment>
            : null}


            {parameters.minWire ?
            <div className='generic-text-label'>
             Wire Required : {parameters.minWire}
           </div>: parameters.rms ? <div className="generic-text-label">
            RMS current too High
            </div>:null
            }
            <div className="selected-wire-parent">
            <p className="generic-text-label">Winding Factor : {parameters.windingFactor}</p>
            <input type="range" min="5" max="100" step = "5" className="slider"
            onChange={sliderChangeHandler}
            ></input>
            <div>
                 <div className="generic-text-label">
                  Choose a Wire
                 </div>
                  <select
                id="wireSelection"
                name="wireSelection"
                value={chosenWire}
                onChange={wireChangeHandler}
                
           style={{ padding: '8px', borderRadius: '5px', background: '#555', color: '#fff' }}
           >
            <option value="">Select a Wire</option>
            {suitableWires.map((wire) => (
            <option key={wire.name} value={wire.name}>
            {wire.name}
            </option>
            ))}
           </select>
            </div>
            {chosenWire && (
            <div style={{ marginTop: '20px' }} className="selected-wire" >
             {chosenWire && <div >
              
              <p>Selected Wire: {chosenWire}</p>
              <p>Max Current Rating : {selectedWireData.Current} A</p>
              <p>Resistance per Meter : {((Constants.rho/(selectedWireData.Area))*1000*(10**(6))).toFixed(2)} mΩ</p>
              
               </div>}
            </div>
            )}
            </div>
            </Card>
        
        
               <div>
                {
                validCores&& validCores.map((ele,index)=>{
                  return ( 
                    <Card   key = {ele['SKU']} >
                  
                    <CoreData
                     core= {ele}
                     parameters = {parameters}
                     removeCore = {removeCoreHandler}
                     style = {ele.style}
                     selectedWire = {selectedWireData}
                     key = {ele['SKU']}
                     >
                     </CoreData>
                     </Card>)

                })
                  
                }
            </div>
            </div>

    )


}
export default DesignForm;