import styled from "styled-components";

export const Container = styled.div`
background-color: white;
display: flex;
width: auto;
// position: relative
height: 98vh!important;
`;

export const SigninSection = styled.div`
// position: absolute;
// height: 30rem;
// width: 25rem;
// left: 64rem;
// top: 7rem;
background-color: white;
box-shadow: 0px 4px 9px;
border-radius: 8px;
z-index: 1;
width:70%;
`;

export const Rectangle = styled.div`
position: fixed; 
bottom: 0px; 
right: 0px; 
width: 42%; 
height: 140px; 
background: #4069E580; 
border-top-left-radius: 4px;
`;

export const Oval = styled.div`
position: fixed;
    top: -26%;
    right: -25%;
    transform: translate(0%, 0);
    height: 400px;
    width: 800px;
    border-radius: 0px 0px 600px 600px;
    background-color: rgba(14, 0, 146, 0.5);
`;

export const Circle = styled.div`
    position: absolute;
    bottom: 0%;
    left: 10%;
    transform: translate(-50%, 0%);
    height: 330px;
    width: 676px;
    border-radius: 600px 600px 0px 0px;
    background-color: #0E009280;
`;

export const WelcomeText = styled.div`
// position: absolute;
// top: 250px;
// left: 200px
`;

export const RightSection = styled.div`
    flex-basis: 60%;
`;

export const LeftSection = styled.div`
flex-basis: 40%;
display: flex;
justify-content: center;
align-items: center;
`;