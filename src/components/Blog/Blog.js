import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Post from "../Post/Post";

const Blog = () => {
  const [post, setPost] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      const posts = response.data.slice(0, 10); //slice data from 0 to 10
      setPost(posts);
      console.log(posts);
    });
  }, []); //this empty array let the data run only once

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

  const PostList = post.map((p) => {
    return (
      <Card
        key={p.id}
        title={p.title}
        author={p.author}
        text={p.text}
        img={p.img}
        link={`${match.url}/${p.id}`}
        remove={() => removeHandler(p.id)}
      />
    );
  });

  return (
    <>
      <Switch>
        <Route path="/blog/:postId">
          <Post />
        </Route>
        <Route path={match.path}>
          <div className="posts">{PostList}</div>
        </Route>
      </Switch>
    </>
  );
};

export default Blog;
