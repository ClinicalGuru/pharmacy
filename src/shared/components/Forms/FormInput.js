// import {  } from "./FormInput.styles";
import React, { useState } from "react";
import { useContext } from 'react';
import { FormContext } from "./Form";
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Input } from "./FormInput.styles";

export const FormInput = (props) => {
  const {
    label,
    type = 'text',
    name,
    placeholder,
    options
  } = props;

  const formContext = useContext(FormContext);
  const { form, handleFormChange } = formContext;

  return (
    <div style={{ width: '100%' }}>
      <Typography
        variant="p"
        component="p"
        sx={{ mb: "5px" }}>
        {label}
      </Typography>
      {(type === 'text' || type === 'email' || type === 'number' || type === 'password') && <>
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          value={form[name]}
          onChange={handleFormChange}
        />
      </>}
      {
        type === 'select' && <>
          <Select
            value={form[name]}
            onChange={handleFormChange}
          >
            <MenuItem value="none">--Select--</MenuItem>
            {
              options.map(item => <MenuItem value={item?.value}>{item?.name}</MenuItem>)
            }
          </Select>
        </>
      }
    </div>
  )
}