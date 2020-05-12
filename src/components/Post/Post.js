import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Post.css";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
const Post = () => {
  const [loadedPost, setLoadedPost] = useState();
  let { postId } = useParams();
  useEffect(() => {
    //fetch data when there is no loaded post, if there is dont do it
    if (!loadedPost) {
      axios.get("http://localhost:3001/posts/" + postId).then((response) => {
        console.log(response.data);
        setLoadedPost(response.data);
      });
    }
  });

  //below we define tow possible situations
  let post = undefined;

  if (postId) {
    post = <h1>Loading post</h1>;
  }

  if (loadedPost) {
    post = (
      <Container>
        <Row className="post-card">
          <Image
            className="post"
            src={loadedPost.img}
            alt={loadedPost.title}
            fluid
          />
          <Col className="blog-text">
            <h1>Post {loadedPost.id}</h1>
            <h3>{loadedPost.author}</h3>
            <p>{loadedPost.title}</p>
            <p>{loadedPost.text}</p>
            <Alert>
              <Alert.Link>
                <Link to="/blog">Back to Blog</Link>
              </Alert.Link>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }
  return post;
};

export default Post;
