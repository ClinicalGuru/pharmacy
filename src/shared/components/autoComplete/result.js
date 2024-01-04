import React from 'react';

const keys = ['name'];

const Result = (props) => {
    <div>
        {
            keys.map((key) => {
                <span>{key.charAt(0) + key.slice(1)}: {props[key]}</span>
            })
        }
    </div>
}

export default Result;