import  "./ForgetPassword.css";


const ForgetPassword = () => {

    return(           
               <div class="forget_container">
                     <form className="forgetpass_container">      
                     <h1 className="forget_text">Forget Password</h1>
                        <br />
                        <div className="email_container">
                        <label for="email"><b>Email</b></label>
                          <input className="email_input" type="email" placeholder="Email" name="Email" required/>
                        </div>
                            <br />
                         <button type="submit" class="forget_btn">Submit</button>                  
                     </form>
                     </div>     
    )
  

}

export default ForgetPassword;

