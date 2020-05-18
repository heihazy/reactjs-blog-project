import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Post.css";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import LikeDisplay from "../LikeDisplay/LikeDisplay";

const Post = () => {
  const [loadedPost, setLoadedPost] = useState();
  const [editPost, setEditPost] = useState();
  const [like, setLike] = useState(0);
  let { postId } = useParams();

  const addLike = () => {
    setLike(like + 1);
  };
  useEffect(() => {
    //fetch data when there is no loaded post, if there is dont do it
    if (!loadedPost) {
      axios
        .get("https://fibe-db.herokuapp.com/posts/" + postId)
        .then((response) => {
          setLoadedPost(response.data);
        });
    }
  });

  const editValueHandler = (e) => {
    setLoadedPost({
      ...loadedPost,
      [e.target.name]: e.target.value,
    });
  };

  const forcePostReload = () => {
    window.location.href = `https://fibe.herokuapp.com/blog/${postId}`;
  };

  const savePostHandler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .patch(
        `https://fibe-db.herokuapp.com/posts/${postId}`,
        loadedPost,
        config
      )
      .then((response) => {
        forcePostReload();
      });
  };

  const editPostHandler = (e) => {
    e.preventDefault();
    setEditPost(true);
    // const element = document.querySelector("H1");
    // element.setAttribute("contenteditable", true);
    // element.focus();
    // var val = element.value; //store the value of the element
    // element.value = ""; //clear the value of the element
    // element.value = val; //set that value back.
    // element.classList.add("editable");
  };

  //below we define tow possible situations
  let post = undefined;

  if (postId) {
    post = <h1>Loading post</h1>;
  }

  if (loadedPost && editPost) {
    post = (
      <Container>
        <Form style={{ paddingLeft: "2rem", paddingTop: "2rem" }}>
          <Form.Group controlId="formBasicName">
            <Form.Label style={{ fontSize: "1.5rem" }}>Image Url</Form.Label>
            <Form.Control
              type="text"
              name="img"
              defaultValue={loadedPost.img}
              onChange={(e) => editValueHandler(e)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicName">
            <Form.Label style={{ fontSize: "1.5rem" }}>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              defaultValue={loadedPost.title}
              onChange={(e) => editValueHandler(e)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label style={{ fontSize: "1.5rem" }}>Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={loadedPost.author}
              onChange={(e) => editValueHandler(e)}
              name="author"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label style={{ fontSize: "1.5rem" }}>
              Write content here
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="text"
              defaultValue={loadedPost.text}
              onChange={(e) => editValueHandler(e)}
            />
          </Form.Group>

          <Button onClick={savePostHandler} variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Container>
    );
  } else if (loadedPost) {
    post = (
      <Container>
        <Row className="post-card">
          <Image className="post" src={loadedPost.img} alt={loadedPost.title} />
          <Col className="blog-text">
            <h1 value="this.value">Post {loadedPost.id}</h1>
            <h3>{loadedPost.author}</h3>
            <p>{loadedPost.title}</p>
            <p>{loadedPost.text}</p>
            <div className="like-display">
              <Button onClick={addLike} variant="outline-primary">
                <FontAwesomeIcon icon={faThumbsUp} />
              </Button>
              <Button variant="outline-primary">
                <LikeDisplay like={like} />
              </Button>
            </div>
            <Alert>
              <Link to="/blog">Back to Blog</Link>
            </Alert>
            <Button onClick={editPostHandler} variant="success" type="submit">
              Edit
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
  return post;
};

export default Post;
