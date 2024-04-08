import React from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./Router";
import { createTheme, ThemeProvider } from '@mui/material/styles';
const App = () => {
    return (
        <ThemeProvider theme={THEME}>
            <RouterProvider router={Router} />
        </ThemeProvider>
    )
}

const THEME = createTheme({
    typography: {
        "fontFamily": `"Lato", sans- serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500,
        label: {"fontFamily": `"Lato", sans- serif`,}
    }
});
export default App;