import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useMutation,gql } from "@apollo/client";
import routes from "routes";
import styled from "styled-components";
import { Logo } from "Components/Logo";
import logo1 from '../logo1.png'
import logo2 from '../logo2.png'
import { useMediaQuery } from "react-responsive"
import AuthLayout from "Components/Auth/AuthLayout";
import Button from "Components/Auth/Button";
import Input from "Components/Auth/Input";
import FormBox from "Components/Auth/FormBox";
import BottomBox from "Components/Auth/BottomBox";
import { FatLink } from "Components/shared";
import FormError from "Components/Auth/FormError";
import { Form } from 'react-bootstrap';

const Subtitle = styled.div`
    display:flex;
    flex-direction:center;
    align-items:center;

    font-size: 18px;
    font-weight: 500;
    color: #606060;
    text-align: center;
    margin-top: 20px;
`;

const Text = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #606060;
    text-align: center;
    margin-top: 15px;
    margin-bottom: ${props => props.bottom};
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
    const {register,handleSubmit, errors, setError, getValues,formState,clearErrors} = useForm({
        mode:"onChange"
    });
    const history = useHistory();
    const onCompleted = (data) =>{
        const {createAccount:{ok,error}} = data;
        const {studentId,password} = getValues();
        if(!ok){
            return setError("result",{
                message:error,
            });
        }
        history.push(routes.home,{message:"?????? ?????? ??????!",studentId,password});
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
    const clearSignupError = () => {
        clearErrors("result")
    };

    const isPc = useMediaQuery({
        query : "(min-width:768px)"
    });
    const isMobile = useMediaQuery({
        query : "(max-width:767px)"
    });

    return (
        <AuthLayout>
            <Helmet>
                <title>Sign up | CampusMap</title>
            </Helmet>
            <FormBox>
                {isPc && <img src={logo1} alt='logo'/>}
                {isMobile && <img src={logo2} alt='logo'/>}
                <Subtitle>
                    ????????????
                </Subtitle>
                <Text>24?????? ????????? ?????? ?????? ??? ???????????????.</Text> 
                <form onSubmit={handleSubmit(onSubmitValid)} encType={'multipart/form-data'}>
                    <Input ref={register({
                        required:"????????? ??????????????????.",
                    })} onChange={() => clearSignupError()} name="name" type="text" placeholder="??????"/>
                    <FormError message={errors?.name?.message}/>
                    <Input ref={register({
                        required:"????????? ??????????????????.",
                        minLength:{
                            value: 8,
                            message: "8?????? ?????? ??????????????? ?????????."
                        }, 
                    })} onChange={() => clearSignupError()} name="studentId" type="text" placeholder="??????"/>
                    <FormError message={errors?.studentId?.message}/>
                    <Input ref={register({
                        required:"????????? ??????????????????.",
                    })} onChange={() => clearSignupError()} name="major" type="text" placeholder="??????"/>
                    <FormError message={errors?.major?.message}/>
                    <Input ref={register({
                        required:"??????????????? ??????????????????.",
                        minLength:{
                            value: 6,
                            message: "6?????? ?????? ??????????????? ?????????."
                        },
                    })} onChange={() => clearSignupError()} name="password" type="password" placeholder="????????????"/>
                    <FormError message={errors?.password?.message}/>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Text bottom='15px'>????????? ????????? ???????????????</Text>
                        <Form.Control ref={register({
                            required:"????????? ????????? ???????????????",
                        })} onChange={() => clearSignupError()}
                        name="idCard" type="file"/>
                    </Form.Group>
                    <FormError message={errors?.idCard?.message}/>
                    <Button type="submit" value={loading ? "?????????..." : "???????????? ???"} disabled={!formState.isValid || loading}/>
                    <FormError message={errors?.result?.message}/>
                </form>
            </FormBox>
            <BottomBox 
                cta="?????? ??????????????????? "
                link={routes.home}
                linkText=" ?????????" 
            />
        </AuthLayout>
    )
}
export default Signup;