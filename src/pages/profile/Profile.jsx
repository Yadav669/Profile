import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import Navbar from "../../components/header/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authenticate/AuthProvider";

const Profile = () => {
  const { isAuthenticated } = useAuth(); // Access authentication context
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    DOB: "",
    age: "",
    photo: "",
  });

  const [updatedUserData, setUpdatedUserData] = useState({ ...userData });

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/Login");
    } else {
      // Load user data from localStorage
      const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
      setUserData(storedUserData);
      setUpdatedUserData(storedUserData);
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUpdatedUserData((prevData) => ({
          ...prevData,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    alert("Profile updated successfully!");
  };

  const handleRemovePhoto = () => {
    setUpdatedUserData((prevData) => ({
      ...prevData,
      photo: "",
    }));
  };

  if (!isAuthenticated) {
    return null; // Prevent rendering of the profile before redirection
  }

  return (
    <>
      <Navbar />
      <Container className="mt-4" >
        <h2 className="text-center">User Profile</h2>
        <Row className="mt-4">
          {/* Left Section for Profile Picture */}
          <Col md={4} className="text-center">
            <div>
              <img
                src={updatedUserData.photo || "https://via.placeholder.com/150"}
                alt="User Profile"
                className="img-fluid rounded-circle mb-3"
                style={{ width: "150px", height: "150px" }}
              />
              <Form.Group controlId="formPhoto" className="mb-3">
                <Form.Label>Change Profile Photo</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </Form.Group>
              {updatedUserData.photo && (
                <Button variant="danger" onClick={handleRemovePhoto}>
                  Remove Photo
                </Button>
              )}
            </div>
          </Col>

          {/* Right Section for Personal Information */}
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={updatedUserData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={updatedUserData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDOB">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter your DOB"
                  name="DOB"
                  value={updatedUserData.DOB}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your age"
                  name="age"
                  value={updatedUserData.age}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
