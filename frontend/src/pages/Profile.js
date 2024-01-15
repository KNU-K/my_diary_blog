import { useEffect, useState } from "react";
import { getProfileWithToken } from "../services/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const res = await getProfileWithToken(localStorage.getItem("access"));
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    handleGetProfile();
  }, []);

  const handleProfileChange = (event) => {
    navigate("edit");
  };

  return (
    <div
      style={{
        margin: "30px auto",
        maxWidth: "600px",
        padding: "20px",
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
      }}
    >
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        {/* Profile image */}
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          Profile Image:
        </p>
        <br />
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Profile Preview"
            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
          />
        ) : (
          <img
            src={profile.image}
            alt="Profile"
            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
          />
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        {/* Introduction */}
        <p style={{ textAlign: "center", fontWeight: "bold" }}>Introduction:</p>
        <p style={{ textAlign: "center" }}>{profile.introduction}</p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Change Profile Image Button */}

        {/* Change Introduction Button */}
        <button
          onClick={handleProfileChange}
          style={{
            padding: "10px",
            backgroundColor: "#2f3c71",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            width: "200px",
          }}
        >
          Change Profile
        </button>
        <br />
        <button
          onClick={() => navigate(`/user/${profile.u_id}`)}
          style={{
            padding: "10px",
            backgroundColor: "#2f3c71",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            width: "200px",
          }}
        >
          go your board
        </button>
      </div>
    </div>
  );
};

export default Profile;
