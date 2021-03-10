import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "Components/Logo";
import { client, darkModeVar, isLoggedInVar } from "../apollo";
import routes from "routes";
import AuthLayout from "Components/Auth/AuthLayout";
import Button from "Components/Auth/Button";
import Input from "Components/Auth/Input";
import FormBox from "Components/Auth/FormBox";
import BottomBox from "Components/Auth/BottomBox";
import styled from "styled-components";
import { FatLink } from "Components/shared";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useMutation,gql } from "@apollo/client";
import { useHistory } from "react-router-dom";


const HeadContainer = styled.div`
    display:flex;
    flex-direction:center;
    align-items:center;
`;
const Subtitle = styled(FatLink)`
    font-size: 16px;
    text-align:center;
`;

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $name:String!
        $studentId:String!
        $password: String!
        $major: String!
        $idCard: Upload!
    ){
        createAccount(
            name:$name
            studentId:$studentId
            password:$password
            major:$major
            idCard:$idCard
        ){
            ok
            error
        }
    }
`;

const Signup = () => {
    const {register,handleSubmit, errors, setError, getValues,formState} = useForm({
        mode:"onChange"
    });
    const history = useHistory();
    const onCompleted = (data) =>{
        const {createAccount:{ok,error}} = data;
        if(!ok){
            return setError("result",{
                message:error,
            });
        }
        history.push(routes.home);
    };
    const [createAccount,{loading}] = useMutation(CREATE_ACCOUNT_MUTATION,{
        onCompleted
    });
    const onSubmitValid = (data) => {
        const {idCard,name,studentId,password,major} = getValues();
        if(loading){
            return;
        }
        createAccount({
            variables:{
                name,
                studentId,
                major,
                password,
                idCard:idCard[0],
                
            }
        })
    };
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
                <form onSubmit={handleSubmit(onSubmitValid)} encType={'multipart/form-data'}>
                    <Input ref={register({
                        required:"이름을 입력해주세요.",
                    })} name="name" type="text" placeholder="이름"/>
                    <Input ref={register({
                        required:"학번을 입력해주세요.",
                    })} name="studentId" type="text" placeholder="학번"/>
                    <Input ref={register({
                        required:"학과를 입력해주세요.",
                    })} name="major" type="text" placeholder="학과"/>
                    <Input ref={register({
                        required:"비밀번호를 입력해주세요.",
                    })} name="password" type="password" placeholder="비밀번호"/>
                    <Input ref={register({
                        required:"학생증 사진을 넣어주세요",
                    })}
                    name="idCard" type="file" placeholder="학생증"/>
                    <Button type="submit" value={loading ? "Loading..." : "Sign Up"} disabled={!formState.isValid || loading}/>
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