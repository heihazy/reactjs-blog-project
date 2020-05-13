import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import axios from "axios";
import { useParams } from "react-router-dom";
const EditPost = () => {
  let { postId } = useParams();
  const [editPost, setEditPost] = useState({
    img: "",
    title: " ",
    author: " ",
    text: "",
  });

  const editValueHandler = (e) => {
    setEditPost({
      ...editPost,
      [e.target.name]: e.target.value,
    });
  };
  const savePostHandler = (e) => {
    e.preventDefault();
    axios.patch("http://localhost:3001/posts", editPost).then((response) => {
      console.log(response.data);
    });
    forceReload();
  };

  const forceReload = () => {
    window.location.href = "http://localhost:3000/blog";
  };
  useEffect(() => {
    if (!editPost) {
      axios.get("http://localhost:3001/posts/" + postId).then((response) => {
        console.log(response.data);
        setEditPost(response.data);
      });
    }
  });
  let editedpost = undefined;
  if (postId) {
    editedpost = <h1>Loading post</h1>;
  }

  if (editPost) {
    editedpost = (
      <Container>
        <Form style={{ width: "50%", paddingLeft: "2rem", paddingTop: "2rem" }}>
          <Form.Group controlId="formBasicName">
            <Form.Label style={{ fontSize: "1.5rem" }}>Image Url</Form.Label>
            <Form.Control
              type="text"
              placeholder={editPost.img}
              id="img"
              name="img"
              onChange={editValueHandler}
            />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label style={{ fontSize: "1.5rem" }}>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder={editPost.title}
              id="title"
              name="title"
              onChange={editValueHandler}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label style={{ fontSize: "1.5rem" }}>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={editPost.author}
              id="author"
              name="author"
              onChange={editValueHandler}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label style={{ fontSize: "1.5rem" }}>
              Write content here
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              onChange={editValueHandler}
              id="text"
              name="text"
              placeholder={editPost.text}
            />
          </Form.Group>

          <Button onClick={savePostHandler} variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Container>
    );
  }
  return editedpost;
};

export default EditPost;
