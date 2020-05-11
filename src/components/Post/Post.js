import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./Post.css";
import axios from "axios";

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
      <div className="fullPost">
        <h1>Post {loadedPost.id}</h1>
        <h3>{loadedPost.author}</h3>
        <p>{loadedPost.title}</p>
        <img src={loadedPost.img} alt={loadedPost.title} />
        <div>
          <Link to="/blog">Back to Blog</Link>
        </div>
      </div>
    );
  }
  return post;
};

export default Post;
