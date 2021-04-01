import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useMutation,gql } from "@apollo/client";
import styled from "styled-components";
import routes from "routes";
import { logUserIn } from "../apollo";
import { Logo } from "Components/Logo";
import AuthLayout from "Components/Auth/AuthLayout";
import Button from "Components/Auth/Button";
import Input from "Components/Auth/Input";
import FormBox from "Components/Auth/FormBox";
import BottomBox from "Components/Auth/BottomBox";
import FormError from "Components/Auth/FormError";

const LOGIN_MUTATION = gql`
    mutation login($studentId:String!,$password:String!){
        login(studentId:$studentId,password:$password){
            ok
            token
            error
        }
    }
`;

const Notification = styled.div`
    color:#2ecc71;

`;

const Login = () => {
    const location = useLocation();
    const {register, handleSubmit, errors, formState,getValues,setError,clearErrors} = useForm({
        mode: "onChange",
        defaultValues:{
            studentId:location?.state?.studentId || "",
            password:location?.state?.password || ""
        }
    });
    const onCompleted = (data) =>{
        const {login:{ok,token,error}} = data;
        if(!ok){
            return setError("result",{
                message:error,
            });
        }
        if(token){
            logUserIn(token);
        }
    };
    const [login,{loading}] = useMutation(LOGIN_MUTATION,{
        onCompleted,
    });
    const onSubmitValid = (data) => {
        if(loading){
            return;
        }
        const {studentId, password} = getValues();
        login({
            variables:{
                studentId,
                password
            }
        });
    };
    const clearLoginError = () => {
        clearErrors("result")
    };

    return (
        <AuthLayout>
            <Helmet>
                <title>Login | CampusMap</title>
            </Helmet>
            <FormBox>
                <div>
                    <Logo/>
                </div>
                <Notification>{location?.state?.message}</Notification>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input ref={register({
                        required: "학번을 입력해주세요.",
                        minLength:{
                            value: 8,
                            message: "8자리 이상 입력하셔야 합니다."
                        }, 
                    })} onChange={() => clearLoginError()} name="studentId" type="text" placeholder="학번" hasError={Boolean(errors?.studentId?.message)}/>
                    <FormError message={errors?.studentId?.message}/>
                    <Input ref={register({
                        required:"비밀번호를 입력해주세요.",
                        minLength:{
                            value: 6,
                            message: "6자리 이상 입력하셔야 합니다."
                        },
                    })} onChange={() =>clearLoginError()} name="password" type="password" placeholder="비밀번호" hasError={Boolean(errors?.password?.message)}/>
                    <FormError message={errors?.password?.message}/>
                    <Button type="submit" value={loading ? "Loading..." : "Log In"} disabled={!formState.isValid || loading}/>
                    <FormError message={errors?.result?.message}/>
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