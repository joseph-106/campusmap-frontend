import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

//css 초기화
export default createGlobalStyle`
    ${reset};
    input{
        all:unset;
    }
    *{
        box-sizing:border-box;
    }
    body {
        background-color: #FAFAFA;
        font-size:14px;
    }
    a{
        text-decoration:none;
    }
`;