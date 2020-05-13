import React from "react";
import homephoto from "../../homephoto.jpg";
import "./Home.css";

const Home = () => {
  return (
    <div className="landing-page">
      <img className="landing-photo" src={homephoto} alt="landingpage" />
      <h2 className="slogan">A Bee in Fin</h2>
    </div>
  );
};

export default Home;
