import React, { useContext } from "react";
import { UserContext } from "../Providers/UserProvider";

import Setting from "./Dashboard/ProfilePage/Setting";

import { auth } from "../Firebase";
import { Link } from "@reach/router";

const ProfilePage = () => {
  const { user, preferences } = useContext(UserContext);
  const { displayName, email } = user;

  return (
    <div className="container profilePage">
      <h1>Profile of {displayName}</h1>
      <h3>{email}</h3>

      {preferences ? (
        <Setting
          name="Open Weather Map Key"
          path="weather/openWeatherMapKey"
          placeholder="9abc73a2d32e17dd9d7c8b69caf13ce8"
          initialContent={preferences.weather.openWeatherMapKey}
        />
      ) : null}
      {preferences ? (
        <Setting
          name="Background Image URL"
          path="background/imageURL"
          placeholder="https://cdn.wallpapersafari.com/25/18/HFWhux.png"
          initialContent={preferences.background.imageURL}
        />
      ) : null}

      <Link to="/login" className="glassParent">
        <button
          onClick={() => {
            auth.signOut();
          }}
          className="button glass"
        >
          <span>Sign out</span>
        </button>
      </Link>
    </div>
  );
};

export default ProfilePage;
