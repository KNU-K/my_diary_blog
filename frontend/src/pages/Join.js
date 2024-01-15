// src/components/Join.js
import React, { useState } from "react";
import { joinUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();
  const handleJoinSubmit = async () => {
    // Implement your join submission logic here
    if (password === confirmPassword) {
      console.log("Join button clicked");
      console.log("Username:", username);
      console.log("Name:", name);
      console.log("Password:", password);
      // Add your logic for making an API request to register the user
      await joinUser({
        u_id: username,
        u_password: password,
        u_name: name,
      });
      alert("successfully join");
      navigate("/");
    } else {
      setPasswordMatch(false);
    }
  };
  // ...

  const handleMatchPassword = (value) => {
    if (password === value) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  // ...

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
      <h2 style={{ textAlign: "center", color: "#333344" }}>Join</h2>
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
          <label htmlFor="name" style={{ color: "#333344" }}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="confirmPassword" style={{ color: "#333344" }}>
            Confirm Password:
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onSelect={(e) => handleMatchPassword(e.target.value)}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                handleMatchPassword(e.target.value);
              }}
              style={{
                width: "90%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
            {passwordMatch ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="green"
                width="24px"
                height="24px"
                style={{
                  position: "absolute",
                  right: "40px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                width="24px"
                height="24px"
                style={{
                  position: "absolute",
                  right: "40px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                  fill="#FF0000"
                />
                <circle cx="12" cy="16" r="1.25" fill="#FF0000" />
                <circle cx="12" cy="12" r="1.25" fill="#FF0000" />
                <path d="M11 8h2v4h-2zm0 6h2v2h-2z" fill="#FF0000" />
              </svg>
            )}
          </div>
          {!passwordMatch && (
            <p style={{ color: "red", margin: "5px 0", fontSize: "14px" }}>
              Passwords do not match.
            </p>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            onClick={handleJoinSubmit}
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
            Join
          </button>
        </div>
      </form>
    </div>
  );
};

export default Join;
