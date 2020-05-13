import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import axios from "axios";
const Create = () => {
  const [newPost, setNewPost] = useState({
    img: "",
    title: " ",
    author: " ",
    text: "",
  });
  const changeValueHandler = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };
  const addPostHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/posts", newPost).then((response) => {
      console.log(response.data);
    });
    forceReload();
  };

  const forceReload = () => {
    window.location.href = "http://localhost:3000/blog";
  };

  return (
    <Container>
      <h2>Join the community by writing your story below</h2>
      <Form style={{ width: "50%", paddingLeft: "2rem", paddingTop: "2rem" }}>
        <Form.Group controlId="formBasicName">
          <Form.Label style={{ fontSize: "1.5rem" }}>Image Url</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image url"
            id="img"
            name="img"
            onChange={changeValueHandler}
          />
        </Form.Group>
        <Form.Group controlId="formBasicName">
          <Form.Label style={{ fontSize: "1.5rem" }}>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            id="title"
            name="title"
            onChange={changeValueHandler}
          />
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label style={{ fontSize: "1.5rem" }}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            id="author"
            name="author"
            onChange={changeValueHandler}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label style={{ fontSize: "1.5rem" }}>
            Write content here
          </Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            onChange={changeValueHandler}
            id="text"
            name="text"
          />
        </Form.Group>

        <Button onClick={addPostHandler} variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default Create;
