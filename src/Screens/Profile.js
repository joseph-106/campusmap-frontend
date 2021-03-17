import React,{useState} from 'react';
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from 'Components/Header';
import styled from "styled-components";
import {gql, useMutation, useQuery,useReactiveVar} from '@apollo/client';
import { useForm } from "react-hook-form";
import Input from 'Components/Auth/Input';
import Button from 'Components/Auth/Button';
import FormError from 'Components/Auth/FormError';
import Switch from '@material-ui/core/Switch';
import { darkModeVar, disableDarkMode, enableDarkMode } from "apollo";
import Footer from "Components/Footer";
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
  margin-left:10px;
`;

const SEE_PROFILE_QUERY = gql`
    query seeProfile($studentId:String!){
        seeProfile(studentId:$studentId){
            name,
            password,
            major,
            idCard
        }
    }
`;

const EDIT_PROFILE_MUTATION = gql`
    mutation editProfile($name:String, $password:String, $major:String){
        editProfile(
            name:$name,
            password:$password,
            major:$major
        ){
            ok
            error
        }
    }
`;

const Profile = () => { 
    const {studentId} = useParams();
    const darkMode = useReactiveVar(darkModeVar);
    const [IdCard,setIdCard] = useState("");
    const [Major,setMajor] = useState("");
    const [Name,setName] = useState("");
    const [Password,setPassword] = useState("");
    const {register, handleSubmit, errors, formState,getValues,setError,clearErrors} = useForm({
        mode: "onChange",
    });
    const onCompletedQ = (data) =>{
        const {seeProfile:{idCard,major,name,password}} = data;
        setIdCard(idCard);
        setMajor(major);
        setName(name);
        setPassword(password);
    };
    const onCompletedM = (data) => {
        const {editProfile:{ok,error}} = data;
        if(!ok){
            return setError("result",{
                message:error,
            });
        }
    }
    const {data} = useQuery(SEE_PROFILE_QUERY,{
        variables:{
          studentId
        },
        onCompleted:onCompletedQ
    });
    const [editProfile,{loading}] = useMutation(EDIT_PROFILE_MUTATION,{
        onCompleted:onCompletedM
    });
    const onSubmitValid = (data) => {
        if(loading){
            return;
        }
        const {name, password, major} = getValues();
        if(name!==""){
            editProfile({
                variables:{
                    name,
                }
            });
        }
        if(password!==""){
            editProfile({
                variables:{
                    password,
                }
            });
        }
        if(major!==""){
            editProfile({
                variables:{
                    major
                }
            });
        }
        
    };
    const clearLoginError = () => {
        clearErrors("result")
    };
    return (
        <>
            <Helmet>
                <title>Profile | CampusMap</title>
            </Helmet>
            <Header/>
            <Content>
                <FormControlLabel
                    control={<Switch
                                color="default"
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                                onChange={darkMode ? disableDarkMode : enableDarkMode}
                            />}
                    label="Dark Mode"
                /> 
                <Card>
                    <form onSubmit={handleSubmit(onSubmitValid)}>
                        <Input ref={register()} onChange={() => clearLoginError()} name="name" type="text" placeholder={Name} hasError={Boolean(errors?.name?.message)} />
                        <FormError message={errors?.name?.message}/>
                        <Input ref={register()} onChange={() => clearLoginError()} name="major" type="text" placeholder={Major} hasError={Boolean(errors?.major?.message)} />
                        <FormError message={errors?.major?.message}/>
                        <Input ref={register({
                            minLength:{
                                value: 4,
                                message: "4자리 이상 입력하셔야 합니다."
                            },
                        })} onChange={() =>clearLoginError()} name="password" type="password" placeholder="비밀번호" hasError={Boolean(errors?.password?.message)}/>
                        <FormError message={errors?.password?.message}/>
                        <Button type="submit" value={loading ? "Loading..." : "Save"} disabled={!formState.isValid || loading}/>
                        <FormError message={errors?.result?.message}/>   
                    </form>
                    <ImageContainer src={IdCard}/>
                </Card>
                <Footer/>
            </Content>
        </>
    );
}

export default Profile;