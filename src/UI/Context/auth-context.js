import { createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext({isLoggedIn:false,login: ()=>{

},logout: ()=>{

}, credentials : {}});
export default AuthContext;