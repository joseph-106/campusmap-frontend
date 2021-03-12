import Header from "Components/Header";
import MapContainer from "./MapContainer";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import Footer from "Components/Footer";

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