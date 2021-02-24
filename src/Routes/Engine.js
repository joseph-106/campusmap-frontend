import React, {useState} from 'react';
import styled from "styled-components";
import MenuList from '../Components/Menu';

const Card = styled.div`
    ${props => props.theme.whiteBox}
    display: flex;
    padding: 20px;
`;

const Engine = () => {
  return (
    <Card>
      <MenuList/>
      <p style={{display:"inline-block"}}>리액트 라우터 한 방에 끝내버리자.</p>
    </Card>
  );
};

export default Engine;