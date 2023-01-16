import React, { useContext } from "react";
import "./App.css";
import { StoreProvider } from "./store/store";
import { ThemeProvider } from "./store/themeContext/themeContext";
import MainWrapper from "./containers/MainWrapper";
import { SessionProvider } from "./context/session";

const App = () => {
  return (
    <div className="App">
      <SessionProvider>
        <StoreProvider>
          <ThemeProvider>
            <MainWrapper />
          </ThemeProvider>
        </StoreProvider>
      </SessionProvider>
    </div>
  );
};

export default App;
