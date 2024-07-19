import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const collectData = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Custom validation
    if (!name.trim()) {
      alert("Name is required");
      return;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!password || password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // If validation passes, proceed with the API call
    try {
      let result = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();
      console.warn(result);

      // Save user data and token to localStorage
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));

      // Navigate to the home page
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="registration-container">
      <h1 className="registration-title">Register</h1>
      <form className="registration-form" onSubmit={collectData}>
        <input
          className="form-input"
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="form-input"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-input"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="submit-button"
          type="submit" /* Ensure button type is submit */
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
