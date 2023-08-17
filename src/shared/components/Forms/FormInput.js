// import {  } from "./FormInput.styles";
import React, { useState } from "react";
import { useContext } from 'react';
import { FormContext } from "./Form";

export const FormInput = (props) => {
    const {
        label, 
        type = 'text', 
        name,
      } = props;
    
      const formContext = useContext(FormContext);
      const { form, handleFormChange } = formContext;
    
      return (
        <div className="FormInput">
          <label>{label}</label>
          <input
            type={type}
            name={name}
            value={form[name]}
            onChange={handleFormChange}
          />
        </div>
      )
}