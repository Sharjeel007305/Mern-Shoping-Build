import  "./Login.css";
import {Link} from "react-router-dom";



const Login = () => {

    
     
    return(     
       <>
      
            
               
               <div class="bg-img">
                     <form  class="container">
                         <h1>Login</h1>
                         <br />
                         <label for="username & email"><b>Username & Email</b></label>
                        <input type="text" placeholder="Enter username & email  " name="username" required/>
         
                         <label for="Password"><b>Password</b></label>
                          <input type="password" placeholder="Password" name="Password" required/>

                          <Link to="/Forgort Password">Forgort Password</Link>  
                            
                             <button type="submit" class="btn">Login</button>                  
                     </form>
                     </div>
        </>
       
    )
  

}

export default Login;

