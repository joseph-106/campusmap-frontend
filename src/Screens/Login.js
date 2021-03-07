import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";

const Container = styled.div`
    display:flex;
    height: 100vh;
    jusify-content:center;
    align-items:center;
    flex-direction:column;
`;

const whiteBox = styled.div`
    background-color: white;
    border: 1px solid rgb(219,219,219);
    width:100%;
`;

const TopBox = styled(whiteBox)`
    display:flex;
    jusify-content:center;
    align-items:center;
    flex-direction: column;
    padding: 35px 40px 25px 40px;
    form{
        margin-top:35px;
        width: 100%;
        display:flex;
        jusify-items:center;
        flex-direction: column;
        align-items:center;
        input{
            width:100%;
            border-radius: 3px;
            padding: 7px;
            background-color:#fafafa;
            border: 0.5px solid rgb(219,219,219);
            margin-top:5px;
            box-sizing:border-box;
            &::placeholder{
                font-size:12px;
            }
            &:last-child{
                border:none;
                margin-top:12px;
                background-color:#0095F6;
                color: white;
                text-align:center;
                padding: 8px 0px;
                font-weight: 600;
            }
        }
    }
`;

const BottomBox = styled(whiteBox)`
    padding: 20px; 0px;
    text-align: center;
    a{
        font-weight:600;
        color:#0095F6;
        font-family:'Open Sans', sans-serif;
    }
`;

const Wrapper = styled.div`
    max-width:350px;
    width: 100%;
`;

const Login = () => {
    return (
        <Container>
            <Wrapper>
                <TopBox>
                    <div>
                        <FontAwesomeIcon icon={faInstagram} size="3x"/>
                    </div>
                    <form>
                        <input type="text" placeholder="학번"/>
                        <input type="password" placeholder="비밀번호"/>
                        <input type="submit" value="Log In"/>
                    </form>
                </TopBox>
                <BottomBox>
                    <span>Don't have an account?</span><a href="#">Sign Up</a>
                </BottomBox>
            </Wrapper>
        </Container>
    )
}
export default Login;