import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const Checkout = ({ open, onClose }) => {
  const { theme } = useTheme();
  const { items, getTotalPrice, clearCart } = useCart();
  const { addNotification } = useNotification();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    const missing = required.filter(field => !formData[field]);
    
    if (missing.length > 0) {
      addNotification('Пожалуйста, заполните все обязательные поля', 'error');
      return;
    }

    // Simulate order processing
    addNotification('Заказ успешно оформлен!', 'success');
    clearCart();
    onClose();
  };

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: '12px'
        }
      }}
    >
      <DialogTitle sx={{ color: theme.colors.text, borderBottom: `1px solid ${theme.colors.border}` }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Оформление заказа
          </Typography>
          <IconButton onClick={onClose} sx={{ color: theme.colors.text }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ py: 3 }}>
          {/* Order Summary */}
          <Box sx={{ mb: 3, p: 2, backgroundColor: theme.colors.background, borderRadius: '8px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: theme.colors.text }}>
              Ваш заказ
            </Typography>
            {items.map(item => (
              <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: theme.colors.text }}>
                  {item.name} x {item.quantity}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.colors.text }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: `1px solid ${theme.colors.border}` }}>
              <Typography variant="h6" sx={{ color: theme.colors.text }}>
                Итого:
              </Typography>
              <Typography variant="h6" sx={{ color: theme.colors.primary, fontWeight: 700 }}>
                ${getTotalPrice().toFixed(2)}
              </Typography>
            </Box>
          </Box>

          {/* Personal Information */}
          <Typography variant="h6" sx={{ mb: 2, color: theme.colors.text }}>
            Личная информация
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Имя *"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Фамилия *"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Телефон *"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                sx={inputStyle}
              />
            </Grid>
          </Grid>

          {/* Delivery Address */}
          <Typography variant="h6" sx={{ mb: 2, color: theme.colors.text }}>
            Адрес доставки
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Адрес *"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Город *"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                sx={inputStyle}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Индекс"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                sx={inputStyle}
              />
            </Grid>
          </Grid>

          {/* Payment Method */}
          <Typography variant="h6" sx={{ mb: 2, color: theme.colors.text }}>
            Способ оплаты
          </Typography>
          <FormControl fullWidth sx={inputStyle}>
            <InputLabel>Способ оплаты</InputLabel>
            <Select
              value={formData.paymentMethod}
              name="paymentMethod"
              onChange={handleInputChange}
            >
              <MenuItem value="card">Банковская карта</MenuItem>
              <MenuItem value="cash">Наличными при получении</MenuItem>
              <MenuItem value="transfer">Банковский перевод</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ p: 3, borderTop: `1px solid ${theme.colors.border}` }}>
          <Box sx={{ width: '100%' }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: theme.colors.primary,
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: theme.colors.primary + 'dd'
                  }
                }}
              >
                Подтвердить заказ (${getTotalPrice().toFixed(2)})
              </Button>
            </motion.div>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Checkout;