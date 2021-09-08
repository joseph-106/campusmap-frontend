import PropTypes from 'prop-types';
import { BaseBox } from "Components/shared";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    text-align: center;
    font-size: 16px;
    a{
        font-weight:500;
        margin-left: 5px;
        color:${(props) => props.theme.accent};   
    }
    padding-bottom: 25px;
`;

const BottomBox = ({cta,link,linkText}) => {
    return (
        <Container>
            <span>{cta}</span>
            <Link to={link}>{linkText}</Link>
        </Container>
    );
}

BottomBox.propTypes = {
    cta: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired
}

export default BottomBox;