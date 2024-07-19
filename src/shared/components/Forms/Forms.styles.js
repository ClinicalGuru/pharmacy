import styled from "styled-components";

export const SubmitButton = styled.button`
width: auto;
padding: 8px 12px;
font-size: 16px;
border: 1px solid;
margin-right: 15px;
display: flex; 
  align-items: center; 
  justify-content: center; 
  color: white; 
  background: rgb(255, 185, 29); 
  border: none; 
  border-radius: 4px; 
  :disabled {
    opacity: 0.4; 
  }
  cursor: pointer
`;

export const ButtonWrapper = styled.div`

`;