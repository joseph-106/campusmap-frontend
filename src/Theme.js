import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

const BOX_BORDER = "1px solid #262626";
const BORDER_RADIUS = "4px";

export const lightTheme = {
  accent: "#0095f6",
  bgColor: "rgb(245,245,245)",
  boxColor: "#FAFAFA",
  fontColor: "rgb(38,38,38)",
  borderColor: "rgb(219,219,219)",
  darkGreyColor: "#A9A9A9",
  darkBlueColor: "#00008b",
  whiteBox: ` border:${BOX_BORDER}; 
                border-radius:${BORDER_RADIUS};
                background-color:white;
            `
};

export const darkTheme = {
  accent: "#0095f6",  
  fontColor: "white",
  boxColor: "#2C2C2C",
  bgColor: "#A9A9A9",
  borderColor: "black",
  darkGreyColor: "#A9A9A9",
  darkBlueColor: "#00008b",
  whiteBox: ` border:${BOX_BORDER}; 
                border-radius:${BORDER_RADIUS};
                background-color:"#2C2C2C";
            `
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
        color:inherit;
    }
`;

