import { ApolloProvider, useReactiveVar } from "@apollo/client";
import React, {Component, useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "Screens/Login";
import MapContainer from "Screens/MapContainer";
import NotFound from "Screens/NotFound";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme,GlobalStyles } from "Theme";
import {client, darkModeVar, isLoggedInVar} from "./apollo";
import Signup from "Screens/Signup";
import routes from "routes";
import { HelmetProvider } from "react-helmet-async";
import Home from "Screens/Home";
import Profile from "Screens/Profile";
import Building from "Screens/Building";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar)
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles/>
        <Router>
          <Switch>   
            <Route path={routes.home} exact>
              {isLoggedIn ? (    
                <Home/>
              ) : (
                <Login/>
              )}
            </Route>
            {!isLoggedIn ? (
              <Route path={routes.signUp}>
                <Signup/>
              </Route>
            ):null}
            <Route path={`/user/:name`}>
              <Profile/>
            </Route>
            <Route path={`/:name`}>
              <Building/>
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;