import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "Components/Logo";
import { darkModeVar, isLoggedInVar } from "../apollo";
import routes from "routes";
import AuthLayout from "Components/Auth/AuthLayout";
import Button from "Components/Auth/Button";
import Input from "Components/Auth/Input";
import FormBox from "Components/Auth/FormBox";
import BottomBox from "Components/Auth/BottomBox";
import styled from "styled-components";
import { FatLink } from "Components/shared";
import { Helmet } from "react-helmet-async";

const HeadContainer = styled.div`
    display:flex;
    flex-direction:center;
    align-items:center;
`;
const Subtitle = styled(FatLink)`
    font-size: 16px;
    text-align:center;
`;

const Signup = () => {
    return (
        <AuthLayout>
            <Helmet>
                <title>Sign up | CampusMap</title>
            </Helmet>
            <FormBox>
                <Logo/>
                <HeadContainer>
                    <Subtitle>
                        회원가입 후 24시간 이내에 승인 처리 될 예정입니다. 
                    </Subtitle>
                </HeadContainer>
                <form>
                    <Input type="text" placeholder="이름"/>
                    <Input type="text" placeholder="학번"/>
                    <Input type="text" placeholder="학과"/>
                    <Input type="password" placeholder="비밀번호"/>
                    <Input type="text" placeholder="학생증"/>
                    <Button type="submit" value="Sign Up"/>
                </form>
            </FormBox>
            <BottomBox 
                cta="Have an account?"
                link={routes.home}
                linkText="Log In" 
            />
        </AuthLayout>
    )
}
export default Signup;