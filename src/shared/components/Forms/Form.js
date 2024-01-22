import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { SubmitButton } from "./Forms.styles";
import { Box, Typography, Button } from "@mui/material";
import { AutoComplete } from "../autoComplete/index"

export const Form = ({
    template,
    onSubmit,
    onResetForm,
    // onValidate,
    dynamic,
    showClearFormButton = false,
    showSubmitButton = false,
    form_styles,
    btn_styles,
    watchFields
}) => {
    let { register, handleSubmit, watch, setError, clearErrors, formState: { errors }, reset } = useForm();
    let { title, fields, formStyles, btns, isBlockLevelBtns = true } = template;
    let watchValues = watch(watchFields);
    // onValidate(watchValues, { setError, clearErrors });
    const renderFields = (fields) => {
        return fields.map(field => {
            let { title, type, name, validationProps, dynamic, options, style } = field;
            let finalStyle = { ...style, ...formStyles };
            // let showField = dynamic ? watchValues([dynamic['field']]) ===dynamic['value']: true;
            // if(!showField) return
            // console.log(validationProps)
            switch (type) {
                case 'text':
                    return (
                        <Box sx={{
                            marginBottom: 2
                        }}>
                            <div key={name}>
                                <Box variant="label" sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                                <input style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                                {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                            </div>
                        </Box>)
                case 'number':
                    return (
                        <Box sx={{
                            marginBottom: 2
                        }}>
                            <div key={name}>
                                <Box sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                                <input style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                                {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                            </div>
                        </Box>)
                case 'email':
                    return (
                        <Box sx={{
                            marginBottom: 2
                        }}>
                            <div key={name}>
                                <Box sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                                <input style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                                {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                            </div>
                        </Box>

                    )
                case 'password':
                    return (
                        <div key={name}>
                            <Box sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                            <input style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                case 'checkbox':
                    return (
                        <div key={name}>
                            <Box sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                            <input style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                case 'select':
                    return (
                        <div key={name}>
                            <Box sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                            <select style={finalStyle} name={name} id={name} {...register(name, validationProps)} >
                                <option>select</option>
                                {options && options.length > 0 && options.map(({ value, name }) => {
                                    return <option key={value} value={value}>{name}</option>
                                })}
                            </select>
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                case 'date':
                    return (
                        <div key={name}>
                            <Box sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                            <input style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                case 'autoComplete':
                    return (
                        <div key={name}>
                            <Box variant="label" sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                            <input style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                default:
                    return (
                        <div>
                            <span className='red-text'>Invalid field input</span>
                        </div>
                    );
            }

        })
    }

    const butttons = (btns) => {
        return btns && btns?.map((button) => {
            return (
                <SubmitButton style={button?.styles} type="submit" className="btn"> {button?.btn_text}</SubmitButton>);
        })
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {title && <h4>{title}</h4>}
            <div style={form_styles}>
                {renderFields(fields)}
                {/* to render buttons in same line */}
                {!isBlockLevelBtns && <span> <Box sx={{ display: 'flex', marginTop: '28px' }}>
                    {butttons(btns)}</Box></span>}
            </div>
            {/* to render buttons in next line */}
            {isBlockLevelBtns && <div style={btn_styles}>
                {butttons(btns)}
                {/* {showClearFormButton && <SubmitButton type="submit" className="btn">{clearFormBtnText}</SubmitButton>} */}
            </div>}
        </form >
    );
}