


const LoginReg = () => {

    

     
    return(     
          <div class="bg-img">
                <form  class="loginreg_container" action="">
                    
                    <h1>Login</h1>
                        <br />

                    <div>
                    <label for="username "><b>Username </b></label>
                    <input type="text" placeholder="username" name="username" required/>
                    </div>

                    <div>
                    <label for="email "><b>Email </b></label>
                    <input type="text" placeholder="email" name="email" required/>
                    </div>

                    <div>
                    <label for="phone "><b>Phone </b></label>
                    <input type="text" placeholder="phone" name="phone" required/>
                    </div>

                    <div>
                    <label for="password "><b>Password </b></label>
                    <input type="text" placeholder="password" name="password" required/>
                    </div>

                    <button type="submit" class="btn">Submit</button>                  
                </form>
                     </div>
       
    )
  

}

export default LoginReg;

