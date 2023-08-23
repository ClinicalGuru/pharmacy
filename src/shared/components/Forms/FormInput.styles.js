import styled from "styled-components";

export const Input = styled.input.attrs({ 
    type: 'text'
  })`
font-size: 14px;
padding: 5px 10px;
transition: box-shadow 100ms ease-in, border 100ms ease-in, background-color 100ms ease-in;
border: 2px solid #F3F4F6FF;
color: rgb(14, 14, 16);
background: #F3F4F6FF;
display: block;
height: 22px;
align: center;
margin-left: 40px; 
margin-bottom: 15px;
width:300px;       
:hover {
    border-color: #F3F4F6FF;
}
:focus{
    border-color: #F3F4F6FF;
    background: #fff;
}

`;
