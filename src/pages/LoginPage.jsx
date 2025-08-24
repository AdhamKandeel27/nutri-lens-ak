import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    const email = e.currentTarget.email.value.trim().toLowerCase();
    const password = e.currentTarget.password.value.trim().toLowerCase();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        //handles supabase errors
        console.log(error.message);
        setErrorMessage(error.message);
        return;
      }
      console.log("Logged in");
      navigate("dashboard");
    } catch (err) {
      //handles enexpected JS errors
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="login-page-wrapper">
      <div className="login-form">
        <form onSubmit={handleLogin} method="POST">
          <div className="form-title">
            <h2>Login</h2>
            <div className="error-message">
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
          <div className="input-email">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="example@example.com"
              name="email"
              required
            />
          </div>
          <div className="input-password">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="P@ssw0rd!"
              name="password"
              required
            />
          </div>
          <div className="button-login">
            <button disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
