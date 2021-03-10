import styled from "styled-components";

export const BaseBox = styled.div`
    background-color: ${(props) => props.theme.boxColor};
    border: 1px solid ${(props) => props.theme.borderColor};
    width:100%;
`;

export const FatLink = styled.span`
    font-weight:600;
    color: rgb(142,142,142);
`;