// QueryParamsContext.js
import React, { createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const QueryParamsContext = createContext();

export const useQueryParams = () => {
    return useContext(QueryParamsContext);
};

export const QueryParamsProvider = ({ children }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryParams = Object.fromEntries(searchParams.entries());

    return (
        <QueryParamsContext.Provider value={queryParams}>
            {children}
        </QueryParamsContext.Provider>
    );
};
