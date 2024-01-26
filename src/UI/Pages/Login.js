import react, { useState } from "react"
import "./Login.css"
import Input from "../Input"
import axios from "axios";
import Modal from "../Modal";
import { useContext } from "react";
import AuthContext from "../Context/auth-context";
function isValidEmail(email) {
    // Regular expression for basic email validation
    return email.length>=4;
  }

function isValidPassword(password) {
  // Password should be at least 4 characters long
  return password.length > 3;
}
const Login = (props)=>{
    const loginContext = useContext(AuthContext)
    const [credentials,setCredentials] = useState({
        email : '',
        password : '',
        name : ''
    })
    const [newUser,setNewUser] = useState(false)
    const [modal,setModal ]= useState(null)

    const getUsersData = async ()=>{
        let resp;
        try{
            resp = await axios.get(`https://parkingslot-690a3-default-rtdb.firebaseio.com/Users.json?orderBy="email"&equalTo="${credentials.email}"`)
        }
        catch(err)
        {

        }
        return resp.data;
    }
    const setUsersData = async ()=>{
        let resp;
        try{
            resp = await axios.post(`https://parkingslot-690a3-default-rtdb.firebaseio.com/Users.json`,{
                name : credentials.name,
                email:credentials.email,
                password:credentials.password
            })
        }
        catch(err)
        {

        }
        return resp.data;
    }


    const loginHandler = async ()=>{

        if(newUser)
        {
            let resp;
            try{
                resp = await setUsersData();
                }
                catch(err)
                {
        
                } 

            setModal(<Modal code = "success">
            Created Account Successfully
            </Modal>)
            setTimeout(()=>{
                setModal(null)
            },750)
        }
        else{
            let data;
        try{
        data = await getUsersData();
        }
        catch(err)
        {

        }
   
        if(data)
        {
            data = Object.values(data)
            
            if(data[0] && data[0].password === credentials.password)
            {
                
                setModal(<Modal code = "success">
                    Logged in Successfully
                </Modal>)
                
                setTimeout(()=>{
                    setModal(null)
                    props.changePage('Design Tool')
                },750)
                let temp = credentials;
                temp.name = data[0].name;
                setCredentials(temp)
                loginContext.login();
                loginContext.setCreds(credentials)
                
                

            }
            else{
                setModal(<Modal code = "error">
                  Login Attempt failed Try again later
                </Modal>)
         
                setTimeout(()=>{
                    setModal(null)
                },1000)
            }
        }
        else{
            setModal(<Modal code = "error">
             Login Attempt failed Try again later
            </Modal>)
         
            setTimeout(()=>{
                setModal(null)
            },1000)
        }
    }
     
    }
    const [isValid,setValidity] = useState([true,true])
    const changeHandler = (event)=>{
        let index = event.target.getAttribute('index');
        let temp = [...isValid]
        if(index ==0)
        {
            temp[0] = isValidEmail(event.target.value);
            let  email = event.target.value;
            let prev = credentials;
            prev.email = email;
            setValidity(temp)
            setCredentials(prev)
        }
        if(index ==1)
        {
            temp[1] = isValidPassword(event.target.value);
            let  password = event.target.value;
            let prev = credentials;
            prev.password = password;
            setValidity(temp)
            setCredentials(prev)
        }
        if(index==2)
        {
            let  name = event.target.value;
            let prev = credentials;
            prev.name  =name ;
            setCredentials(prev) 
        }
    }

    return(<div className = 'login-card'>
        <Input
        type = "email"
        place = "Email"
        name = "email"
        label = "Enter unique ID"
        ind = {0}
        valid = {isValid[0]}
        handleChange = {changeHandler}
        >
        </Input>
        <Input
        type = "password"
        place = "Password"
        name = "password"
        label = "Password"
        ind = {1}
        valid = {isValid[1]}
        handleChange = {changeHandler}
        >
        </Input>
        {newUser? <Input
        type = "text"
        place = "UserName"
        name = "UserName"
        label = "UserName"
        ind = {2}
        valid = {true}
        handleChange = {changeHandler}
        >
        </Input> : null
        }
        <div>
        <button className="btn-primary" disabled = {!isValid[0] || !isValid[0]}
        onClick = {loginHandler}
        >{newUser?"Create Account ":"Login"}</button>
        <button className={newUser? "checkbox-checked": "checkbox-button"}
        onClick = {()=>{
            setNewUser(prev=>{
                return !prev
            })
        }}
        >{newUser?"NewUser": "Returning User"} </button>
        </div>
        {modal}
    </div>)


}
export default Login;