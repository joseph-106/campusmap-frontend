import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Header from "Components/Header";
import Footer from "Components/Footer";
import MapContainer from "./MapContainer";

const Content = styled.main`
    margin-top: 45px;
    margin: 0 auto;
    max-width: 930px;
    width: 100%;
`;

const Home = () => {
    return (
        <>
            <Helmet>
                <title>CampusMap</title>
            </Helmet>
            <Header/>
            <Content>
                <MapContainer/>
                <Footer/>
            </Content>     
        </>
    )
}

export default Home;