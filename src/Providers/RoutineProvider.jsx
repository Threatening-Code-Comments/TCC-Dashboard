import firebase from "firebase";
import React, { Component, createContext } from "react";
import { UserContext } from "./UserProvider";

export const RoutineContext = createContext({
  routines: null,
  routineData: null,
});

class RoutineProvider extends Component {
  state = {
    routines: null,
    routineData: null,
    initialized: false,
  };

  static contextType = UserContext;

  componentDidUpdate() {
    const { user } = this.context;

    if (user && !this.state.initialized) {
      firebase
        .database()
        .ref("users/" + user.uid + "/routines")
        .on("value", (snapshot) => {
          if (!snapshot.val()) {
            this.setState({ routines: [], initialized: true });
            return;
          }

          const routineList = [];

          for (let routineID of Object.keys(snapshot.val())) {
            routineList.push(snapshot.val()[routineID]);
          }

          routineList.sort((a, b) => b.lastUsed - a.lastUsed);

          this.setState({ routines: routineList, initialized: true });
        });
    }
  }

  render() {
    const state = this.state;

    return (
      <RoutineContext.Provider value={state}>
        {this.props.children}
      </RoutineContext.Provider>
    );
  }
}

export default RoutineProvider;
