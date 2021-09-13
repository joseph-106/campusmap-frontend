import React from "react";
import styled from "styled-components";
import { Link, useParams, withRouter } from "react-router-dom";
import { isLoggedInVar, logUserOut } from "apollo";
import { useReactiveVar } from "@apollo/client";
import routes from "routes";
import useUser from "./Hooks/useUser";
import { faMapMarkedAlt, faSignOutAlt, faUser, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo2 from '../logo2.png'
import logo3 from '../logo3.png'
import { useMediaQuery } from "react-responsive"

const SHeader = styled.header`
  width: 100%;
  background-color: ${props => props.theme.bgColor};
  border-bottom: 1px solid ${props => props.theme.borderColor};
  border-radius: 0px 0px 20px 20px;
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

  const isPc = useMediaQuery({
    query : "(min-width:768px)"
  });
  const isMobile = useMediaQuery({
    query : "(max-width:767px)"
  });

  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Link to={'/'} >
            {isPc && <img src={logo2} alt='logo'/>}
            {isMobile && <img src={logo3} alt='logo'/>}
          </Link>
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
               {data?.me?.isManaged ? (
                 <Icon>
                   <Link to={`/manager`} >
                    <FontAwesomeIcon icon={faUserCog} size="2x" color="black"/>
                    <Font>Manager</Font>
                   </Link> 
                 </Icon>
               ) : null} 
               <Icon>
                 <Link to={`/user/${data?.me?.studentId}`}>
                    <FontAwesomeIcon icon={faUser} style={{justifyContent:"center", alignItems:"center"}} size="2x" color="black"/>
                    <Font>{data?.me?.name}</Font>
                  </Link>
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