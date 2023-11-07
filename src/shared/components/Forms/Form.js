import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { SubmitButton } from "./Forms.styles"
export const Form = ({ template, onSubmit, watchFields, validate, dynamic }) => {
    let { register, handleSubmit, watch, setError, clearErrors, formState: { errors } } = useForm();
    let watchValues = watch(watchFields);
    console.log(watchValues, 'watchValues')
    validate(watchValues, { setError, clearErrors });
    let { title, fields, submitButttonText } = template;
    const renderFields = (fields) => {
        return fields.map(field => {
            let { title, type, name, validationProps, dynamic, options } = field;

            // let showField = dynamic ? watchValues([dynamic['field']]) ===dynamic['value']: true;
            // if(!showField) return
            // console.log(validationProps)
            switch (type) {
                case 'text':
                    return (
                        <div key={name}>
                            <label>{title}</label>
                            <input type={type} name={name} id={name} {...register(name, validationProps)} />
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                case 'email':
                    return (
                        <div key={name}>
                            <label>{title}</label>
                            <input type={type} name={name} id={name} {...register(name, validationProps)} />
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                case 'password':
                    return (
                        <div key={name}>
                            <label>{title}</label>
                            <input type={type} name={name} id={name} {...register(name, validationProps)} />
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                case 'checkbox':
                    return (
                        <div key={name}>
                            <label>{title}</label>
                            <input type={type} name={name} id={name} {...register(name, validationProps)} />
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                case 'select':
                    return (
                        <div key={name}>
                            <label>{title}</label>
                            {/* <input type={type} name={name} id={name} {...register(name, validationProps)} /> */}
                            <select name={name} id={name} {...register(name, validationProps)} >
                                <option>--select--</option>
                                {options && options.length > 0 && options.map(({ value, option }) => {
                                    return <option value={value}>{option}</option>
                                })}
                            </select>
                            {errors[name] && <span className='red-text'>{errors[name][`message`]}</span>}
                        </div>
                    )
                default:
                    return (
                        <div>
                            <span className='red-text'>Invalid field</span>
                        </div>
                    );
            }

        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {title && <h4>{title}</h4>}
                {renderFields(fields)}
                <br />
                <SubmitButton type="submit" className="btn">{submitButttonText}</SubmitButton>
            </form>
        </div>
    );
}