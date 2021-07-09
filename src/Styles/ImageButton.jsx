import { Link } from "@reach/router";
import React from "react";
import "./ImageButton.css";

const ImageButton = (props) => {
  return props.link ? (
    <Link to={props.link}>
      <button
        style={{
          background: `url(${props.url}) no-repeat center center`,
          backgroundSize: "cover",
          height: props.height,
          width: props.width,
        }}
        className="imageButton"
      ></button>
    </Link>
  ) : (
    <button
      style={{
        background: `url(${props.url}) no-repeat center center`,
        backgroundSize: "cover",
        height: props.height,
        width: props.width,
      }}
      className="imageButton"
      onClick={props.onClick}
    ></button>
  );
};

export default ImageButton;
