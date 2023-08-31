import styled from "styled-components";

export const SubmitButton = styled.button`
width: -webkit-fill-available;
height: 40px;
margin-top: 45px;
// margin-left: 40px;
margin-bottom: 30px;
display: flex; 
  align-items: center; 
  justify-content: center; 
  font-size: 18px; 
  line-height: 28px; 
  color: #FFFFFFFF; /* white */
  background: #56EBFFFF; 
//   opacity: 1; 
  border: none; 
  border-radius: 2px; 
//   box-shadow: 0px 8px 17px #56ebff, 0px 0px 2px #56ebff; /* shadow-l */
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
`;

export const ButtonWrapper = styled.div`

`;