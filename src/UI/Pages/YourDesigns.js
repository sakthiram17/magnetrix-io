import axios from "axios";
import DesignCard from "./DesignCard";
import { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import AuthContext from "../Context/auth-context";
import "./Login.css"
import dp from "../../dp.webp"
const YourDesigns = ()=>{
        const [designs,setDesigns] = useState([])
        const LoginContext = useContext(AuthContext);
   
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
        },[])
        console.log(designs)
        return(
        <div className="your-design-page">
            


            {designs?designs.map((ele,index)=>{
                return <DesignCard
                key = {index}
                data = {ele}
                >

                </DesignCard>
            }):null}
        </div>
        )



}

export default YourDesigns;