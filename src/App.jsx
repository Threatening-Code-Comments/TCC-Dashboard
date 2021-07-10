import React from "react";
import Application from "./Components/Application";
import UserProvider from "./Providers/UserProvider";
import RoutineProvider from "./Providers/RoutineProvider";
import GlobalStyle from "./Styles/GlobalStyles";
import IconProvider from "./Providers/IconProvider";

function App() {
  return (
    <IconProvider>
      <UserProvider>
        <RoutineProvider>
          <GlobalStyle />
          <Application />
        </RoutineProvider>
      </UserProvider>
    </IconProvider>
  );
}

export default App;
