import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  margin:50px 0px;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: ${props => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;

const Content = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;


export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="#">about us</Link>
      </ListItem>
      <ListItem>
        <Link href="#">support</Link>
      </ListItem>
      <ListItem>
        <Link href="#">press</Link>
      </ListItem>
      <ListItem>
        <Link href="#">api</Link>
      </ListItem>
    </List>
    <List>
      <ListItem>
        <Content>Tel) 010-xxxx-xxxx</Content>
      </ListItem>
      <ListItem> 
        <Content style={{textTransform:"none"}}>E) pxxxxxxxxx@gmail.com</Content>
      </ListItem>
      <ListItem>
        <Copyright>CampusMap {new Date().getFullYear()} &copy;</Copyright>
      </ListItem>
    </List>
  </Footer>
);