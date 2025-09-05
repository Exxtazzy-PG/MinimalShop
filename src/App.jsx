import React, { useState, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import { useTheme } from './context/ThemeContext';
import Header from './components/Header';
import Welcome from './components/Welcome';
import ProductCards from './components/ProductCards';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Notifications from './components/Notifications';
import { generateSearchSuggestions } from './utils/searchUtils';

const AppContent = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Sample products for search suggestions
  const products = [
    { id: 1, name: 'Минималистичные наушники', category: 'electronics' },
    { id: 2, name: 'Элегантная рубашка', category: 'clothing' },
    { id: 3, name: 'Современные кроссовки', category: 'footwear' },
    { id: 4, name: 'Умные часы', category: 'electronics' },
    { id: 5, name: 'Стильная сумка', category: 'accessories' },
    { id: 6, name: 'Ароматная свеча', category: 'home' }
  ];

  const searchSuggestions = useMemo(() => 
    generateSearchSuggestions(products, searchQuery), 
    [searchQuery]
  );

  const muiTheme = createTheme({
    palette: {
      mode: theme.colors.background === '#121212' ? 'dark' : 'light',
      primary: {
        main: theme.colors.primary
      },
      secondary: {
        main: theme.colors.secondary
      },
      background: {
        default: theme.colors.background,
        paper: theme.colors.surface
      },
      text: {
        primary: theme.colors.text,
        secondary: theme.colors.textSecondary
      }
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      h1: { lineHeight: 1.2 },
      h2: { lineHeight: 1.2 },
      h3: { lineHeight: 1.2 },
      h4: { lineHeight: 1.2 },
      h5: { lineHeight: 1.2 },
      h6: { lineHeight: 1.2 },
      body1: { lineHeight: 1.5 },
      body2: { lineHeight: 1.5 }
    },
    shape: {
      borderRadius: 8
    }
  });

  const appStyle = {
    backgroundColor: theme.colors.background,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease'
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={appStyle}>
        <Header 
          onSearchChange={setSearchQuery}
          searchSuggestions={searchSuggestions}
        />
        
        <Box sx={{ mt: 8 }}>
          <Welcome />
          
          <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
            <ProductCards searchQuery={searchQuery} />
          </Box>
          
          <Newsletter />
        </Box>

        <Footer />
        
        <Cart onCheckout={() => setCheckoutOpen(true)} />
        <Checkout 
          open={checkoutOpen} 
          onClose={() => setCheckoutOpen(false)} 
        />
        <Notifications />
      </Box>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;