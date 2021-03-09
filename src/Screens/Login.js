import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "Components/Logo";
import { darkModeVar, isLoggedInVar } from "../apollo";
import routes from "routes";
import AuthLayout from "Components/Auth/AuthLayout";
import Button from "Components/Auth/Button";
import Input from "Components/Auth/Input";
import FormBox from "Components/Auth/FormBox";
import BottomBox from "Components/Auth/BottomBox";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import FormError from "Components/Auth/FormError";

const Login = () => {
    const {register, handleSubmit, errors, formState} = useForm({
        mode: "onChange"
    });
    const onSubmitValid = (data) => {

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
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <Input ref={register({
                        required: "학번을 입력해주세요.",
                        minLength:{
                            value: 8,
                            message: "8자리 이상 입력하셔야 합니다."
                        }, 
                    })} name="studentId" type="text" placeholder="학번" hasError={Boolean(errors?.studentId?.message)}/>
                    <FormError message={errors?.studentId?.message}/>
                    <Input ref={register({
                        required:"비밀번호를 입력해주세요.",
                        minLength:{
                            value: 8,
                            message: "8자리 이상 입력하셔야 합니다."
                        },
                    })} name="password" type="password" placeholder="비밀번호" hasError={Boolean(errors?.password?.message)}/>
                    <FormError message={errors?.password?.message}/>
                    <Button type="submit" value="Log In" disabled={!formState.isValid}/>
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