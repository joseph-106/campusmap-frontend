import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import {gql, useMutation, useQuery} from '@apollo/client';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
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

const ImageContainer = styled.img`
  min-width:90%;
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
  const {name} = useParams();
  const [floor,setFloor] = useState([]);
  const [floorImage,setFloorImage] = useState("");
  const onCompleted = (data) =>{
   const {readBuilding:{floors}} = data;
   if(floors){
      setFloor(floors);
   }
  };

  const {data} = useQuery(READ_BUILDING_QUERY,{
    variables:{
      name
    },
    onCompleted
  });
  const handleClick = (event) => {
    const ImageF = floor[event.target.value-1].Image;
    setFloorImage(ImageF);
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
                floor.slice().sort((a,b) => a.id - b.id).map((f) => (<MenuItem onClick={handleClick} key={f.id} value={f.name}>{f.name}</MenuItem>))
              }
            </MenuList>
          </Paper>  
        </div>
        <ImageContainer src={floorImage} />
      </Card>
      <Footer/>
    </Content>
    </>
  );
};

export default Building;