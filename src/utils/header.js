import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import LogoJPEG from '../../src/assets/Logo.jpg';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

// Links for Forms & Resources
const formLinks = {
  "French Forms": [
    { name: "Particulier (VF)", url: "https://forms.office.com/r/jZA8KLUgQE" },
    { name: "Dépenses Voitures", url: "https://forms.office.com/r/5E4QCZh6Q5" },
    { name: "Entreprise Travailleur (VF)", url: "https://forms.office.com/r/aJyVzUTWKn" },
    { name: "Self-Employed (VF)", url: "https://forms.office.com/r/aJyVzUTWKn" },
    { name: "Télétravail (VF)", url: "https://forms.office.com/r/9UZKxqL6QD" },
  ],
  "English Forms": [
    { name: "Particulier (EN)", url: "https://forms.office.com/r/4LZZ97Fm3J" },
    { name: "Car Expenses", url: "https://forms.office.com/r/5E4QCZh6Q5" },
    { name: "Entreprise Travailleur (EN)", url: "https://forms.office.com/r/wjAm3PiDkS" },
    { name: "Self-Employed (EN)", url: "https://forms.office.com/r/wjAm3PiDkS" },
    { name: "Télétravail (EN)", url: "https://forms.office.com/r/9UZKxqL6QD" },
  ]
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElContact, setAnchorElContact] = React.useState(null);
  const [anchorElForms, setAnchorElForms] = React.useState(null);

  // Handle Nav Menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Handle User Menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Handle Contact Popover
  const handleOpenContact = (event) => {
    setAnchorElContact(event.currentTarget);
  };
  const handleCloseContact = () => {
    setAnchorElContact(null);
  };

  // Handle Forms Menu
  const handleOpenFormsMenu = (event) => {
    setAnchorElForms(event.currentTarget);
  };
  const handleCloseFormsMenu = () => {
    setAnchorElForms(null);
  };

  return (
    <AppBar position="static" style={{backgroundColor:"aliceblue"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <img src={LogoJPEG} alt="Logo" width={375} height={40} />

          {/* Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
            {/* {pages.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))} */}
          </Box>

          {/* Forms & Resources Dropdown */}
          <Button
            color="inherit"
            sx={{ mx: 2, border: "1px solid black", color:"black" }}
            onClick={handleOpenFormsMenu}
          >
            Forms & Resources
          </Button>
          <Menu
            anchorEl={anchorElForms}
            open={Boolean(anchorElForms)}
            onClose={handleCloseFormsMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {Object.entries(formLinks).map(([category, links]) => (
              <div key={category}>
                <Typography sx={{ px: 2, py: 1, fontWeight: "bold" }}>{category}</Typography>
                {links.map((link) => (
                  <MenuItem key={link.name} onClick={handleCloseFormsMenu}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                      {link.name}
                    </a>
                  </MenuItem>
                ))}
              </div>
            ))}
          </Menu>

          {/* Contact Us Button */}
          <Button 
            color="inherit" 
            sx={{ mx: 2, border: "1px solid black", color:"black" }} 
            onClick={handleOpenContact}
          >
            Contact Us
          </Button>

          {/* User Profile Icon */}
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
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* Contact Us Popover */}
      <Popover
        open={Boolean(anchorElContact)}
        anchorEl={anchorElContact}
        onClose={handleCloseContact}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, minWidth: 250, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>Contact Information</Typography>
          <Typography variant="body1">📍 Team, Effitaxes 6955 Boulv. Taschereau, Brossard #004, Québec, J4Z 1A7</Typography>
          <Typography variant="body1">📞 Phone: +1 (450) 259-1829</Typography>
          <Typography variant="body1">📧 Email: youssef@effitaxes.com</Typography>
        </Box>
      </Popover>

    </AppBar>
  );
}

export default ResponsiveAppBar;
