import  "./Login.css";
import {Link} from "react-router-dom";



const Login = () => {

    
     
    return(     
       <>
               <div class="login_container">
                     <form  class="login_container1">
                         <h1 className="login_text">Login</h1>
                         <br />
                         <label for="username & email"><b className="UserName_text_deg">Username & Email</b></label>
                         <input type="text" placeholder="Enter username & email  " name="username" required/>
         
                         <label for="Password"><b className="Password_text_deg">Password</b></label>
                         <input type="password" placeholder="Password" name="Password" required/>

                          <Link  className ="forget_pass" to="/ForgetPassword">Forgort Password</Link>  
                          <Link className ="Sign_up" to="/SignUpReg"> Sign Up </Link>  
                            
                        <button type="submit" class="login_btn">Login</button>                  
                     </form>
                     </div>
        </>
       
    )
  

}

export default Login;

