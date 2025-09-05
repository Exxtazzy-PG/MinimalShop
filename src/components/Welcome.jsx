import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Box } from '@mui/material';
import { useTheme } from '../context/ThemeContext';

const Welcome = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const style = {
    background: `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.secondary}20)`,
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <Box sx={style}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={textVariants}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 300,
              color: theme.colors.text,
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Welcome to
          </Typography>
        </motion.div>

        <motion.div variants={textVariants}>
          <Typography
            variant="h1"
            component="span"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '3rem', md: '4rem' },
              display: 'block',
              mb: 2
            }}
          >
            MinimalShop
          </Typography>
        </motion.div>

        <motion.div variants={textVariants}>
          <Typography
            variant="h5"
            sx={{
              color: theme.colors.textSecondary,
              fontWeight: 300,
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}
          >
            Современный минималистичный магазин с максимальной функциональностью
          </Typography>
        </motion.div>
      </motion.div>

      {/* Animated background particles */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '4px',
          height: '4px',
          backgroundColor: theme.colors.primary,
          borderRadius: '50%'
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 1, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '6px',
          height: '6px',
          backgroundColor: theme.colors.secondary,
          borderRadius: '50%'
        }}
        animate={{
          y: [0, -40, 0],
          opacity: [0.2, 0.8, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </Box>
  );
};

export default Welcome;