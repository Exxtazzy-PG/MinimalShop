import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container
} from '@mui/material';
import { Email } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';

const Newsletter = () => {
  const { theme } = useTheme();
  const { addNotification } = useNotification();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      addNotification('Введите email адрес', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addNotification('Введите корректный email адрес', 'error');
      return;
    }

    addNotification('Спасибо за подписку!', 'success');
    setEmail('');
  };

  const containerStyle = {
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '16px',
    padding: '3rem',
    textAlign: 'center',
    backgroundImage: `linear-gradient(135deg, ${theme.colors.primary}10, ${theme.colors.secondary}10)`
  };

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      '& fieldset': {
        borderColor: theme.colors.border,
      },
      '&:hover fieldset': {
        borderColor: theme.colors.primary,
      },
    },
    '& .MuiInputLabel-root': {
      color: theme.colors.textSecondary,
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Box sx={containerStyle}>
          <Email sx={{ fontSize: 48, color: theme.colors.primary, mb: 2 }} />
          
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              color: theme.colors.text,
              mb: 1,
              fontSize: { xs: '1.8rem', md: '2.5rem' }
            }}
          >
            Будьте в курсе
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: theme.colors.textSecondary,
              mb: 3,
              maxWidth: 500,
              mx: 'auto'
            }}
          >
            Подпишитесь на нашу рассылку и получайте уведомления о новых товарах и специальных предложениях
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              maxWidth: 400,
              mx: 'auto'
            }}
          >
            <TextField
              fullWidth
              label="Ваш email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={inputStyle}
            />
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: theme.colors.primary,
                  px: 3,
                  py: 1.5,
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    backgroundColor: theme.colors.primary + 'dd'
                  }
                }}
              >
                Подписаться
              </Button>
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Newsletter;