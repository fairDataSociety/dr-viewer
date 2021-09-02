import React, { useContext } from "react";
import "./App.css";
import { StoreProvider } from "./store/store";
import { ThemeContext, ThemeProvider } from "./store/themeContext/themeContext";
import MainWrapper from "./containers/MainWrapper";

const App = () => {
  return (
    <div className="App">
      <StoreProvider>
        <ThemeProvider>
          <MainWrapper />
        </ThemeProvider>
      </StoreProvider>
    </div>
  );
};

export default App;
