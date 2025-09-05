import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Drawer,
  Typography,
  Box,
  IconButton,
  Button,
  List,
  ListItem,
  Avatar,
  Divider
} from '@mui/material';
import { Close, Add, Remove, Delete } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const Cart = ({ onCheckout }) => {
  const { theme } = useTheme();
  const { 
    items, 
    isOpen, 
    setIsOpen, 
    removeItem, 
    updateQuantity, 
    getTotalPrice,
    getTotalItems 
  } = useCart();

  const drawerStyle = {
    backgroundColor: theme.colors.surface,
    color: theme.colors.text,
    width: { xs: '100vw', sm: 400 },
    borderLeft: `1px solid ${theme.colors.border}`
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      PaperProps={{ sx: drawerStyle }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.colors.border}` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Корзина ({getTotalItems()})
            </Typography>
            <IconButton onClick={() => setIsOpen(false)} sx={{ color: theme.colors.text }}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        {/* Cart Items */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {items.length === 0 ? (
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <Typography variant="body1" sx={{ color: theme.colors.textSecondary }}>
                Корзина пуста
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch', p: 2 }}>
                      <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                        <Avatar
                          src={item.image}
                          variant="rounded"
                          sx={{ width: 60, height: 60 }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: theme.colors.textSecondary, mb: 1 }}>
                            ${item.price}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                sx={{ 
                                  backgroundColor: theme.colors.background,
                                  color: theme.colors.text,
                                  '&:hover': { backgroundColor: theme.colors.border }
                                }}
                              >
                                <Remove fontSize="small" />
                              </IconButton>
                              
                              <Typography variant="body1" sx={{ mx: 1, minWidth: 20, textAlign: 'center' }}>
                                {item.quantity}
                              </Typography>
                              
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                sx={{ 
                                  backgroundColor: theme.colors.background,
                                  color: theme.colors.text,
                                  '&:hover': { backgroundColor: theme.colors.border }
                                }}
                              >
                                <Add fontSize="small" />
                              </IconButton>
                            </Box>

                            <IconButton
                              size="small"
                              onClick={() => removeItem(item.id)}
                              sx={{ color: theme.colors.secondary }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                      
                      <Box sx={{ textAlign: 'right', mt: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Итого: ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    </ListItem>
                    <Divider sx={{ borderColor: theme.colors.border }} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </List>
          )}
        </Box>

        {/* Footer */}
        {items.length > 0 && (
          <Box sx={{ p: 2, borderTop: `1px solid ${theme.colors.border}` }}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Общая сумма:</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.colors.primary }}>
                  ${getTotalPrice().toFixed(2)}
                </Typography>
              </Box>
            </Box>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={onCheckout}
                sx={{
                  backgroundColor: theme.colors.primary,
                  color: 'white',
                  py: 1.5,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: theme.colors.primary + 'dd'
                  }
                }}
              >
                Оформить заказ
              </Button>
            </motion.div>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart;