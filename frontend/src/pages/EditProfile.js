import { useEffect, useState } from "react";
import { getProfileWithToken, updateProfile } from "../services/api";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [profile, setProfile] = useState({});
  const [introduction, setIntroduction] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const res = await getProfileWithToken(localStorage.getItem("access"));
        setProfile(res.data);
        setIntroduction(res.data.introduction);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    handleGetProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setNewImage(file);

      // Display a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Make an API call to update the profile image
      await updateProfile(
        profile.u_id,
        localStorage.getItem("access"),
        newImage,
        introduction
      );

      // Refresh the profile data after the image is updated
      alert("update good!");
      window.location.href = "/profile";
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
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

        <label htmlFor="profileImageInput">
          <img
            src={imagePreview || profile.image}
            alt="Profile"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        </label>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="profileImageInput"
          onChange={handleImageChange}
        />
      </div>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        {/* Introduction */}
        <p style={{ textAlign: "center", fontWeight: "bold" }}>Introduction:</p>
        <textarea
          value={introduction}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            resize: "vertical",
          }}
          onChange={(e) => setIntroduction(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Change Profile Image Button */}
        <button
          onClick={handleSaveChanges}
          style={{
            padding: "10px",
            backgroundColor: "#2f3c71",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            width: "200px",
          }}
        >
          Save Changed Profile
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
