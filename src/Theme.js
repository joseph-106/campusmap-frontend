import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  accent: "#0095f6",
  bgColor: "lightgray",
  boxColor: "#FAFAFA",
  fontColor: "rgb(38,38,38)",
  borderColor: "rgb(219,219,219)",
};

export const darkTheme = {
  fontColor: "white",
  boxColor: "#2C2C2C",
  bgColor: "black",
};


export const GlobalStyles = createGlobalStyle`
    ${reset};
    input{
        all:unset;
    }
    *{
        box-sizing:border-box;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-size:14px;
        color: ${(props) => props.theme.fontColor}; 
    }
    a{
        text-decoration:none;
    }
`;

