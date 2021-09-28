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

const DropDown = styled.button`
  border: none;
  outline:none;
  background-color: ${props => props.theme.bgColor};
  position: relative;
  width: 80px;
`;

const Button = styled.span`
  border-radius:4px;
  padding: 4px 15px;
  color:white;
  font-weight:600;
`;

const Li = styled.li`
  list-style: none;
`;

const Ul = styled.ul`
  list-style: none;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  color: #666666;
  line-height: 22px;
`;

const ListContainer = styled.div`
  border: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.theme.bgColor};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 3px;
  margin-top: 7px;
  position: absolute;
  display:none;
  ${DropDown}:active & {
    display: block;
    z-index:1;
  }
  ${DropDown}:focus & {
    display: block;
    z-index:1;
  }
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
                <Li>
                  <DropDown>
                      <FontAwesomeIcon icon={faUser} style={{justifyContent:"center", alignItems:"center"}} size="2x" color="black"/>
                  <ListContainer>
                  <Ul>
                    <Li><Link to={`/user/${data?.me?.studentId}`}>프로필</Link></Li>
                    {data?.me?.isManaged ? (<Li><Link to={`/manager`} >매니저</Link></Li>) : null} 
                    {data?.me?.isManaged ? (<Li><Link to={`/editor`} >맵 수정</Link></Li>) : null} 
                    <Li onClick={logUserOut}><Link>로그아웃</Link></Li>
                  </Ul>
                  </ListContainer>
                  </DropDown>
                </Li>
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