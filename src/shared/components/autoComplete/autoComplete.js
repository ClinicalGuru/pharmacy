import React, { useState, useEffect } from 'react';
import styles from './autoComplete.css';
import Result from './result';

export const AutoComplete = ({ suggestionsList, name, formInstance }) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [hideSuggestions, setHideSuggestions] = useState(true);
    const [result, setResult] = useState(null);

    const findResult = (title) => {
        setResult(suggestions.find((suggestion) => suggestion.title === title))
    }
    if (suggestionsList && suggestionsList.length > 0) {
        setSuggestions(suggestionsList);
    }
    return (
        <>
            <input
                {...formInstance}
                type='text'
                placeholder='Search data...'
                value={value}
                onChange={(e) => {
                    setValue(e?.target?.vcalue)
                }}
                onFocus={() => setHideSuggestions(false)}
                onBlur={async () => {
                    setTimeout(() => {
                        setHideSuggestions(true)
                    }, 200);
                }}
                className={styles.textbox}
                name={name}
                id={name}
            />
            <div className={`${styles['suggestions']} ${hideSuggestions && styles['hidden']}`}>
                {
                    suggestions && suggestions.map((suggestion) =>
                        <div
                            className={styles.suggestion}
                            onClick={() => findResult(suggestion['title'])}
                        >
                            {suggestion['title']}
                        </div>
                    )
                }
            </div>
            {result && <Result {...result} />}
        </>
    )
}