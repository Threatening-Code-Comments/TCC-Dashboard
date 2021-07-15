import React from "react";
import { getProgramData } from "../../ProgramsData";
const electron = window.require("electron");

import "../../Styles/Dashboard/ActionCenter.css";

const ActionCenter = () => {
  const programData = getProgramData();

  return (
    <div className="actionCenter glass card">
      {programData.map((program, i) => (
        <img src={program.icon} alt="Program Icon" onClick={() => electron.shell.openExternal(program.exe)} key={program.exe} />
      ))}
    </div>
  );
};

export default ActionCenter;
