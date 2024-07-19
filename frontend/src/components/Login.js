import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
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
      alert("Please enter connect details");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form">
        <input
          type="email"
          className="form-input"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          type="password"
          className="form-input"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button onClick={handleLogin} className="submit-button" type="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
