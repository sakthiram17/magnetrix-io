import React from "react";
import { useContext,useState,useEffect} from "react";
import axios from "axios";
import dp from "../../dp.webp"
import AuthContext from "../Context/auth-context";
import { useSpring,animated } from "react-spring";
const YourProfile = (props)=>{
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
    return(
    <animated.div style = {fadeIn}>
    <div class="card-container">
	<span class={designs.length>=5?"PRO":"ROOKIE"}>{designs.length>=5?"PRO":"ROOKIE"}</span>
	<img class="round" src={dp} alt="user"
    style = {{width : '150px',height:'150px'}}
    />
	<h3>{LoginContext.credentials.name}</h3>
	<p>{LoginContext.credentials.email} <br/></p>
    <p>Total Designs : {designs.length}</p>

	<div class="skills">
		<h6>Recent Designs</h6>
		<ul>
			{designs.slice(0,5).map(ele=>{
                return (<li>{ele.name}</li>)
            })}
		</ul>
	</div>
</div>
</animated.div>
)
}

export default YourProfile;