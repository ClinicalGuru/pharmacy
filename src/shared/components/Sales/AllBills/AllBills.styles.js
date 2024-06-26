
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme?.shape?.borderRadius,
    backgroundColor: "#F3F4F6FF",
    '&:hover': {
        backgroundColor: "#F3F4F6FF",
    },
    marginLeft: 0,
    width: '100%',
    [theme?.breakpoints?.up('sm')]: {
        marginLeft: theme?.spacing(1),
        width: 'auto',
    },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme?.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme?.spacing(4)})`,
        transition: theme?.transitions.create('width'),
        width: '100%',
        [theme?.breakpoints?.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme?.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const Container = styled('div')(({ theme}) => ({
    background: '#FFFFFFFF',
    borderRadius: '6px', 
    borderWidth: '1px', 
    borderColor: '#F3F4F6FF', 
    borderStyle: 'solid',
    boxShadow: '0px 0px 2px #171a1f',
    padding: '10px'
}));

 


