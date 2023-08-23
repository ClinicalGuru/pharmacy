// import {  } from "./FormInput.styles";
import React, { useState } from "react";
import { useContext } from 'react';
import { FormContext } from "./Form";
import { Typography } from '@mui/material';

import { Input } from "./FormInput.styles";

export const FormInput = (props) => {
  const {
    label,
    type = 'text',
    name,
    placeholder,
  } = props;

  const formContext = useContext(FormContext);
  const { form, handleFormChange } = formContext;

  return (
    <div className="FormInput">
      <Typography
        variant="p"
        component="p"
        sx={{ ml:"40px", mb: "5px" }}>
        {label}
      </Typography>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={form[name]}
        onChange={handleFormChange}
      />
    </div>
  )
}