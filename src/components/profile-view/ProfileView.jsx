import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const ProfileView = ({ token, onLoggedOut }) => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:8080/users/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserData(data);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUserData();
  }, [username, token]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(userData);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${username}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setIsEditing(false);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(
          `http://localhost:8080//users/${username}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          console.log("Profile deleted.");
          onLoggedOut();
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      {userData ? (
        isEditing ? (
          <div>
            <h2>Edit Profile</h2>
            <label>
              Username:
              <input
                name="Username"
                value={editedData.Username}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Password:
              <input name="Password" onChange={handleInputChange} />
            </label>
            <label>
              Email:
              <input
                name="Email"
                value={editedData.Email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Birthday:
              <input
                name="Birthday"
                value={editedData.Birthday}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <h2>Profile</h2>
            <p>Username: {userData.Username}</p>
            <p>Password: ********</p>
            <p>Email: {userData.Email}</p>
            <p>Birthday: {userData.Birthday}</p>
            <button onClick={handleEdit}>Edit User Info</button>
            {userData.favoriteMovies && userData.favoriteMovies.length > 0 ? (
    <div>
      <h3>Favorite Movies:</h3>
      <ul>
        {userData.favoriteMovies.map((movie) => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </ul>
    </div>
) : (
    <p>No favorite movies yet.</p>
)}
            <button onClick={handleDelete}>Delete User</button>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileView;
