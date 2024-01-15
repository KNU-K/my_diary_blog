// src/App.js
import MDEditor from "@uiw/react-md-editor";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { postBoard } from "../services/api";

const WritePost = () => {
  const { boardId } = useParams();
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  const handleSubmit = async () => {
    try {
      // Add your submission logic here
      const requestBody = {
        b_title: title,
        b_contents: post,
      };
      const res = await postBoard(requestBody, localStorage.getItem("access"));
      window.history.go(-1);
      console.log(res);
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f0f0f0", // Light gray background
        marginTop: "20px", // Added margin at the top
      }}
    >
      <div
        style={{
          background: "#ffffff", // White background
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Subtle box shadow
          borderRadius: "8px", // Rounded corners
          width: "80%",
          maxWidth: "600px",
          height: "72%",
          margin: "auto",
          padding: "20px", // Some padding
          color: "#000000", // Black text color
          position: "relative", // Position relative for absolute positioning of the button
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Write Your Post
        </h1>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
          <MDEditor
            height={500}
            value={post}
            onChange={setPost}
            style={{ backgroundColor: "#f8f8f8", color: "#333333" }}
          />
        </div>
        <button
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            background: "#4caf50", // Green color for the button
            color: "#ffffff", // White text color
            padding: "10px 15px",
            marginTop: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            border: "none",
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default WritePost;
