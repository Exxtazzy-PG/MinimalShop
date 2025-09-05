import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Autocomplete,
  Box
} from '@mui/material';
import { 
  Menu as MenuIcon,
  ShoppingCart,
  Search,
  Brightness4,
  Brightness7,
  Close
} from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Header = ({ onSearchChange, searchSuggestions }) => {
  const { isDark, toggleTheme, theme } = useTheme();
  const { getTotalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const menuItems = ['Главная', 'Товары', 'О нас', 'Контакты'];

  const handleSearchChange = (event, value) => {
    setSearchValue(value);
    onSearchChange(value);
  };

  const headerStyle = {
    backgroundColor: theme.colors.surface,
    borderBottom: `1px solid ${theme.colors.border}`,
    boxShadow: `0 2px 8px ${theme.colors.shadow}`,
    color: theme.colors.text
  };

  const searchStyle = {
    backgroundColor: theme.colors.background,
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
      color: theme.colors.text,
      '& fieldset': {
        borderColor: theme.colors.border,
      },
      '&:hover fieldset': {
        borderColor: theme.colors.primary,
      },
    },
  };

  return (
    <>
      <AppBar position="fixed" style={headerStyle} elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: theme.colors.text }}>
              MinimalShop
            </Typography>
          </motion.div>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
            {menuItems.map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    cursor: 'pointer',
                    color: theme.colors.text,
                    '&:hover': { color: theme.colors.primary }
                  }}
                >
                  {item}
                </Typography>
              </motion.div>
            ))}
          </Box>

          {/* Search */}
          <Box sx={{ display: { xs: 'none', sm: 'block' }, width: 300 }}>
            <Autocomplete
              freeSolo
              options={searchSuggestions}
              value={searchValue}
              onInputChange={handleSearchChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Поиск товаров..."
                  size="small"
                  sx={searchStyle}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <Search sx={{ color: theme.colors.textSecondary, mr: 1 }} />,
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={toggleTheme} sx={{ color: theme.colors.text }}>
              {isDark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            <IconButton onClick={() => setIsOpen(true)} sx={{ color: theme.colors.text }}>
              <Badge badgeContent={getTotalItems()} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <IconButton
              sx={{ display: { xs: 'block', md: 'none' }, color: theme.colors.text }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme.colors.surface,
            width: 280,
            borderLeft: `1px solid ${theme.colors.border}`
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: theme.colors.text }}>
              Меню
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)} sx={{ color: theme.colors.text }}>
              <Close />
            </IconButton>
          </Box>
          
          <TextField
            fullWidth
            placeholder="Поиск..."
            size="small"
            sx={{ ...searchStyle, mb: 2 }}
            value={searchValue}
            onChange={(e) => handleSearchChange(e, e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: theme.colors.textSecondary, mr: 1 }} />,
            }}
          />

          <List>
            {menuItems.map((item) => (
              <ListItem key={item} button onClick={() => setMobileMenuOpen(false)}>
                <ListItemText primary={item} sx={{ color: theme.colors.text }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;