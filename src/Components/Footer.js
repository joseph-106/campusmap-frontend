import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;

  font-style: normal;
  font-weight: bold;
  
  position: absolute;
  width: 100%;
  height: 110px;
  left: 0px;
  background: #878787;
`;

const List = styled.ul`
  display: flex;
`;

const Link = styled.a`
  color: #FFFFFF;
  font-size: 18px;
  margin-right: 15px;
`;

const Copyright = styled.span`
  color: #FFFFFF;
  font-size: 15px;
  margin-right: 15px;
`;

const Content = styled.span`
  color: #FFFFFF;
  font-size: 15px;
  margin-top: 10px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px; 
`;


export default () => (
  <Footer>
      <Div>
        <List>
        <Link href="https://www.websolute.co.kr/">about</Link>
        <Link href="https://www.hufspnp.com/">support</Link>
        <Link href="#">press</Link>
        <Link href="#">api</Link>
        </List>
        <Content style={{textTransform:"none"}}>✉ psh090953@gmail.com</Content>
      </Div>
    <List>
        <Copyright>Campus Map {new Date().getFullYear()} &copy;</Copyright>
    </List>
  </Footer>
);