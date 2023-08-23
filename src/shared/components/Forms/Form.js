import React, { useState } from 'react';
import { SubmitButton } from './Forms.styles';

export const FormContext = React.createContext({
    form: {}
});

export const Form = (props) => {
    const { children, submit = () => { }, initialValues } = props;

    const [form, setForm] = useState(initialValues);

    const handleFormChange = (event) => {
        // Get the name of the field that caused this change event
        // Get the new value of this field
        const { name, value } = event.target;

        // Update state
        // Assign new value to the appropriate form field
        setForm({
            ...form,
            [name]: value
        });
    };

    return (
        <form className="Form">
            <FormContext.Provider value={{
                form,
                handleFormChange
            }}>
                {children}
            </FormContext.Provider>

            <SubmitButton type="button" onClick={() => submit(form)}>
                Sign in
            </SubmitButton>
        </form>
    );
}