import React, { useContext } from "react";
import { Link } from "@reach/router";
import { UserContext } from "../Providers/UserProvider";

import { FaHome } from "react-icons/fa";
import ImageButton from "../Styles/ImageButton";
import "../Styles/Navigation.css";

const Navigation = () => {
  const { user } = useContext(UserContext);
  const { photoURL } = user;

  return (
    <div className="navigation glass">
      <Link to="/" className="iconButton">
        <FaHome />
      </Link>
      <ImageButton url={photoURL} width="40px" height="40px" link="/profile" />
    </div>
  );
};

export default Navigation;
