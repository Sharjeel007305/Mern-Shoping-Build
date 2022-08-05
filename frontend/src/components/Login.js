import  "./Login.css";
import {useState} from 'react';
import Navbar from "../components/Navbar.js";
import SideDrawer from "../components/SideDrawer.js";
import Backdrop from "../components/Backdrop.js";


const Login = () => {

    
    const [sideToggle, setSideToggle] = useState("");
    // const [loginIn, setloginIn] = useState("")
     
    return(     
       <>
       {/* { 
       loginIn : <Navbar onClick={()=> setSideToggle(true)}/> 
       } */}
               
               <SideDrawer show={sideToggle} />
               <Backdrop  show={sideToggle} onClick ={()=> setSideToggle(false)}/>
               
               <div class="bg-img">
                     <form  class="container">
                         <h1>Login</h1>
                         <br />
                         <label for="username & email"><b>UserName & Email</b></label>
                        <input type="text" placeholder="Enter UserName & Email  " name="username" required/>
         
                         <label for="psw"><b>Password</b></label>
                          <input type="password" placeholder="Enter Password" name="psw" required/>

                         <button type="submit" class="btn">Login</button>                  
                     </form>
                     </div>
        </>
       
    )
  

}

export default Login;

