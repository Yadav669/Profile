import React, { useState, useEffect } from "react";
import Navbar from "../../components/header/Navbar";
import { Container, Row, Col } from "react-bootstrap";
// import { FaPen } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import "./DashBoard.css";

const DashBoard = () => {
  const [posts, setPosts] = useState([]);
  const [userName, setUserName] = useState(""); // State to store the user's name

  // Fetch posts and user data from localStorage
  useEffect(() => {
    // Retrieve posts from localStorage
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);

    // Retrieve user information from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    if (storedUser.name) {
      setUserName(storedUser.name); // Set the user's name
    }
  }, []);

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <h2 className="text-center">Dashboard</h2>
        <Row className="mt-3">
          <Col md={12}>
            <h4>Posts</h4>
            <div>
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
                    <div className="mt-2 d-flex justify-content-between">
                      {/* Display the author's name and post date */}
                      <small>{userName || "Anonymous"}</small>{" "}
                      {/* Display username or Anonymous */}
                      <small>{post.date}</small> {/* Date and Time */}
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts yet.</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashBoard;
