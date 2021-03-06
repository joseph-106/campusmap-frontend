import { useReactiveVar } from "@apollo/client";
import React, {Component, useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "Screens/Login";
import MapContainer from "Screens/MapContainer";
import NotFound from "Screens/NotFound";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "Styles/Theme";
import {darkModeVar, isLoggedInVar} from "./apollo";
import GlobalStyles from "Styles/GlobalStyles";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar)
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles/>
      <Router>
        <Switch>   
          <Route path="/" exact>
            {isLoggedIn ? (
              <MapContainer/>
            ) : (
              <Login/>
            )}
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;