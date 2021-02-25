import React, {Component, useEffect, useState} from "react";
import styled,{ThemeProvider} from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import MapContainer from "./MapContainer";
import Engine from "../Routes/Engine"
import Footer from "./Footer";
import Header from "./Header";
import {authService} from "../fbase";
import AppRouter from "./AppRouter";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[])
 
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles/>
        <Router>
          <>
          <Header/>
          <Wrapper>
            {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing..."}
            <Footer/>
          </Wrapper>
          </>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;