import "./SignUpReg.css";
import { Link } from "react-router-dom";



const SignUpReg = () => {

    

     
    return (
      <section className="signup-page">
        <div className="signup-page__overlay" aria-hidden="true" />

        <div className="signup-page__content">
          <form id="reg_form" className="signup-card">
            <div className="signup-card__heading">
              <span className="signup-card__eyebrow">Join us</span>
              <h1>Create your account</h1>
              <p>Sign up to start shopping and save your favorite items.</p>
            </div>

            <div className="signup-card__grid">
              <div className="signup-card__field">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  autoComplete="username"
                  required
                />
              </div>

              <div className="signup-card__field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <fieldset className="signup-card__gender">
                <legend>Gender</legend>
                <label>
                  <input type="radio" name="gender" value="male" defaultChecked />
                  <span>Male</span>
                </label>
                <label>
                  <input type="radio" name="gender" value="female" />
                  <span>Female</span>
                </label>
              </fieldset>

              <div className="signup-card__passwords">
                <div className="signup-card__field">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    minLength="8"
                    required
                  />
                </div>

                <div className="signup-card__field">
                  <label htmlFor="confirm-password">Confirm password</label>
                  <input
                    id="confirm-password"
                    type="password"
                    name="confirm_password"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    minLength="8"
                    required
                  />
                </div>
              </div>
            </div>

            <label className="signup-card__remember">
              <input type="checkbox" name="remember" />
              <span>Keep me signed in on this device</span>
            </label>

            <p className="signup-card__terms">
              By creating an account, you agree to our Terms &amp; Privacy Policy.
            </p>

            <div className="signup-card__actions">
              <Link to="/login" className="signup-card__cancel">Cancel</Link>
              <button type="submit" className="signup-card__submit">
                Create account
              </button>
            </div>

            <p className="signup-card__login">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        </div>
      </section>
    );
  

}

export default SignUpReg;

