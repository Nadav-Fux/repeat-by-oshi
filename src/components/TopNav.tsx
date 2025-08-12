import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Language,
  Menu as MenuIcon
} from '@mui/icons-material';
import { LanguageContext } from '../contexts/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

const TopNav: React.FC = () => {
  const { language, setLanguage, t, isRTL } = useContext(LanguageContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const handleLanguageChange = () => {
    setLanguage(language === 'he' ? 'en' : 'he');
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/products', label: t('nav.products') },
  ];

  return (
    <AppBar position="static" color="secondary" sx={{ borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
      <Toolbar sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        {/* Logo/Brand */}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontFamily: 'Playfair Display, serif',
            color: 'inherit',
            letterSpacing: 0.5
          }}
          onClick={() => navigate('/')}
        >
          {t('brand.name')}
        </Typography>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              onClick={() => navigate(item.path)}
              sx={{
                color: 'inherit',
                fontWeight: isActive(item.path) ? 'bold' : 'normal',
                borderBottom: isActive(item.path) ? '2px solid' : '2px solid transparent',
                borderBottomColor: isActive(item.path) ? 'primary.main' : 'transparent',
                borderRadius: 0,
                '&:hover': {
                  color: 'primary.main',
                  borderBottomColor: 'primary.main',
                  backgroundColor: 'transparent'
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Language Toggle */}
        <IconButton
          color="inherit"
          onClick={handleLanguageChange}
          sx={{ ml: 1, '&:hover': { color: 'primary.main' } }}
        >
          <Language />
        </IconButton>

        {/* Cart */}
        <IconButton
          color="inherit"
          onClick={() => navigate('/cart')}
          sx={{ ml: 1, '&:hover': { color: 'primary.main' } }}
        >
          <Badge badgeContent={0} color="primary">
            <ShoppingCart />
          </Badge>
        </IconButton>

        {/* Account */}
        <IconButton
          color="inherit"
          onClick={handleProfileMenuOpen}
          sx={{ ml: 1, '&:hover': { color: 'primary.main' } }}
        >
          <Person />
        </IconButton>

        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          onClick={handleMobileMenuOpen}
          sx={{ display: { xs: 'flex', md: 'none' }, ml: 1, '&:hover': { color: 'primary.main' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: isRTL ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isRTL ? 'left' : 'right',
        }}
      >
        <MenuItem onClick={() => { navigate('/account'); handleProfileMenuClose(); }}>
          {t('nav.account')}
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          {t('account.logout')}
        </MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: isRTL ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isRTL ? 'left' : 'right',
        }}
      >
        {navItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => { navigate(item.path); handleMobileMenuClose(); }}
            sx={{
              fontWeight: isActive(item.path) ? 'bold' : 'normal',
            }}
          >
            {item.label}
          </MenuItem>
        ))}
        <MenuItem onClick={() => { navigate('/cart'); handleMobileMenuClose(); }}>
          {t('nav.cart')}
        </MenuItem>
        <MenuItem onClick={() => { navigate('/account'); handleMobileMenuClose(); }}>
          {t('nav.account')}
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default TopNav;