// src/components/Body.js
import React from "react";

const Body = () => {
  return (
    <div style={bodyStyle}>
      <h2>Welcome to My React Web App</h2>
      <p>This is the body content of the web app.</p>
    </div>
  );
};

const bodyStyle = {
  padding: "2rem",
  marginLeft: "10%", // 좌측 여백
  marginRight: "10%", // 우측 여백
  backgroundColor: "#f0f0f0", // 회색 배경
};

export default Body;
