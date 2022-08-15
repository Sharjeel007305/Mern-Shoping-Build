import  "./SignUpReg.css";



const SignUpReg = () => {

    

     
    return(     
          <div className="reg_container">
                <div className="reg_container1" >

                <form id = "reg_form"  action="">
                    
                    <h1 className="reg_text">Sign Up</h1>
                    <br />
                    <p className="fill_form">Please fill in this form to create an account.</p>
                        <br />

                    <label for="username "><b className="user_text">Username </b></label>
                    <input id="username" type="text" placeholder="username" name="username" required/>
            

                  
                    <label for="email "><b className="email_text">Email </b></label>
                    <input id="email" type="text" placeholder="email" name="email" required/>
                   

                    <div className="gender_ui">
                    <input type="radio" className="male_ui" name="gender" value="male" checked /> Male 
                     <input type="radio" className="female_ui" name="gender" value="female"  /> Female 
                     </div>

                    <br/>
                    <label for="password "><b className="pass_text"> Password </b></label>
                    <input id="password" type="text" placeholder="password" name="password" required/>
                   

                   
                    <label for="confrim_Password "><b className="confrim_Pass_text"> Confrim Password </b></label>
                    <input id ="confrim_Password" type="text" placeholder="confrim-password" name="confrim_password" required/>
                   
                    <label className="rember_sign_up">  Remember me  </label>
                    <input type="checkbox" checked="checked" name="remember" required /> 

                     <p>By creating an account you agree to our <a href="#" className="terms_privacy">Terms & Privacy</a>.</p> 
                    {/* <button value="Submit_form" type="submit" className="reg-btn">Submit</button>  */}

                     <div class="clearfix">
                       <button type="button" class="cancel-btn">Cancel</button>
                        <button type="submit" class="reg-btn">Register Account</button>
                    </div>                 
                </form>
                </div>
                     </div>
       
    )
  

}

export default SignUpReg;

