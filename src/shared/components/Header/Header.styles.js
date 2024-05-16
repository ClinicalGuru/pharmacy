import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
// export const LogoImg = styled.img`
// width: 95px;
// height: 32px;
// object-fit: cover;
// margin-right: 1rem
// `;

export const FixedHeader = styled('div')`
    
  transition: background-color 0.3s ease;

    position: fixed,
    top: 0,
    width: 100%,
    z-index: 1000,
    background-color: #DEE1E6B5; /* Your desired background color for the sticky header */

`



/* Adjust z-index as needed */


export const TypographyWrapper = styled(Typography)`
// font-family: 'Mukta', sans-serif
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

export const Profile = styled('div')`
    color: #4a2495;
    text-decoration: underline;
    margin-left: 15px;
    cursor: pointer;
    font-weight: 900;
    font-size: 18px;
`

