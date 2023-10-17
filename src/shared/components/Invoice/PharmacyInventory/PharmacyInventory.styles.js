import styled from "styled-components";
import InputBase from '@mui/material/InputBase';

export const FormWrapper = styled.div`

`;


export const ErrorMessage = styled.p`
font-size: 10px;
color: #db2727;
margin: 0 0 0 5px;
`;

export const InvalidInput = styled.input`
    border: 1px solid red;
    
`;

export const Container = styled.div`

`

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme?.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

// export const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//         padding: theme?.spacing(1, 1, 1, 0),
//         // vertical padding + font size from searchIcon
//         paddingLeft: `calc(1em + ${theme?.spacing(4)})`,
//         transition: theme?.transitions.create('width'),
//         width: '100%',
//         [theme?.breakpoints?.up('sm')]: {
//             width: '12ch',
//             '&:focus': {
//                 width: '20ch',
//             },
//         },
//     },
// }));

// export const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme?.shape?.borderRadius,
//     backgroundColor: "#F3F4F6FF",
//     '&:hover': {
//         backgroundColor: "#F3F4F6FF",
//     },
//     marginLeft: 0,
//     width: '100%',
//     [theme?.breakpoints?.up('sm')]: {
//         marginLeft: theme?.spacing(1),
//         width: 'auto',
//     },
// }));