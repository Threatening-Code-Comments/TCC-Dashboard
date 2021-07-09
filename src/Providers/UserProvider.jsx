import firebase from "firebase";
import React, { Component, createContext } from "react";
import { auth, dataWrite, setFirebaseUser } from "../Firebase";

export const UserContext = createContext({ user: null, preferences: null });

class UserProvider extends Component {
  state = {
    user: null,
    preferences: null,
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async (user) => {
      setFirebaseUser(user);
      this.setState({ user: user });

      if (!this.state.user) return;

      firebase
        .database()
        .ref(`users/${this.state.user.uid}/preferences`)
        .on("value", (preferences) => {
          if (!preferences.val()) {
            dataWrite("preferences", {
              dev: {
                debug: "value",
              },
              general: {
                dataSaving: "value",
              },
            });
          }

          this.setState({ preferences: preferences.val() });
        });
    });
  };

  render() {
    const state = this.state;

    return (
      <UserContext.Provider value={state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
