import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { baseurl } from "./baseURL";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result = await fetch(`${baseurl}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);
      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      } else {
        alert("Please enter correct details");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          className="form-input"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on state
            className="form-input"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />} {/* Toggle icon */}
          </button>
        </div>
        <button className="submit-button" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      {isLoading && (
        <div className="loader-overlay">
          <ClipLoader color={"#123abc"} loading={isLoading} size={50} />
        </div>
      )}
    </div>
  );
};

export default Login;
