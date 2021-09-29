import React,{useState} from 'react';
import {gql, useMutation} from "@apollo/client";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Header from 'Components/Header';
import Footer from "Components/Footer";
import { Form } from 'react-bootstrap';
import { CREATE_BUILDING_MUTATTION, CREATE_FLOOR_MUTATTION } from 'Components/Mutation/MapEditorMutation';

const Card = styled.div`
    ${props => props.theme.whiteBox}
    padding: 20px;
`;

const Content = styled.main`
    margin-top: 45px;
    margin: 0 auto;
    max-width: 930px;
    width: 100%;
`;

const Subtitle = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: #606060;
    margin-top: 15px;
    margin-left: 35px;
`;

const Contain = styled.div`
    border: 0.5px solid ${(props) => props.hasError ? "tomato" : props.theme.borderColor};
    border-radius: 30px;
    margin-bottom: 20px;
`;

const Div = styled.div`
    display:flex;
    padding: 15px;
`;

const Input = styled.input`
    height: 35px;
    width: 120px;
    width : ${ props => props.width };
    border-radius: 10px;
    padding: 0 10px;
    background-color:#fafafa;
    border: 0.5px solid ${(props) => props.hasError ? "tomato" : props.theme.borderColor};
    margin-left: 20px;
    box-sizing:border-box;
    &:focus{
        border-color:rgb(38,38,38);
    }
`;

const Button = styled.input`
    border:none;
    border-radius: 10px;
    margin-left:30px;
    margin-bottom: ${props => props.bottom};
    background-color:${(props) => props.theme.accent};
    color: white;
    text-align:center;
    padding: 8px 0px;
    font-weight: 600;
    width: 60px;
    height: 20px;
    opacity: ${props => props.disabled ? "0.2": "1"}
`;

const MapEditor = () => {
    const {register,handleSubmit,formState,getValues} = useForm({
        mode:"onChange"
    });
    const CreateBuildingCompleted = (data) => {
        const {
            createBuilding:{
                ok,
                error
            }
        } = data;
        if(!ok){
            return;
        }
    };
    const [createBuilding, {loading:createBuildingLoading}] = useMutation(CREATE_BUILDING_MUTATTION,{
        onCompleted:CreateBuildingCompleted
    });
    const onSubmitCreateBuildingValid = (data) => {
        if(createBuildingLoading){
            return;
        }
        createBuilding({
            variables:{
                ...data
            }
        });
    }

    const CreateFloorCompleted = (data) => {
        const {
            createFloor:{
                ok,
                error
            }
        } = data;
        if(!ok){
            return;
        }
    };
    const [createFloor,{loading:createFloorLoading}] = useMutation(CREATE_FLOOR_MUTATTION,{
        onCompleted:CreateFloorCompleted
    });
    const onSubmitCreateFloorValid = (data) => {
        if(createFloorLoading){
            return;
        }
        createFloor({
            variables:{
                ...data
            }
        });
    }

    return (
        <>
            <Helmet>
                <title>MapEditor | CampusMap</title>
            </Helmet>
            <Header/>
            <Content>
                <Card>
                    <form onSubmit={handleSubmit(onSubmitCreateBuildingValid)}>
                    <Contain>
                        <Subtitle>건물 생성</Subtitle>
                        <Div>
                            <Input
                                ref={register({
                                    required:"name is required."
                                })}
                                name="name"
                                type="text" 
                                placeholder="이름"
                            />
                            <Input
                                ref={register({
                                    required:"latitude is required."
                                })}
                                name="lat"
                                type="text" 
                                placeholder="경도"
                            />
                            <Input
                                ref={register({
                                    required:"longitude is required."
                                })}
                                name="lng"
                                type="text" 
                                placeholder="위도"
                            />
                            <Button type="submit"/>
                        </Div>
                    </Contain>
                    </form>
                    <form onSubmit={handleSubmit(onSubmitCreateFloorValid)}>
                    <Contain>
                        <Subtitle>층 생성</Subtitle>
                        <Div>
                            <Input
                                ref={register({
                                    required:"name is required."
                                })}
                                name="name"
                                type="text" 
                                placeholder="이름"
                            />
                            <Input
                                ref={register({
                                    required:"buildingName is required."
                                })}
                                name="buildingName"
                                type="text" 
                                placeholder="이름"
                            />
                        </Div>
                        <Div>
                            <Form.Group controlId="formFile" className="mx-3">
                                <Form.Control ref={register({
                                    required:"학생증 사진을 넣어주세요",
                                    })}
                                    name="Image"
                                    type="file"
                                />
                            </Form.Group>
                            <Button type="submit"/>
                        </Div>
                    </Contain>
                    </form>
                    <form>
                    <Contain>
                        <Subtitle>층 수정</Subtitle>
                        <Div>
                            <Input placeholder="이름"></Input>
                        </Div>
                        <Div>
                            <Form.Group controlId="formFile" className="mx-3">
                                <Form.Control type="file"/>
                            </Form.Group>
                            <Button type="submit"/>
                        </Div>
                    </Contain>
                    </form>
                    <form>
                    <Contain>
                        <Subtitle>룸 생성</Subtitle>
                        <Div>
                            <Input placeholder="방호수"></Input>
                            <Input placeholder="오픈시간"></Input>
                            <Input placeholder="종료시간"></Input>
                            <Input placeholder="층id"></Input>
                        </Div>
                        <Div>
                            <Input width="500px" placeholder="설명"></Input>
                            <Button type="submit"/>
                        </Div>
                    </Contain>
                    </form>
                    <form>
                    <Contain>
                        <Subtitle>룸 수정</Subtitle>
                        <Div>
                            <Input placeholder="방호수"></Input>
                            <Input placeholder="오픈시간"></Input>
                            <Input placeholder="종료시간"></Input>
                        </Div>
                        <Div>
                            <Input width="500px" placeholder="설명"></Input>
                            <Button type="submit"/>
                        </Div>
                    </Contain>
                    </form>
                </Card>
                <Footer/>
            </Content>
        </>
    );
}
export default MapEditor;