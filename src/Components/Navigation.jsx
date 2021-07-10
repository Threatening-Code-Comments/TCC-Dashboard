import React, { useContext } from "react";
import { Link } from "@reach/router";
import { UserContext } from "../Providers/UserProvider";

import { FaHome } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import ImageButton from "../Styles/ImageButton";
import "../Styles/Navigation.css";

const Navigation = (props) => {
  const { user } = useContext(UserContext);
  const { photoURL } = user;

  return (
    <div className="navigation glass">
      {props.theme === "light" ? (
        <a
          href="#"
          className="iconButton"
          onClick={() => props.setTheme("dark")}
        >
          <FiSun />
        </a>
      ) : (
        <a
          href="#"
          className="iconButton"
          onClick={() => props.setTheme("light")}
        >
          <FiMoon />
        </a>
      )}
      <Link to="/" className="iconButton">
        <FaHome />
      </Link>
      <ImageButton url={photoURL} width="40px" height="40px" link="/profile" />
    </div>
  );
};

export default Navigation;
