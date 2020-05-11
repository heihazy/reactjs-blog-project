import React from "react";

import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ title, author, img, text, link, remove }) => {
  return (
    <div className="cards">
      <h2>{title}</h2>
      <h3>{author}</h3>
      <p>{text}</p>
      <img src={img} alt={title} />
      <Link to={link}>Read more</Link>
      <button onClick={remove}>Delete post</button>
    </div>
  );
};

export default Card;
