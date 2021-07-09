import React, { useContext } from "react";
import { Router } from "@reach/router";
import { UserContext } from "../Providers/UserProvider";

import SignIn from "./SignIn";
import ProfilePage from "./ProfilePage";
import Dashboard from "./Dashboard";
import Navigation from "./Dashboard/Navigation";

import "../Styles/Application.css";

const Application = () => {
  const { user, preferences } = useContext(UserContext);
  return user ? (
    <div
      className="application"
      style={{
        background: `url(${
          preferences
            ? preferences.background.imageURL
            : "https://cdn.wallpapersafari.com/25/18/HFWhux.png"
        }) center center / cover no-repeat fixed`
      }}
    >
      <Navigation />
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
