import "./Input.css"
import react from "react";
const Input = (props)=>{
    if(props.type=='number')
    {
        return (
            <div className="form-input user-box">
                 

                <label className='form-label'>{props.label}</label>
                <input type = "text" 
                className= {props.valid?"form-number":"form-number invalid"}
                onChange={props.handleChange}
                index = {props.ind}
                placeholder={props.placeholder}>

                </input>
        
                
            </div>
        )
    }
    else if(props.type === 'email')
    {
        return( 
            <div className="form-input login-box">
                 
            <span className='form-label'>{props.label}</span>
            <input type = "email" 
            className= {props.valid?"form-number":"form-number invalid"}
            onChange={props.handleChange}
            index = {props.ind}
            placeholder={props.placeholder}>
    
            </input>
       
            </div>)

    }
    else if(props.type === 'password')
    {
       return( 
        <div className="form-input login-box">
           
        <span className='form-label'>{props.label}</span>

        <input type = "password" 
        className= {props.valid?"form-number":"form-number invalid"}
        onChange={props.handleChange}
        index = {props.ind}
        placeholder={props.placeholder}>

        </input>
 
        </div>)
    }
    else{
        return( 
            <div className="form-input login-box">
                
            <label className='form-label'>{props.label}</label>
            <input type = "text" 
            className= {props.valid?"form-number":"form-number invalid"}
            onChange={props.handleChange}
            index = {props.ind}
            placeholder={props.placeholder}>
    
            </input>
       
            
            </div>)



    }


}
export default Input;