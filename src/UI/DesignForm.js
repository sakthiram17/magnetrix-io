import Card from "./Card";
import Input from "./Input";
import { useEffect,useState } from "react";
import Reacteact from "react";
import "./Buttons.css"
import CoreData from "./CoreData";
import React from "react";
import Wire from "./Wire";
import { useSpring, animated,useTransition } from 'react-spring';
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
      "Window Area": 117,
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
      "Window Area": 270,
      "Area Product": 115200,
      "Mean Turn Length": 85
    }
  ]

 



const DesignForm = (props)=>{
    const [isValid,setValidity] = useState([false,true,true])
    const [areaProduct,setAreaProduct ]= useState(0);
    const [rightCores,setRightCores] = useState([])
    const [isVisible,setVisible] = useState(false)
    const [mainPage,setMainPage] = useState(false)
    const [parameters,setParameters] = useState({
        inductance: 0,
        peak: 0,
        rms : 0,
        windingFactor :0.2,
        minWire:0,
        title:''

    })

    useEffect(()=>{
      setMainPage(true)
    },[])
    const fadeIn = useSpring({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(0.5)',
    });
    const fadeInMain = useSpring({
      opacity: mainPage ? 1 : 0,
      transform: mainPage ? 'scale(1)' : 'scale(0.5)',
    })
    const removeCoreHandler = (core)=>{
        let temp = [...rightCores]
        temp = temp.filter((ele)=>{
          return ele!=core;
        })
        setRightCores(temp)
    }
    const coreDisplayHanlder = ()=>{
        let res = coreList.filter(
            (ele)=>{
                return ele["Area Product"]>=areaProduct;
            }
        )
        setVisible(true)
      
        let temp = [...res];
        setRightCores(temp)
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
       
    }

    return(
        <div className="parent-container">
          <animated.div style = {fadeInMain}>
        <Card>
        <div className = 'form-inductor-design form-label'>
            
            
            
            <Input
            type = "number"
            label = "Inductance (uH)"
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
            <div>
            <p className="generic-text-label">Winding Factor : {parameters.windingFactor}</p>
            <input type="range" min="5" max="100" step = "5" className="slider"
            onChange={sliderChangeHandler}
            ></input>
            </div>
         
            </Card>
        
        
               <div>
                {
                rightCores.map((ele,index)=>{
                  return ( 
                    <Card >
                     <animated.div 
                     style={fadeIn}>
                    <CoreData
                     core= {ele}
                     parameters = {parameters}
                     removeCore = {removeCoreHandler}
                     >
                     </CoreData>
                     </animated.div>
                     </Card>)

                })
                  
                }
            </div>
            </animated.div>
            </div>

    )


}
export default DesignForm;