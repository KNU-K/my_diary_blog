// src/components/Home.js
import React from "react";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f0f0f0" /* 회색 배경색 */,
        padding: "0 20px" /* 좌우 여백 추가 */,
        height: "100vh" /* 화면 전체 높이 */,
      }}
    >
      <div
        style={{
          maxWidth: "600px" /* 내용 최대 너비 */,
          textAlign: "center",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Welcome to Our Website</h2>
        <p>
          Thank you for visiting! We are excited to have you explore our
          content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          aliquam justo ac nunc fermentum, ac efficitur urna dictum. Nullam
          aliquet euismod mi, ac gravida nulla rhoncus vel.
        </p>
        <div style={{ margin: "20px 0" }}>
          {/* Placeholder for a slide with a picture */}
          <img
            src="https://via.placeholder.com/400x200"
            alt="Placeholder"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>
        {/* Add more content or slides as needed */}
      </div>
    </div>
  );
};

export default Home;
