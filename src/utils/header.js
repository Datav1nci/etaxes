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
const settings = /*['Profile', 'Account', 'Dashboard', 'Logout']*/[''];

// Links for Forms & Resources
const formLinks = {
  "Formulaires": [
    { name: "Particulier", url: "https://forms.office.com/r/jZA8KLUgQE" },
    { name: "Télétravail", url: "https://forms.office.com/r/9UZKxqL6QD" }, 
    { name: "Travailleur autonome", url: "https://forms.office.com/r/aJyVzUTWKn" },
    { name: "Dépenses Voitures", url: "https://forms.office.com/r/5E4QCZh6Q5" },
  ],
  "English Forms": [
    { name: "Individual", url: "https://forms.office.com/r/4LZZ97Fm3J" },
    { name: "Remote work", url: "https://forms.office.com/r/9UZKxqL6QD" },
    { name: "Self-Employed", url: "https://forms.office.com/r/wjAm3PiDkS" },
    { name: "Car Expenses", url: "https://forms.office.com/r/5E4QCZh6Q5" },
  ]
};

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElContact, setAnchorElContact] = React.useState(null);
  const [anchorElForms, setAnchorElForms] = React.useState(null);

  // Handle Nav Menu
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  // Handle User Menu
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Handle Contact Popover
  const handleOpenContact = (event) => setAnchorElContact(event.currentTarget);
  const handleCloseContact = () => setAnchorElContact(null);

  // Handle Forms Menu
  const handleOpenFormsMenu = (event) => setAnchorElForms(event.currentTarget);
  const handleCloseFormsMenu = () => setAnchorElForms(null);

  return (
    <AppBar position="static" style={{ backgroundColor: "aliceblue" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ flexWrap: 'wrap' }}>
          {/* Logo: Make it responsive by setting only the height */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 2,
            }}
          >
            <img
              src={LogoJPEG}
              alt="Logo"
              style={{ height: '40px', width: 'auto' }} 
            />
          </Box>

          {/* Expandable space so items push to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Forms & Resources Dropdown */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button
              color="inherit"
              sx={{
                mx: 1,
                border: "1px solid black",
                color: "black",
                fontSize: { xs: "12px", sm: "14px" },
                whiteSpace: 'nowrap'
              }}
              onClick={handleOpenFormsMenu}
            >
              Formulaires
            </Button>
            <Menu
              anchorEl={anchorElForms}
              open={Boolean(anchorElForms)}
              onClose={handleCloseFormsMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              sx={{ maxWidth: '90vw' }}
            >
              {Object.entries(formLinks).map(([category, links]) => (
                <Box key={category} sx={{ px: 2, py: 1 }}>
                  <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                    {category}
                  </Typography>
                  {links.map((link) => (
                    <MenuItem key={link.name} onClick={handleCloseFormsMenu}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {link.name}
                      </a>
                    </MenuItem>
                  ))}
                </Box>
              ))}
            </Menu>

            {/* Contact Us Button */}
            <Button
              color="inherit"
              sx={{
                mx: 1,
                border: "1px solid black",
                color: "black",
                fontSize: { xs: "12px", sm: "14px" },
                whiteSpace: 'nowrap'
              }}
              onClick={handleOpenContact}
            >
              Nous joindre
            </Button>
          </Box>

          /*{*//* User Profile Icon *//*}*/
          /*<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>*/
        </Toolbar>
      </Container>

      {/* Contact Us Popover */}
      <Popover
        open={Boolean(anchorElContact)}
        anchorEl={anchorElContact}
        onClose={handleCloseContact}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          sx: {
            maxWidth: '90vw',
            // Restrict horizontal overflow:
            overflowX: 'hidden',
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>Coordonnées</Typography>
          <Typography variant="body1">
            📍 6955 Boulv. Taschereau, Brossard #004, Québec, J4Z 1A7
          </Typography>
          <Typography variant="body1">
            📞 Téléphone: +1 (450) 259-1829
          </Typography>
          <Typography variant="body1">
            📧 eMail: youssef@effitaxes.com
          </Typography>
        </Box>
      </Popover>
    </AppBar>
  );
}

export default ResponsiveAppBar;
