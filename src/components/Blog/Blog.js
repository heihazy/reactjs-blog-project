import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../Post/Post";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Blog = () => {
  const [post, setPost] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      const posts = response.data; //slice data from 0 to 10
      setPost(posts);
      console.log(posts);
    });
  }, []);

  const removeHandler = (id) => {
    console.log(id);
    axios
      .delete("http://localhost:3001/posts/" + id)
      .then(() => {
        return axios.get("http://localhost:3001/posts");
      })
      .then((response) => {
        setPost(response.data);
      });
  };
  const postList = post.map((post) => {
    return (
      <Col xs={6}>
        <Card key={post.id}>
          <Card.Img variant="top" src={post.img} alt={post.title} />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.author}</Card.Text>
            <Card.Text>{post.text}</Card.Text>
            <Button variant="outline-info">
              <Link to={`${match.url}/${post.id}`}>Read More</Link>
            </Button>

            <Button onClick={() => removeHandler(post.id)}>Delete Post</Button>
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
          <Route path={match.path}>{postList}</Route>
        </Switch>
      </Row>
    </Container>
  );
};
export default Blog;
