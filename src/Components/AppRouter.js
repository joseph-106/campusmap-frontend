import React,{useState} from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Engine from "Routes/Engine";
import Auth from "../Routes/Auth"
import MapContainer from "./MapContainer";

const AppRouter = ({isLoggedIn}) => {
 
    return (
        <Router>
            <Switch>
                {isLoggedIn ? 
                <>
                <Route exact path="/">
                    <MapContainer/>
                </Route>
                <Route exact path="/공학관">
                    <Engine/>
                </Route>
                </> : 
                <Route exact path="/">
                    <Auth/>
                </Route>
                }
            </Switch>
        </Router>
    );
}
 
export default AppRouter;