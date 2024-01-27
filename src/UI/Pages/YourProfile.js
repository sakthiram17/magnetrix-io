import React from "react";
import { useContext,useState,useEffect} from "react";
import axios from "axios";
import dp from "../../dp.jpg"
import AuthContext from "../Context/auth-context";
import { useSpring,animated } from "react-spring";
import TopUsers from "./TopUsers";
function timeAgo(date) {
    var currentDate = new Date();
    var timeDifference = currentDate - date;
    var seconds = Math.floor(timeDifference / 1000);
    
    var interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    }

    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";
}

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

    let lastDesign = designs?designs[0]:null;
    let lastActive;
    if(lastDesign)
    {
        lastActive = timeAgo(new Date(lastDesign.data))
    }
    return(
    <animated.div style = {fadeIn}>
    <div className="card-container">
	<span className={designs.length>=5?"PRO":"ROOKIE"}>{designs.length>=5?"PRO":"ROOKIE"}</span>
	<img className="round" src={dp} alt="user"
    style = {{width : '150px',height:'150px'}}
    />
	<h3>{LoginContext.credentials.name}</h3>
	<p key = {1} className="generic-text-label-2">User ID : {LoginContext.credentials.email} <br/></p>
    <p className="generic-text-label-2">Total Designs : {designs.length}</p>
    {lastActive?  <p className="generic-text-label-2">Last Active : {lastActive}</p>:null}
	<div className="skills generic-text-label" >
		<h6>Recent Designs</h6>
		<ul>
			{designs.slice(0,5).map(ele=>{
                return (<li>{ele.name}</li>)
            })}
		</ul>
	</div>
</div>
<h1>Top Users</h1>
<TopUsers></TopUsers>
</animated.div>
)
}

export default YourProfile;