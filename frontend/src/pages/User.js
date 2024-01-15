import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import {
  getFollowers,
  getFollowing,
  getPosts,
  getProfile,
} from "../services/api";

const User = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(7);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getPosts(userId, currentPage, postsPerPage);
        const postsData = response.data;
        setPosts(postsData);
        const response2 = await getProfile(userId);
        setProfile(response2.data);
        console.log("a", response2);
        const followersResponse = await getFollowers(userId);

        setFollowers(followersResponse.data);

        // Fetch following
        const followingResponse = await getFollowing(userId);
        setFollowing(followingResponse.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId, currentPage, postsPerPage]);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const handleFollowersClick = () => {
    // Navigate to followers page or display a modal with follower details
    // Adjust this according to your routing or UI design

    setShowFollowersModal(true);
  };

  const handleFollowingClick = () => {
    // Navigate to following page or display a modal with following details
    // Adjust this according to your routing or UI design

    setShowFollowingModal(true);
  };
  const handleWritePost = () => {
    navigate("write");
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pageNumbers.push(
        <span
          key={i}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            cursor: "pointer",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: i === currentPage ? "#007BFF" : "white",
            color: i === currentPage ? "white" : "#007BFF",
          }}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };
  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "40px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          borderBottom: "1px solid #ccc",
          paddingBottom: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {profile && (
          <>
            <img
              width="50px"
              height="50px"
              src={profile.image}
              alt="Profile"
              style={{ marginRight: "10px", borderRadius: "50%" }}
            />
          </>
        )}
        <span>{userId}'s Blog</span>
      </h2>
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between", // Adjusted alignment
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={handleFollowersClick}
            style={{
              backgroundColor: "#007BFF",
              color: "#fff",
              padding: "8px 16px", // Adjusted padding
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
              transition:
                "background-color 0.3s, transform 0.2s, box-shadow 0.3s",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-people"
              viewBox="0 0 16 16"
              style={{ marginRight: "5px" }}
            >
              <path d="M5.5 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM1 14s1-1 3-1 3 1 3 1 2-1 3-1 3 1 3 1h1s1-1 3-1 3 1 3 1v-1s-1-1-3-1a.6.6 0 0 0-.6.6v1.8c0 .2.1.4.3.5 1.1.5 1.9 1.5 2 2.7v1H1v-1s1-1 3-1a.6.6 0 0 0 .6-.6v-1.8a.5.5 0 0 0-.4-.5c-1.1-.4-1.9-1.3-2-2.5V6.5S10 5 8 5s-3 1.5-3 1.5-1-1.5-3-1.5S0 6.5 0 6.5v5z" />
            </svg>
            Followers: {followers.length}
          </button>
          <button
            onClick={handleFollowingClick}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "8px 16px", // Adjusted padding
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition:
                "background-color 0.3s, transform 0.2s, box-shadow 0.3s",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-plus"
              viewBox="0 0 16 16"
              style={{ marginRight: "5px" }}
            >
              <path
                fillRule="evenodd"
                d="M1 2.5A3.5 3.5 0 0 1 4.5 6a.5.5 0 0 0 1 0A3.5 3.5 0 0 1 9 2.5a.5.5 0 0 0 0-1A4.5 4.5 0 0 0 4.5 6a.5.5 0 0 0-1 0A4.5 4.5 0 0 0 10 10a4.5 4.5 0 0 0 1.5-8.5.5.5 0 0 0-1 0A3.5 3.5 0 0 1 9 10a.5.5 0 0 0 0 1 5.5 5.5 0 0 1-11 0 .5.5 0 0 0-1 0zM10 11.5a3.5 3.5 0 0 1-3.5-3.5.5.5 0 0 0-1 0A4.5 4.5 0 0 0 10 14a4.5 4.5 0 0 0 4.5-4.5.5.5 0 0 0-1 0A3.5 3.5 0 0 1 10 11.5z"
              />
              <path
                fillRule="evenodd"
                d="M14 6.5a.5.5 0 0 1-1 0V6H9a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5z"
              />
              <path
                fillRule="evenodd"
                d="M9.5 3a.5.5 0 0 1 0 1H14v1H9.5a.5.5 0 0 1 0-1zM1 13.5a.5.5 0 0 0 1 0V13h4a.5.5 0 0 0 0-1H1v-1h4a.5.5 0 0 0 0-1H1a.5.5 0 0 0-1 0 .5.5 0 0 0 0 1H.5v1.5a.5.5 0 0 0 1 0zM15 2h-1V1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"
              />
            </svg>
            Following: {following.length}
          </button>
        </div>
      </div>
      <div style={{ marginTop: "20px", marginLeft: "10px" }}>
        <b>introduction</b>
        <br />
        {profile?.introduction}
        <br />
        <p style={{ fontSize: "15px" }}></p>
      </div>
      <hr />
      {currentPosts.length > 0 ? (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {currentPosts.map((post, index) => (
              <li
                key={post.b_id}
                style={{
                  marginBottom: "15px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "10px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  transition:
                    "background-color 0.3s, transform 0.2s, box-shadow 0.3s",
                  padding: "10px",
                  cursor: "pointer",
                  position: "relative",
                  // Added position: "relative" for absolute positioning of the :hover effect
                }}
                onMouseOver={() => {
                  // Apply hover effect
                  post.style = {
                    backgroundColor: "#e0f7fa",
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                    transform: "scale(1.05)",
                  };
                  setPosts([...posts]); // Trigger re-render
                }}
                onMouseOut={() => {
                  // Remove hover effect
                  post.style = {};
                  setPosts([...posts]); // Trigger re-render
                }}
              >
                <span style={{ marginRight: "10px", fontWeight: "bold" }}>
                  {index + 1 + (currentPage - 1) * postsPerPage}.
                </span>
                <Link
                  to={`/post/${post.b_id}`}
                  style={{ textDecoration: "none", color: "#007BFF" }}
                >
                  {post.b_title}
                </Link>
              </li>
            ))}
          </ul>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            {renderPageNumbers()}
          </div>
        </>
      ) : (
        <p>No posts available.</p>
      )}
      <button
        style={{
          marginTop: "20px",
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background-color 0.3s, transform 0.2s, box-shadow 0.3s",
        }}
        onClick={handleWritePost}
      >
        Write Post
      </button>
      {/* Follower Modal */}
      {showFollowersModal && (
        <Modal closeModal={() => setShowFollowersModal(false)}>
          <h2>Followers</h2>
          <ul>
            {followers.map((follower) => (
              <Link to={`/user/${follower.u_id}`}>
                <li
                  onClick={() => {
                    setShowFollowersModal(false);
                  }}
                  key={follower.id}
                >
                  {follower.u_id}
                </li>
              </Link>
            ))}
          </ul>
        </Modal>
      )}

      {/* Following Modal */}
      {showFollowingModal && (
        <Modal closeModal={() => setShowFollowingModal(false)}>
          <h2>Following</h2>
          <ul>
            {following.map((followed) => (
              <Link to={`/user/${followed.following_id}`}>
                {" "}
                <li
                  onClick={() => {
                    setShowFollowingModal(false);
                  }}
                  key={followed.id}
                >
                  {followed.following_id}
                </li>
              </Link>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default User;
