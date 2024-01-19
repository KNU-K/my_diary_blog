// src/components/Login.js
import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "../services/token";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const handleLoginSubmit = async () => {
    // Implement your login submission logic here
    // For simplicity, let's just check if both username and password are not empty

    if (username && password) {
      const res = await loginUser({
        u_id: username,
        u_password: password,
      });
      if (!res.data.accessToken) {
        alert(res.data);
        setLoginError(true);
        return;
      }
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem("refresh", refreshToken);
      localStorage.setItem("access", accessToken);
      //setToken(accessToken);

      window.location.href = `/user/${username}`;
      // Add your logic for making an API request to authenticate the user
    } else {
      setLoginError(true);
    }
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "100px auto",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333344" }}>Login</h2>
      <form>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="username" style={{ color: "#333344" }}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "90%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ color: "#333344" }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "90%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ddd",
            }}
          />
        </div>
        {loginError && (
          <p style={{ color: "red", margin: "5px 0", fontSize: "14px" }}>
            Please fill in both username and password.
          </p>
        )}
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            onClick={handleLoginSubmit}
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              backgroundColor: "#333344",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
