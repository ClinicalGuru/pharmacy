import React from "react";
import {ButtonWrapper  } from "./Button.styles";

export const Button = ({text, bgColor, fontColor}) => {
    return (
        <ButtonWrapper white={bgColor} fontColor={fontColor} type="button">{text}</ButtonWrapper>
    )
}