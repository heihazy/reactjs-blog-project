import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../Post/Post";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Blog.css";
const Blog = () => {
  const [post, setPost] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    axios.get("https://fibe-db.herokuapp.com/posts").then((response) => {
      const posts = response.data;
      setPost(posts);
      console.log(posts);
    });
  }, []);

  const removeHandler = (id) => {
    console.log(id);
    axios
      .delete("https://fibe-db.herokuapp.com/posts/" + id)
      .then(() => {
        return axios.get("https://fibe-db.herokuapp.com/posts");
      })
      .then((response) => {
        setPost(response.data);
      });
  };

  const postList = post.map((post) => {
    return (
      <Col xs={6} key={post.id}>
        <Card>
          <Card.Img variant="top" src={post.img} alt={post.title} />
          <Card.Body className="card-text">
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.author}</Card.Text>
            <Card.Text>{post.text}</Card.Text>
            <div className="card-btn">
              <Button variant="outline-info">
                <Link to={`${match.url}/${post.id}`}>Read More</Link>
              </Button>

              <Button onClick={() => removeHandler(post.id)}>
                Delete Post
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  });
  return (
    <Container style={{ paddingTop: "1rem" }}>
      <Row md={3}>
        <Switch>
          <Route path="/blog/:postId">
            <Post />
          </Route>
          <Route path="/blog/edit/:postId"></Route>
          <Route path={match.path}>{postList}</Route>
        </Switch>
      </Row>
    </Container>
  );
};
export default Blog;
