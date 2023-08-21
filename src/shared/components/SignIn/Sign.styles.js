import styled from "styled-components";

export const Container = styled.div`
background-color: white;
display: flex;
width: auto;
position: relative
`;

export const SigninForm = styled.div`
position: absolute;
height: 30rem;
width: 25rem;
left: 64rem;
top: 7rem;
background-color: white;
box-shadow: 0px 4px 9px;
border-radius: 8px;
z-index: 1;
`;

export const Rectangle = styled.div`
position: fixed; 
bottom: 0px; 
right: 0px; 
width: 700px; 
height: 140px; 
background: #4069E580; 
border-radius: 8px;
`;

export const Oval = styled.div`
position: fixed; 
top: -240px;
right: -155px; 
width: 550px; 
height: 550px; 
background: #0E0092A6; 
border-radius: 50%; 
border-width: 1px; 
border-color: #BDC1CAFF; /* neutral-400 */
border-style: solid; 
`;

export const Circle = styled.div`
position: fixed;
bottom: -450px;
left: -130px;
width: 660px; 
height: 660px; 
background: #0E009280; 
border-radius: 50%; 
border-width: 1px; 
border-color: #BDC1CAFF; /* neutral-400 */
border-style: solid; 
`;

export const WelcomeText = styled.div`
position: absolute;
top: 250px;
left: 200px
`;

