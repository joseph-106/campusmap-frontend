import React, {Component, useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "Screens/Login";
import MapContainer from "Screens/MapContainer";
import NotFound from "Screens/NotFound";


function App() {
  const isLoggedIn = false;
  return (
    <Router>
      <Switch>   
        <Route path="/" exact>
          {
            isLoggedIn ? <MapContainer/> : <Login/>
          }
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;