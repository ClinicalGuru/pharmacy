import styled from "styled-components";

export const FormWrapper = styled.div``;

export const ErrorMessage = styled.p`
  font-size: 10px;
  color: #db2727;
  margin: 0 0 0 5px;
`;

export const InvalidInput = styled.input`
  border: 1px solid red;
`;

export const Container = styled.div``;

export const FormContainer = styled.form`
  display: flex;
  gap: 28px 30px;
  background-color: #B4B4B4;
  border-radius: 4px;
  padding: 16px;
  margin-top: 15px;
`;

export const InvoiceAmountDetails = styled.div`
  padding: 0.5rem;
  background-color: rgb(238, 240, 243);
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  // margin-top: 15px;
  border-radius: 4px;
  &&
  div {
    text-wrap: nowrap;
  }
`;
