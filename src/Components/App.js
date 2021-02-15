import React, {Component} from "react";
import styled,{ThemeProvider} from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import MapContainer from "./MapContainer";
import Engine from "../Routes/Engine"
import Footer from "./Footer";
import Header from "./Header";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles/>
        <Router>
          <>
          <Header/>
          <Wrapper>
            <Route path="/" component={MapContainer} exact/>
            <Route path="/공학관" component={Engine} />
            <Footer/>
          </Wrapper>
          </>
        </Router>

      </>
    </ThemeProvider>
  );
}

export default App;