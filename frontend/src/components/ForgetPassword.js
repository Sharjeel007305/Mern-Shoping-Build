import  "./ForgetPassword.css";


const ForgetPassword = () => {

    return(           
               <div class="bg-img">
                     <form  class="forgetpass_container">      
                     <h1>Forget Password</h1>
                        <br />
                        <div>
                        <label for="email"><b>Email</b></label>
                          <input type="email" placeholder="email" name="email" required/>
                        </div>
                            <br />
                         <button type="submit" class="btn">Submit</button>                  
                     </form>
                     </div>     
    )
  

}

export default ForgetPassword;

