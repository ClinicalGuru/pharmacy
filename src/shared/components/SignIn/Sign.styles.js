import styled from "styled-components";

export const Container = styled.div`
background-color: white;
display: flex;
width: auto;
height: 97vh!important;
`;

export const IconSection = styled.button`
background-color: #FEF1F1FF;
color:#C71610FF;
margin: 20px 11rem;
border-radius: 4px;
padding: 0.2rem 1rem;
`;
export const GoogleSignWrapper = styled.div`
    text-align: center;
    margin: 2rem;
`;
export const OrText = styled.p`
    width: 100%; 
    text-align: center; 
    border-bottom: 1px solid #eee; 
    line-height: 0.1em;
    // margin: 10px 0 20px; 
    margin: 1rem 0rem;
    & span {
        padding:0 10px; 
        background:#fff; 
        color: rgb(193 184 184);
    }
`;
export const SigninSection = styled.div`
background-color: white;
box-shadow: 0px 4px 9px;
border-radius: 8px;
z-index: 1;
padding: 1rem;
height: auto;
width: 50%;
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
    transform: translate(10%, 20%);
    height: 400px;
    width: 800px;
    border-radius: 0px 0px 600px 600px;
    background-color: #0E0092A6;
`;

export const Circle = styled.div`
    position: fixed;
    bottom: 0%;
    left: 10%;
    transform: translate(-40%, 30%);
    height: 350px;
    width: 700px;
    border-radius: 600px 600px 0px 0px;
    background-color: #0E009280;
`;

export const WelcomeText = styled.p`
margin-top:9rem;
margin-left:10rem;
font-size: 40px;
margin-bottom:10px;
`;

export const RightSection = styled.div`
    flex-basis: 50%;
`;

export const LeftSection = styled.div`
flex-basis: 50%;
display: flex;
justify-content: center;
align-items: center;
`;
export const LogoImg = styled.img `
width: 16%;
margin: 2rem 0 0 5rem;
`;

export const InputWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
