import axios from "axios";
import DesignCard from "./DesignCard";
import { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import AuthContext from "../Context/auth-context";
import "./Login.css"
import dp from "../../dp.webp"
import {animated,useSpring} from "react-spring"
const YourDesigns = ()=>{
        const [designs,setDesigns] = useState([])
        const LoginContext = useContext(AuthContext);
        const [isVisible,setVisible] = useState(false);
        const fadeIn = useSpring({
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.5)',
          });
        const fetchData = async ()=>{
            let resp;
            try{
                let url = LoginContext.credentials.email;
                url =url.replace(/[^a-zA-Z ]/g, "")
      
                resp = await axios.get(`https://parkingslot-690a3-default-rtdb.firebaseio.com/Designs/${url}.json`)
            }
            catch(err)
            {
          
            }
            return resp.data;
        }
        const updateData = async ()=>{
            let data;
            try{
                data = await fetchData();
            }
            catch(err)
            {

            }
            if(data)
            {
                setDesigns(Object.values(data).reverse())
            }
        }
        useEffect(()=>{
            updateData()
            setVisible(true)
        },[])
        console.log(designs)
        return(
           
        <div className="your-design-page">
            


            {designs?designs.map((ele,index)=>{
                return  <animated.div style = {fadeIn}>
                <DesignCard
                key = {index}
                data = {ele}
                >

                </DesignCard>
                </animated.div> 
                
            }):null}
        </div>

        )



}

export default YourDesigns;