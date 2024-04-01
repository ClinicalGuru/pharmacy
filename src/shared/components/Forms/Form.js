import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { SubmitButton } from "./Forms.styles";
import { Box, Typography, Button } from "@mui/material";
import { AutoComplete } from "../autoComplete/index";
import CreatableSelect from 'react-select/creatable';

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
    watchFields,
    onValidate = () => {},
}) => {
    // const [selectOption, setSelectedOption] = useState({});
    let { control, register, handleSubmit, watch, setError, clearErrors, formState: { errors }, reset } = useForm({
        mode: "onChange"
    });
    let { title, fields, formStyles, btns, isBlockLevelBtns = true } = template;
    let watchValues = watch(watchFields);
    // console.log(watchValues, 'watchValues')
    onValidate(watchValues, { setError, clearErrors });
    // const handleVendorChange = (selectedOption) => {
    //     setSelectedOption(selectedOption);
    // };
    const renderFields = (fields) => {
        return fields.map(field => {
            let { title, type, name, validationProps, dynamic, options = [], style } = field;
            // console.log(options, 'options')
           
            let finalStyle = { ...style, ...formStyles };
            // let showField = dynamic ? watchValues([dynamic['field']]) ===dynamic['value']: true;
            // if(!showField) return
            switch (type) {
                case 'text':
                    return (
                        <Box sx={{
                            marginBottom: 2
                        }}>
                            <div key={name}>
                                <Box component="label" sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                                <input style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                                {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                            </div>
                        </Box>)
                case 'textArea':
                    return (
                        <Box sx={{
                            narginBottom: 2
                        }}>
                            <div key={name}>
                                <Box component="label" sx={{ marginBottom: 1, fontSize: "14px" }}>{title} </Box>
                                <input style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                                {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                            </div>

                        </Box>
                    )
                case 'number':
                    return (
                        <Box sx={{
                            marginBottom: 2
                        }}>
                            <div key={name}>
                                <Box component="label" sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
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
                                <Box component="label" sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                                <input style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                                {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                            </div>
                        </Box>

                    )
                case 'password':
                    return (
                        <div key={name}>
                            <Box  component="label"sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                            <input style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                case 'checkbox':
                    return (
                        <div key={name}>
                            <Box component="label" sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                            <input style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                case 'select':
                    return (
                        <div key={name}>
                            <Box component="label" sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                            <select style={finalStyle} name={name} id={name} {...register(name, validationProps)} >
                                <option>select</option>
                                {options && options?.length > 0 && options?.map((option, index) => {
                                    return <option key={`${option?.value} ${index}`} value={option?.value}>{option?.name}</option>
                                })}
                            </select>
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                case 'date':
                    return (
                        <div key={name}>
                            <Box  component="label"sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                            <input style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                case 'autoComplete':
                    return (
                        <div key={name}>
                            <Box component="label" sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                            <Controller
                                name={name}
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <CreatableSelect
                                    {...field}
                                    options={options?.map(option => ({ value: option?.value, label: option?.name }))}
                                    onChange={(newValue, actionMeta) => {
                                        field.onChange(newValue);
                        
                                        // If the clear action is triggered, set the field value to null
                                        if (actionMeta.action === 'clear') {
                                            field.onChange(null);
                                        }
                        
                                        // Optionally, trigger validation
                                        field.onBlur();
                                    }}
                                    styles={{
                                        container: (provided) => ({
                                            ...provided,
                                            width: 300,
                                            marginRight: 50
                                        })
                                    }}
                                />
                                )}
                            />
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