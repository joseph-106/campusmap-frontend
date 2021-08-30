import styled from "styled-components";

const Button = styled.input`
    border:none;
    border-radius: 30px;
    margin-top:30px;
    margin-left:380px;
    margin-bottom: ${props => props.bottom};
    background-color:${(props) => props.theme.accent};
    color: white;
    text-align:center;
    padding: 8px 0px;
    font-weight: 600;
    width: 120px;
    height: 60px;
    opacity: ${props => props.disabled ? "0.2": "1"}
`;


export default Button;