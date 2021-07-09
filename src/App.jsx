import React from "react";
import Application from "./Components/Application";
import UserProvider from "./Providers/UserProvider";
import GlobalStyle from "./Styles/GlobalStyles";

function App() {

  return (
    <UserProvider>
      <GlobalStyle />
      <Application />
    </UserProvider>
  );
}

export default App;
