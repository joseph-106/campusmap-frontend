import React,{useState} from 'react';
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Header from 'Components/Header';
import Footer from "Components/Footer";
import { Form } from 'react-bootstrap';

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
    return (
        <>
            <Helmet>
                <title>MapEditor | CampusMap</title>
            </Helmet>
            <Header/>
            <Content>
                <Card>
                    <form>
                    <Contain>
                        <Subtitle>건물 생성</Subtitle>
                        <Div>
                            <Input placeholder="이름"></Input>
                            <Input placeholder="경도"></Input>
                            <Input placeholder="위도"></Input>
                            <Button type="submit"/>
                        </Div>
                    </Contain>
                    </form>
                    <form>
                    <Contain>
                        <Subtitle>층 생성</Subtitle>
                        <Div>
                            <Input placeholder="이름"></Input>
                            <Input placeholder="빌딩이름"></Input>
                        </Div>
                        <Div>
                            <Form.Group controlId="formFile" className="mx-3">
                                <Form.Control type="file" />
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