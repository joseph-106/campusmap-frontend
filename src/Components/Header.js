import React from "react";
import styled from "styled-components";
import { faMapMarkedAlt, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter } from "react-router-dom";
import Input from "../Components/Auth/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoggedInVar, logUserOut } from "apollo";
import routes from "routes";
import { useReactiveVar } from "@apollo/client";
import useUser from "./Hooks/useUser";

const SHeader = styled.header`
  width: 100%;
  background-color: ${props => props.theme.bgColor};
  border-bottom: 1px solid ${props => props.theme.borderColor};
  padding: 18px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 930px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div`
  
`;

const Icon = styled.span`
  margin-left:15px;
`;

const Button = styled.span`
  background-color: ${props => props.theme.bgColor};
  border-radius:4px;
  padding: 4px 15px;
  color:white;
  font-weight:600;
`;

const IconsContainer = styled.div`
  display:flex;
`;

const Font = styled.span`
  font-size:10px;
  font-weight: 1000;
  padding: 2px 0px;
  display:flex;
`;


const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const {data} = useUser();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faMapMarkedAlt} size="3x" color="black"/>
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
               <Icon>
                  <FontAwesomeIcon icon={faUser} style={{justifyContent:"center", alignItems:"center"}} size="2x" color="black"/>
                  <Font>{data?.me?.name}</Font>
                </Icon>
                <Icon onClick={logUserOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} size="2x" color="black"/>
                </Icon> 
            </IconsContainer>
          ) : (
            <Link href={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}

export default Header;