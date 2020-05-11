import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./MainNav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import fibelogo from "../../fibe-logo.jpg";
const MainNav = () => {
  return (
    <div className="main-nav">
      <NavBar />
      <div>
        <Link to="/">
          <img className="logo" src={fibelogo} alt="logo" />
        </Link>
      </div>
      <span className="search-btn">
        <FontAwesomeIcon icon={faSearch} />
      </span>
    </div>
  );
};

export default MainNav;
