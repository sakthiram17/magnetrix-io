import "./Input.css"
import react from "react";
const Input = (props)=>{
    if(props.type=='number')
    {
        return (
            <div className="form-input">
                <span className='form-label'>{props.label}</span>
                <input type = "text" 
                className= {props.valid?"form-number":"form-number invalid"}
                onChange={props.handleChange}
                index = {props.ind}
                placeholder={props.placeholder}>

                </input>
                
            </div>
        )
    }


}
export default Input;