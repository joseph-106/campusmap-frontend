import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Detail from '../Components/Menu';

const Card = styled.div`
    ${props => props.theme.whiteBox}
    display: flex;
    padding: 20px;
`;

const Building = () => {
  const params = useParams();
  console.log(params);
  return (
    <Card>
      <Detail/>
      <p style={{display:"inline-block"}}>리액트 라우터 한 방에 끝내버리자.</p>
    </Card>
  );
};

export default Building;