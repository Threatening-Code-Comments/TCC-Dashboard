import React, { useState } from "react";

import { dataWrite } from "../../../Firebase";

import { FaRegSave } from "react-icons/fa";
import "../../../Styles/Dashboard/ProfilePage/Setting.css";

const Setting = (props) => {
  const { initialContent, name, path, placeholder } = props;
  const [content, setContent] = useState(initialContent);

  const valueChange = (e) => {
    setContent(e.target.value);
  };

  const valueSave = () => {
    dataWrite(`preferences/${path}`, content);
  };

  return (
    <div className="settingContainer">
      <div className="settingInputContainer glass">
        <input
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          required
          onChange={valueChange}
          value={content}
        />
        <hr />
        <label>{name}</label>
      </div>
      {content !== initialContent ? (
        <FaRegSave className="saveIcon" onClick={valueSave} />
      ) : null}
    </div>
  );
};

export default Setting;
