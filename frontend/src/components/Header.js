import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfileWithToken, logoutUser } from "../services/api";

import { FaSearch } from "react-icons/fa";
const Header = () => {
  const [isLoginButtonHovered, setIsLoginButtonHovered] = useState(false);
  const [isJoinButtonHovered, setIsJoinButtonHovered] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUsername] = useState("");
  const navigate = useNavigate();
  const handleLoginMouseOver = () => {
    setIsLoginButtonHovered(true);
  };

  const handleLoginMouseOut = () => {
    setIsLoginButtonHovered(false);
  };

  const handleJoinMouseOver = () => {
    setIsJoinButtonHovered(true);
  };

  const handleJoinMouseOut = () => {
    setIsJoinButtonHovered(false);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleLogOut = async () => {
    await logoutUser(localStorage.getItem("access"), {
      refreshToken: localStorage.getItem("refresh"),
    });
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    window.location.reload();
  };

  const handleGetProfile = async () => {
    try {
      const res = await getProfileWithToken(localStorage.getItem("access"));
      console.log(res);
      setProfileImage(res.data.image);
      setUsername(res.data.u_id);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // 페이지가 로드될 때마다 handleGetProfile 호출
  useEffect(() => {
    handleGetProfile();
  }, []);
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    margin: "40px",
    // Align items vertically in the center
  };
  const headerStyle = {
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    padding: "2rem",
    position: "relative",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s",
  };

  const loginButtonStyle = {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    marginRight: "8px",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontSize: "1rem",
    letterSpacing: "0.5px",
    outline: "none",
    border: "2px solid #4CAF50",
    transition: "color 0.3s, background-color 0.3s",
  };

  const loginButtonHoverStyle = {
    ...loginButtonStyle,
    backgroundImage:
      "linear-gradient(90deg, #4CAF50 0%, #45a049 50%, #4CAF50 100%)",
    animation: "shimmer 2s infinite",
    backgroundSize: "200% 100%",
    backgroundPosition: "right center",
    transition: "background 0.5s",
  };

  const joinButtonStyle = {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontSize: "1rem",
    letterSpacing: "0.5px",
    outline: "none",
    border: "2px solid #007BFF",
    transition: "color 0.3s, background-color 0.3s",
  };

  const joinButtonHoverStyle = {
    ...joinButtonStyle,
    backgroundImage:
      "linear-gradient(90deg, #007BFF 0%, #0056b3 50%, #007BFF 100%)",
    animation: "shimmer 2s infinite",
    backgroundSize: "200% 100%",
    backgroundPosition: "right center",
    transition: "background 0.5s",
  };

  const logoutButtonStyle = {
    backgroundColor: "#d9534f",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontSize: "1rem",
    letterSpacing: "0.5px",
    outline: "none",
    border: "2px solid #d43f3a",
    transition: "color 0.3s, background-color 0.3s",
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/user/${searchTerm}`);
    }
  };
  return (
    <>
      <header style={headerStyle}>
        <h1
          style={{
            margin: 0,
            fontSize: "2rem",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          My Diary Blog
        </h1>
        <div style={{}}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <input
              type="text"
              id="searchInput"
              value={searchTerm}
              onKeyDown={handleKeyPress}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
              style={{
                padding: "10px",
                paddingLeft: "30px", // Adjusted padding on the left for the search icon
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <FaSearch
              style={{
                position: "absolute",
                left: "10px", // Adjusted left position for the search icon
                top: "50%",
                transform: "translateY(-50%)",
                color: "#555",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </header>
      <div style={containerStyle}>
        {!localStorage.getItem("access") ? (
          <>
            <Link to="/login">
              <button
                style={
                  isLoginButtonHovered
                    ? loginButtonHoverStyle
                    : loginButtonStyle
                }
                onMouseOver={handleLoginMouseOver}
                onMouseOut={handleLoginMouseOut}
              >
                Login
              </button>
            </Link>
            <Link to="/join">
              <button
                style={
                  isJoinButtonHovered ? joinButtonHoverStyle : joinButtonStyle
                }
                onMouseOver={handleJoinMouseOver}
                onMouseOut={handleJoinMouseOut}
              >
                Join
              </button>
            </Link>
          </>
        ) : (
          <>
            <img
              src={profileImage}
              alt="Profile"
              style={{
                width: "40px",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            />
            <Link
              to={`/profile`}
              style={{ textDecoration: "none", color: "#007BFF" }}
            >
              <h3 style={{ marginRight: "20px" }}>{userName}</h3>
            </Link>
            <button style={logoutButtonStyle} onClick={handleLogOut}>
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
