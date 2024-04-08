import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { SubmitButton } from "./Forms.styles";
import { Box, Typography, Button } from "@mui/material";
import { AutoComplete } from "../autoComplete/index";
import CreatableSelect from 'react-select/creatable';
import "./Form.css";

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
    let { title, fields, value, formStyles, btns, isBlockLevelBtns = true } = template;
    let watchValues = watch(watchFields);
    // console.log(watchValues, 'watchValues')
    onValidate(watchValues, { setError, clearErrors });
    // const handleVendorChange = (selectedOption) => {
    //     setSelectedOption(selectedOption);
    // };
    function onlyDecimalNumberKey(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        // if ( charCode > 31
        //   && (charCode < 48 || charCode > 57))
        //   return false;
        // return true;
        return false;
      }
    const renderFields = (fields) => {
        return fields.map(field => {
            let { title, type, value ,name, validationProps, dynamic, options = [], style } = field;
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
                                <input className='makefieldsempty1' style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
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
                                <input className='makefieldsempty2' style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
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
                                <input className='makefieldsempty3' style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
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
                                <input className='makefieldsempty4'style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                                {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                            </div>
                        </Box>

                    )
                case 'password':
                    return (
                        <div key={name}>
                            <Box  component="label"sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                            <input className='makefieldsempty5' style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                case 'checkbox':
                    return (
                        <div key={name}>
                            <Box component="label" sx={{ marginBottom: 1, fontSize: "14px" }}>{title}</Box>
                            <input className='makefieldsempty6' style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
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
                            <input className='makefieldsempty7' style={finalStyle} type={type} name={name} id={name} {...register(name, validationProps)} />
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
                                            width: 250,
                                            marginRight: 30
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
    function submit_clear(type){
        let fieldsempty={}
        fields.map(field => {
            fieldsempty[field.name]=""
        })
        setTimeout(() => {
            // console.log("fieldsempty",fieldsempty);
            reset(fieldsempty)
        },200);
        // if(false)
        // {
        //     setTimeout(() => {
        //         for(let j=1;j<9;j++){
        //             console.log('makefieldsempty'+j)
        //             let makefieldsempty = document.getElementsByClassName('makefieldsempty'+j)
        //         if(makefieldsempty.length){
        //             for(let i=0;i<makefieldsempty.length;i++){
        //                 makefieldsempty[i].value=''
        //             }
                    
        //         }
        //         console.log("fields => ",fields,makefieldsempty.length)
        //         }
        //     }, 300);
            
            
            
        // }

    }

    const butttons = (btns) => {
        return btns && btns?.map((button) => 
        {
            return (
                <div>
                   {
                     button.type=='checkbox'
                     ?<div className='atofq'><div className='atofq-checkbox'><input type={button.type}/></div><div className='atofq-text'>{button?.btn_text}</div></div>
                     :<SubmitButton onClick={() => submit_clear(button.type)} style={button?.styles} type={button.type} className="btn"> {button?.btn_text}</SubmitButton>
                     
                   }
                </div>
                
            )
                
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