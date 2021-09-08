import styled from "styled-components";

const Input = styled.input`
    height: 60px;
    width: 500px;
    @media only screen and (max-width: 500px) {
        width: 100%;
      }
    border-radius: 10px;
    padding: 0 20px;
    background-color:#fafafa;
    border: 0.5px solid ${(props) => props.hasError ? "tomato" : props.theme.borderColor};
    margin-bottom: 20px;
    box-sizing:border-box;
    &::placeholder{
        font-size: 18px;
    }
    &:focus{
        border-color:rgb(38,38,38);
    }
`;

export default Input;