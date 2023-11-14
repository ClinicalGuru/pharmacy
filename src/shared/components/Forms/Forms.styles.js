import styled from "styled-components";

export const SubmitButton = styled.button`
width: auto;
padding: 6px 12px;
font-size: 12px;
display: flex; 
  align-items: center; 
  justify-content: center; 
  color: #002E34FF; 
  background: #56EBFFFF; 
  border: none; 
  border-radius: 2px; 
  :hover {
    color: #FFFFFFFF; /* white */
    background: #56EBFFFF; /* primary-500 */
  }
  /* Pressed */
  :hover:active {
    color: #FFFFFFFF; /* white */
    background: #56EBFFFF; /* primary-500 */
  }
  /* Disabled */
  :disabled {
    opacity: 0.4; 
  }
  cursor: pointer
`;

export const ButtonWrapper = styled.div`

`;