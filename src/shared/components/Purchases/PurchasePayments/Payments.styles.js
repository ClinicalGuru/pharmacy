import styled from "styled-components";

export const FormWrapper = styled.div`

`;

export const ErrorMessage = styled.p`
font-size: 10px;
color: #db2727;
margin: 0 0 0 5px;
`;

export const InvalidInput = styled.input`
    border: 1px solid red;
    
`;

export const Container = styled.div`
& form {
    display: flex;
    & select {
        width: 200px
    }
}

`;