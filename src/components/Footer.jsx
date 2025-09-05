import React from 'react';
import { Box, Typography, Container, Grid, Link } from '@mui/material';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  const footerStyle = {
    backgroundColor: theme.colors.surface,
    borderTop: `1px solid ${theme.colors.border}`,
    mt: 'auto',
    py: 4
  };

  return (
    <Box sx={footerStyle}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.colors.text, mb: 2 }}>
              MinimalShop
            </Typography>
            <Typography variant="body2" sx={{ color: theme.colors.textSecondary }}>
              Современный минималистичный магазин с максимальной функциональностью
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.colors.text, mb: 2 }}>
              Навигация
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Главная', 'Товары', 'О нас', 'Контакты'].map(item => (
                <Link
                  key={item}
                  href="#"
                  sx={{
                    color: theme.colors.textSecondary,
                    textDecoration: 'none',
                    '&:hover': { color: theme.colors.primary }
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.colors.text, mb: 2 }}>
              Контакты
            </Typography>
            <Typography variant="body2" sx={{ color: theme.colors.textSecondary }}>
              Email: info@minimalshop.com
            </Typography>
            <Typography variant="body2" sx={{ color: theme.colors.textSecondary }}>
              Телефон: +7 (999) 123-45-67
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: `1px solid ${theme.colors.border}` }}>
          <Typography variant="body2" sx={{ color: theme.colors.textSecondary }}>
            © 2025 MinimalShop. Все права защищены.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;