import Input from "../UI/Input"
import "./Login.css"
import react from "react"
import Button from "../UI/Button"
const SignIn = (props) =>{

    return(
    <div className = 'login-card'>
        <Input
        type = "text"
        placeholder = "Name"
        label = "Name"
        bgcolor = "ghostwhite"
        invalidText= "Please Enter your name"
        >
        </Input>
        <Input
        type = "text"
        placeholder = "Employee ID"
        label = "Employee ID"
        bgcolor = "ghostwhite"
        invalidText= "invalid Employee ID"
        >
        </Input>  
          
          <Input invalidText = "please enter an valid email"
        type = "email"
        placeholder = "Email"
        name = "email"
        label = "Email"
        bgcolor = "ghostwhite"
        >
        </Input>
        <Input
        invalidText = "please enter an valid password must be more than 4 digits"
        type = "password"
        placeholder = "Password"
        name = "password"
        label = "Password"
        bgcolor = "ghostwhite"
        >
        </Input>
        <Input
        type = "select"
        placeholder = "Role"
        label = "Select Your Role"
        bgcolor = "ghostwhite"
        invalidText= "please select any choice"
        options = {["Admin","Employee"]}
        >
        </Input>

        <Button>Create Your Account</Button>
    </div>
    )


}
export default SignIn;