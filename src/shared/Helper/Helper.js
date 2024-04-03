import React from 'react';

export const TotalCalculation = ({ price, quantity }) => {
    const calculateTotal = (price, quantity) => {
        return price * quantity;
    };

    const total = calculateTotal(price, quantity);

    return (
        <span>{total}</span>
    );
};