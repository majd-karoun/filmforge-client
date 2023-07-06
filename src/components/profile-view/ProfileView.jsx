import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";

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
          `https://filmforge.herokuapp.com/users/${username}`,
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
      const response = await fetch(`https://filmforge.herokuapp.com/users/${username}`, {
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
          `https://filmforge.herokuapp.com/users/${username}`,
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
  
  const handleRemoveFavorite = async (movieId) => {
    try {
      const response = await fetch(
        `https://filmforge.herokuapp.com/users/${username}/movies/${movieId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.ok) {
        // If the request was successful, remove the movie from the local state as well
        setUserData({
          ...userData,
          favoriteMovies: userData.favoriteMovies.filter(
            (movie) => movie._id !== movieId
          ),
        });
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      {userData ? (
        isEditing ? (
          <Row>
            <Col>
              <h2>Edit Profile</h2>
              <Form>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    name="Username"
                    value={editedData.Username}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    value={editedData.Email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    name="Birthday"
                    value={editedData.Birthday}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button onClick={handleSave} variant="primary">Save</Button>
              </Form>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <h2>Profile</h2>
              <p>Username: {userData.Username}</p>
              <p>Password: ********</p>
              <p>Email: {userData.Email}</p>
              <p>Birthday: {userData.Birthday}</p>
              <Button onClick={handleEdit} variant="secondary">Edit User Info</Button>
              {userData.favoriteMovies && userData.favoriteMovies.length > 0 ? (
                <div>
                  <h3>Favorite Movies:</h3>
                  <ListGroup>
                    {userData.favoriteMovies.map((movie) => (
                      <ListGroup.Item key={movie._id}>
                        {movie.title}
                        <Button onClick={() => handleRemoveFavorite(movie._id)} variant="danger">
                          Remove
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              ) : (
                <p>No favorite movies yet.</p>
              )}
              <Button onClick={handleDelete} variant="danger">Delete User</Button>
            </Col>
          </Row>
        )
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
};

export default ProfileView;
