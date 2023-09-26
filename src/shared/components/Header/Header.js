import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';

import { SearchIconWrapper, Search, StyledInputBase, TypographyWrapper } from "./Header.styles";
import { TopMenu, Navbar } from "../TopMenu";

const pages = ['Purchases', 'Inventory', 'Sales', 'Reports'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Header = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static"
      sx={{ backgroundColor: "#DEE1E6B5" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img style={{ width: '95px', height: '32px',objectFit: 'cover', marginRight: '1rem'}} src={require('../../../assets/img/logo.png')} alt='logo' />
          {/* <Box
            component="img"
            sx={{
              width: 95,
              height: 32,
              objectFit: 'cover',
              marginRight: '1rem'
            }}
            alt="Logo"
            src={require('../../../assets/img/logo.png')}
          /> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <TypographyWrapper
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: '#565D6DFF',
                      textDecoration: 'none',
                      textTransformation: 'capitalize',
                      fontFamily: "'Mukta', sans-serif"
                    }}
                    textAlign="center">{page}</TypographyWrapper>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <TypographyWrapper
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </TypographyWrapper>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#565D6DFF', display: 'block', textTransform: 'capitalize', fontFamily: "'Mukta', sans-serif" }}
              >
                {page}
              </Button>
            ))} */}
            <Navbar />
          </Box>
          <Box sx={{ marginRight: 4 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: '#BDC1CAFF' }} />
              </SearchIconWrapper>
              <StyledInputBase
                sx={{ color: '#BDC1CAFF' }}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search', backgroundColor: "#F3F4F6FF" }}
              />
            </Search>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <TypographyWrapper textAlign="center">{setting}</TypographyWrapper>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// font-family: 'Mukta', sans-serif