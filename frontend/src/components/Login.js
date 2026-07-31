import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const identity = username.trim();
    if (!identity || !password) {
      setError("Please enter your email/username and password.");
      return;
    }

    localStorage.setItem("UserName", identity);
    navigate("/");
  };

  return (
    <section className="login-page">
      <div className="login-page__overlay" aria-hidden="true" />

      <div className="login-page__content">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-card__heading">
            <span className="login-card__eyebrow">Welcome back</span>
            <h1>Sign in to your account</h1>
            <p>Continue shopping and manage your cart.</p>
          </div>

          {error && <p className="login-card__error">{error}</p>}

          <div className="login-card__field">
            <label htmlFor="login-identity">Email or username</label>
            <input
              id="login-identity"
              type="text"
              name="username"
              placeholder="you@example.com"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <div className="login-card__field">
            <div className="login-card__label-row">
              <label htmlFor="login-password">Password</label>
              <Link to="/ForgetPassword">Forgot password?</Link>
            </div>
            <input
              id="login-password"
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-card__submit">
            Sign in
          </button>

          <p className="login-card__signup">
            New to ShopHub?{" "}
            <Link to="/SignUpReg">Create an account</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
