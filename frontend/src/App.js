// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Header from "./components/Header";
import User from "./pages/User";
import WritePost from "./pages/writePost";
import Login from "./pages/Login";
import Join from "./pages/Join";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
const App = () => {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/user/:userId" element={<User />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/user/:userId/write" element={<WritePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
