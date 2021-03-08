import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "Components/Logo";
import { darkModeVar, isLoggedInVar } from "../apollo";
import routes from "routes";
import AuthLayout from "Components/Auth/AuthLayout";
import Button from "Components/Auth/Button";
import Input from "Components/Auth/Input";
import FormBox from "Components/Auth/FormBox";
import BottomBox from "Components/Auth/BottomBox";

const Login = () => {
    return (
        <AuthLayout>
            <FormBox>
                <div>
                    <Logo/>
                </div>
                <form>
                    <Input type="text" placeholder="학번"/>
                    <Input type="password" placeholder="비밀번호"/>
                    <Button type="submit" value="Log In"/>
                </form>
            </FormBox>
            <BottomBox 
                cta="Don't have an account?"
                link={routes.signUp}
                linkText="Sign Up" 
            />
        </AuthLayout>
    )
}
export default Login;