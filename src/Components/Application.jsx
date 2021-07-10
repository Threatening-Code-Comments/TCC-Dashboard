import React, { useContext, useState } from "react";
import { Router } from "@reach/router";
import { UserContext } from "../Providers/UserProvider";

import SignIn from "./SignIn";
import ProfilePage from "./ProfilePage";
import Dashboard from "./Dashboard";
import Navigation from "./Navigation";

import "../Styles/Application.css";

const Application = () => {
  const { user, preferences } = useContext(UserContext);

  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const changeTheme = (theme) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  }

  document.documentElement.setAttribute("data-theme", theme);

  return user ? (
    <div
      className="application"
      style={{
        background: `url(${
          preferences && preferences.background && preferences.background.imageURL
            ? preferences.background.imageURL
            : "https://cdn.wallpapersafari.com/25/18/HFWhux.png"
        }) center center / cover no-repeat fixed`
      }}
    >
      <Navigation theme={theme} setTheme={changeTheme} />
      <Router>
        <Dashboard default path="/" />
        <ProfilePage path="/profile" />
      </Router>
    </div>
  ) : (
    <SignIn />
  );
};

export default Application;
