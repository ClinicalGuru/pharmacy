import styled from "styled-components";

export const ButtonWrapper = styled.button`
background-color: ${props => props.white? 'white': 'Black'};
font-size: 32px;
color: ${props => props.fontColor? 'white': 'Black'};
`