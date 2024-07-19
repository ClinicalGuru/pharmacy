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
    
`

export const FormContainer = styled.form`
display: flex;
gap: 12px;
background-color: #B4B4B4;
border-radius: 4px;
padding: 10px;
// margin-top: 5px;
align-items: end;
flex-wrap: wrap;
justify-content: space-between;
`;

export const Container = styled.div`
background-color: #B4B4B4;
`;

export const BillingForm = styled.form`
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    gap: 25px;
    && input[type=number], [type=select] {
        width: 80px;
    }
`;


export const FooterSection = styled.div`
    display: flex;
    margin-left: auto;
    margin-top: 10px
`