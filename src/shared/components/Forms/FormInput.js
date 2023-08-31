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
    <div style={{width: '100%'}}>
      <Typography
        variant="p"
        component="p"
        sx={{ mb: "5px" }}>
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