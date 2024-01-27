import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"
import Modal from "../Modal";
import Card from "../Card";
import dp from "../../dp.jpg"
import "./Login.css"
const TopUsers = (props)=>{
    const [topDesigners,setTopDesigners] = useState(null);
    const getUsersData = async ()=>{
        
        let resp;
        try{
            resp =  await axios.get(`https://parkingslot-690a3-default-rtdb.firebaseio.com/Designs.json`)
            if(resp)
            {
                return resp.data;
            }
            console.log(resp)
        }
        catch(err)
        {

        }
        return null;
      
    }
  
    
    useEffect(()=>{
        getUsersData().then(res=>{
          let keys = Object.keys(res);
          let values = Object.values(res);
          let topDesigners = {}
          for(let i = 0;i<keys.length;i++)
          {
            topDesigners[keys[i]] = values[i]?Object.values(values[i]).length:0; 
          }
          let sortedTopDesignersArray = Object.entries(topDesigners);
        sortedTopDesignersArray.sort((a, b) => b[1] - a[1]);
        sortedTopDesignersArray =  sortedTopDesignersArray.slice(0,5)
          setTopDesigners(sortedTopDesignersArray);
        });
    },[])
    return(
    <div>
        {topDesigners?topDesigners.map(ele=>{
            return <Card key = {ele[0]} code = 'modal-card'>
                <img className="round" src={dp} alt="user"
                style = {{width : '100px',height:'100px'}}
                />
                <p className="generic-text-label">User ID : {ele[0]}</p>
                <p className="generic-text-label">Designs : {ele[1]}</p>
            </Card>
        }):null}
     
    </div>
    )



}
export default TopUsers;