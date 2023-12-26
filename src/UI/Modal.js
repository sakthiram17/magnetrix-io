import "./Modal.css"
import Card from "./Card"

const Modal = (props)=>{
    if(!props.disabled)
    {
        console.log(props)
    return(
        <div className  = {`modal ${props.code}`} >
            {props.children}
            <br></br>
        </div>
        
    )}
    else{
        return null;
    }
}
export default Modal;