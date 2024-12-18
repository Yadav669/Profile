import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container, Modal } from "react-bootstrap";
import Navbar from "../../components/header/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authenticate/AuthProvider";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./Profile.css";

const Profile = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    DOB: "",
    age: "",
    photo: "",
  });

  const [updatedUserData, setUpdatedUserData] = useState(userData);
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null); // state for post image
  const [posts, setPosts] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [newPhotoPreview, setNewPhotoPreview] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/Login");
    } else {
      const storedUserData = JSON.parse(localStorage.getItem("userData")) || {};
      setUserData(storedUserData);
      setUpdatedUserData(storedUserData);

      // Load posts from localStorage
      const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      setPosts(storedPosts);
    }
  }, [isAuthenticated, navigate]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setShowEditModal(false);
  };

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    setUserData((prevData) => ({ ...prevData, photo: updatedUserData.photo }));
    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    setShowPhotoModal(false);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() !== "") {
      const newPost = {
        content: postContent,
        date: new Date().toLocaleString(), // Store the current date and time
        image: postImage, // include the image if any
      };
      const updatedPosts = [...posts, newPost];
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Save to localStorage
      setPostContent("");
      setPostImage(null); // Reset post image
      setShowPostModal(false);
    }
  };

  const handleDeletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Update localStorage
  };

  const handleEditPost = (index) => {
    const postToEdit = posts[index];
    setPostContent(postToEdit.content);
    setPostImage(postToEdit.image); // Set image for editing
    setShowPostModal(true);
    handleDeletePost(index); // Remove the post and allow the user to create a new one
  };

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
        setNewPhotoPreview(reader.result);
        setUpdatedUserData((prevData) => ({
          ...prevData,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPostImage(reader.result); // Preview the selected image for the post
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <h2 className="text-center">User Profile</h2>
        <Row className="mt-3" style={{ padding: "10px" }}>
          <Col md={6} style={{ padding: "10px", borderRadius: "20px" }}>
            <h4>Personal Information</h4>
            <div className="d-flex justify-content-between mb-3">
              <div></div>
              <Button
                variant="secondary"
                onClick={() => setShowPhotoModal(true)}
                style={{
                  margin: "120px 0px 0px 320px",
                  position: "absolute",
                  borderRadius: "20px",
                  backgroundColor: "blue",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              >
                +
              </Button>
            </div>
            <div className="text-center mb-3">
              <img
                src={userData.photo || "https://via.placeholder.com/150"}
                alt="User Profile"
                className="img-fluid rounded-circle mb-3"
                style={{ width: "150px", height: "150px" }}
              />
            </div>
            <p>
              <strong>Name:</strong> {userData.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {userData.email || "N/A"}
            </p>
            <p>
              <strong>DOB:</strong> {userData.DOB || "N/A"}
            </p>
            <p>
              <strong>Age:</strong> {userData.age || "N/A"}
            </p>
            <div className="d-flex justify-content-between">
              <Button variant="primary" onClick={() => setShowEditModal(true)}>
                Edit Personal Info
              </Button>
            </div>
          </Col>

          {/* Right Column: Posts Section */}
          <Col
            md={6}
            style={{
              padding: "10px",
              borderRadius: "20px",
              position: "relative",
            }}
          >
            <h4>Posts</h4>
            <div className="mb-4">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <div key={index} className="border rounded p-2 mb-2">
                    <p>{post.content}</p>
                    {post.image && (
                      <div className="mt-2">
                        <img
                          src={post.image}
                          alt="Post"
                          className="img-fluid"
                          style={{ maxWidth: "150px", maxHeight: "150px" }}
                        />
                      </div>
                    )}
                    <div className="mt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEditPost(index)}
                      >
                        <FaPen />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeletePost(index)}
                        className="ms-2"
                      >
                        <MdDelete />
                      </Button>
                      <small style={{marginLeft:"57%"}}>{post.date}</small>
                      <small style={{marginLeft:"37%"}}>{.name}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts yet.</p>
              )}
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <Button
                variant="primary"
                className="rounded-circle"
                onClick={() => setShowPostModal(true)}
              >
                +
              </Button>
            </div>
          </Col>
        </Row>

        {/* Post Input Modal */}
        <Modal
          show={showPostModal}
          onHide={() => setShowPostModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {postContent ? "Edit Post" : "Add a New Post"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handlePostSubmit}>
              <Form.Group controlId="postContent" className="mb-3">
                <Form.Label>Post Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="postImage" className="mb-3">
                <Form.Label>Select a Photo</Form.Label>
                <Form.Control type="file" onChange={handlePostImageChange} />
                {postImage && (
                  <div className="mt-3 text-center">
                    <img
                      src={postImage}
                      alt="Post Preview"
                      className="img-fluid"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  </div>
                )}
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => setShowPostModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  {postContent ? "Save Changes" : "Add Post"}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Edit Personal Information Modal */}
        <Modal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Personal Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={updatedUserData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={updatedUserData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="DOB" className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="DOB"
                  value={updatedUserData.DOB}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="age" className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={updatedUserData.age}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Update Profile Picture Modal */}
        <Modal
          show={showPhotoModal}
          onHide={() => setShowPhotoModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Profile Picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handlePhotoSubmit}>
              <Form.Group controlId="photo" className="mb-3">
                <Form.Label>Profile Photo</Form.Label>
                <Form.Control type="file" onChange={handlePhotoChange} />
                {newPhotoPreview && (
                  <div className="mt-3 text-center">
                    <img
                      src={newPhotoPreview}
                      alt="Preview"
                      className="img-fluid rounded-circle"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                )}
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="me-2"
                  onClick={() => setShowPhotoModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save Picture
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default Profile;
