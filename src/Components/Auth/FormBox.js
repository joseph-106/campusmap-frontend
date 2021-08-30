import styled from "styled-components";

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    padding: 35px 40px 25px 40px;
    form{
        margin-top:35px;
        width: 100%;
        display:flex;
        justify-items:center;
        flex-direction: column;
        align-items:center;
        
    }
`;

const FormBox = ({children}) => {
    return <Container>
        {children}
    </Container>;
}

export default FormBox;