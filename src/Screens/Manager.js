import React,{useState} from 'react';
import { Helmet } from "react-helmet-async";
import {gql, useMutation, useQuery} from '@apollo/client';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from 'Components/Header';
import Footer from "Components/Footer";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


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
  width:50%;
`;

const SEE_USERS_QUERY = gql`
    query seeUsers{
        seeUsers{
            id,
            name,
            major,
            studentId,
            idCard,
            verified,
            isManaged
        }
    }
`;

const VERIFIED_USER_MUTATION = gql`
    mutation verifiedUser($id:Int!){
        verifiedUser(
            id:$id
        ){
            ok
            error
        }
    }
`;

const MANAGED_USER_MUTATION = gql`
    mutation managedUser($id:Int!){
        managedUser(
            id:$id
        ){
            ok
            error
        }
    }
`;

const REMOVE_USER_MUTATION = gql`
    mutation removeUser($id:Int!){
        removeUser(id:$id){
            ok
            error
        }
    }
`;

const Manager = () => {
    const classes = useStyles();
    const {data} = useQuery(SEE_USERS_QUERY);
    const [verifiedUser] = useMutation(VERIFIED_USER_MUTATION);
    const [managedUser] = useMutation(MANAGED_USER_MUTATION);
    const [removeUser] = useMutation(REMOVE_USER_MUTATION);
    const onClickHandlerV = (e) => {
        const id = Number(e.target.value);
        const verifiedUserUpdate = (cache,result) => {
            const {
                data:{
                    verifiedUser:{ok}
                }
            } = result;
            if(!ok){
                return;
            }
            cache.modify({
                id:`User:${id}`,
                fields:{
                    verified(prev){
                        return !prev;
                    }
                }
            });
        }
        verifiedUser({
            variables:{
                id
            },
            update:verifiedUserUpdate
        });
        
    }
    const onClickHandlerM = (e) => {
        const id = Number(e.target.value);
        const managedUserUpdate = (cache,result) => {
            const {
                data:{
                    managedUser:{ok}
                }
            } = result;
            if(!ok){
                return;
            }
            cache.modify({
                id:`User:${id}`,
                fields:{
                    isManaged(prev){
                        return !prev;
                    }
                }
            });
        }
        managedUser({
            variables:{
                id
            },
            update:managedUserUpdate
        });   
    }
    const onDelteClick = (e) => {
        const id = Number(e.target.value);
        const removeUserUpdate = (cache,result) => {
            const {
                data:{
                    removeUser:{ok}
                }
            } = result;
            if(ok){
                cache.evict({id:`User:${id}`})
            }
        }
        removeUser({
            variables:{
                id
            },
            update:removeUserUpdate
        })
    }
    return (
        <>
            <Helmet>
                <title>Manager | CampusMap</title>
            </Helmet>
            <Header/>
            <Content>
                <Card>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>deleteUser</TableCell>
                                    <TableCell align="right">StudentId</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Major</TableCell>
                                    <TableCell align="right">Verified</TableCell>
                                    <TableCell align="right">isManaged</TableCell>
                                    <TableCell>idCard</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.seeUsers?.map((user) => (
                                    <TableRow key={user.studentId}>
                                        <TableCell component="th" scope="row">
                                            <button value={user.id} onClick={onDelteClick} >❌</button>
                                        </TableCell>
                                        <TableCell>
                                            {user.studentId}
                                        </TableCell>
                                        <TableCell align="right">{user.name}</TableCell>
                                        <TableCell align="right">{user.major}</TableCell>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={user.verified}
                                                onClick={onClickHandlerV}
                                                value={user.id}
                                            />
                                        </TableCell>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={user.isManaged}
                                                onClick={onClickHandlerM}
                                                value={user.id}
                                            />
                                        </TableCell>
                                        <TableCell>{user.idCard ?
                                            <ImageContainer src={user.idCard}/> : null}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
                <Footer/>
            </Content>
        </>
    );
}
export default Manager;