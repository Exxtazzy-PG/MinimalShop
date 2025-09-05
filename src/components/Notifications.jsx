import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Snackbar,
  Alert,
  Box
} from '@mui/material';
import { useNotification } from '../context/NotificationContext';
import { useTheme } from '../context/ThemeContext';

const Notifications = () => {
  const { notifications, removeNotification } = useNotification();
  const { theme } = useTheme();

  return (
    <Box sx={{ position: 'fixed', top: 80, right: 16, zIndex: 9999 }}>
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: '8px' }}
          >
            <Alert
              severity={notification.type}
              onClose={() => removeNotification(notification.id)}
              sx={{
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '8px',
                minWidth: 300,
                boxShadow: `0 4px 12px ${theme.colors.shadow}`
              }}
            >
              {notification.message}
            </Alert>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default Notifications;