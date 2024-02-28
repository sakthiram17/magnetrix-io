import axios from "axios";
import DesignCard from "./DesignCard";
import { useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import AuthContext from "../Context/auth-context";
import "./Login.css"
import dp from "../../dp.webp"
import {animated,useSpring} from "react-spring"
import LoadingSpinner from "../LoadingSpinner";
import Modal from "../Modal";
const YourDesigns = ()=>{
        const [designs,setDesigns] = useState()
        const LoginContext = useContext(AuthContext);
        const [isVisible,setVisible] = useState(false);
        const [spinner,setSpinner] = useState(null);
        const [modal,setModal] = useState(null);
        const [deleteModal,setDeleteModal] = useState(null)
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

        const postData = async (filteredDesigns)=>{
            let resp;
            try{
                let url = LoginContext.credentials.email;
                url =url.replace(/[^a-zA-Z ]/g, "")
      
                resp = await axios.put(`https://parkingslot-690a3-default-rtdb.firebaseio.com/Designs/${url}.json`,
                filteredDesigns)
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

        const DeleteDataHandler = (date)=>{
            let filteredDesigns = designs.filter(ele=>{
               
                return new Date(ele.data).getTime() != new Date(date).getTime();
            })
            
            setSpinner(<LoadingSpinner asOverlay></LoadingSpinner>)
            postData(filteredDesigns).then((res)=>{
                setModal(<Modal
                    code = "success centered">
                       Design Deleted Successfully
                   </Modal>)
                    setSpinner(null)
                setTimeout(()=>{
                   
                  setModal(null)
                },500)

                  setTimeout(()=>{
                    setDesigns(filteredDesigns)
                },1000)

            }).catch(err=>{
                
                setSpinner(null)
                setModal(<Modal
                    code = "error">
                       Something went wrong try again later
                   </Modal>)
                setTimeout(()=>{
                   
                  setModal(null)
                },500)
            

            })
            
        }
        useEffect(()=>{
            updateData()
            setVisible(true)
        },[])
        
        return(
           
        <div className="your-design-page">
           
            {deleteModal}
            {modal}
            {spinner}
            {designs?designs.map((ele,index)=>{
                return  (
                <animated.div style = {fadeIn} className='' key = {index}>
                <DesignCard
                key = {ele}
                data = {ele}
                deleteDesign= {DeleteDataHandler}
                selectedWire = {ele.selectedWire}
                           >
                </DesignCard>
                </animated.div>)
               
                
            }):<div className="generic-text-label">You have no designs yet</div>}
        </div>

        )



}

export default YourDesigns;