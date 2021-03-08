import { BaseBox } from "Components/shared";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled(BaseBox)`
    padding: 20px; 0px;
    text-align: center;
    a{
        font-weight:600;
        margin-left: 5px;
        color:${(props) => props.theme.accent};   
    }
`;

const BottomBox = ({cta,link,linkText}) => {
    return (
        <Container>
            <span>{cta}</span>
            <Link to={link}>{linkText}</Link>
        </Container>
    );
}

export default BottomBox;