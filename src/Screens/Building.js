import React,{useEffect, useState} from 'react';
import Header from 'Components/Header';
import {gql, useMutation, useQuery} from '@apollo/client';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';


const Card = styled.div`
    ${props => props.theme.whiteBox}
    display: flex;
    padding: 20px;
`;

const Content = styled.main`
    margin-top: 45px;
    margin: 0 auto;
    max-width: 930px;
    width: 100%;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
  },
  paper: {
    marginRight: theme.spacing(2),
    display:"inline-block",
  },
}));

const READ_BUILDING_QUERY = gql`
  query readBuilding($name:String!){
    readBuilding(name:$name){
      floors{
        id,
        name,
        Image
      }
    }
  }
`;

const Building = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const {name} = useParams();
  const [floor,setFloor] = useState([]);
  const onCompleted = (data) =>{
   const {readBuilding:{floors}} = data;
   if(floors){
      setFloor(floors);
   }
  };
  console.log(floor);
  const {data} = useQuery(READ_BUILDING_QUERY,{
    variables:{
      name
    },
    onCompleted
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
    <Header/>
    <Content>
      <Card>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <MenuList>
              {
                floor.map((f) => (<MenuItem onClick={handleClose} key={f.id}>{f.name}</MenuItem>))
              }
            </MenuList>
          </Paper>  
        </div>
        <p style={{display:"inline-block"}}>리액트 라우터 한 방에 끝내버리자.</p>
      </Card>
    </Content>
    </>
  );
};

export default Building;