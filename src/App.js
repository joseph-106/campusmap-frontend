import { useReactiveVar } from "@apollo/client";
import React, {Component, useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "Screens/Login";
import MapContainer from "Screens/MapContainer";
import NotFound from "Screens/NotFound";
import {isLoggedInVar} from "./apollo";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  
  return (
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
  );
}

export default App;