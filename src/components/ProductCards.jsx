import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import { AddShoppingCart, Star } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const ProductCards = ({ searchQuery }) => {
  const { theme } = useTheme();
  const { addItem } = useCart();
  const { addNotification } = useNotification();
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Минималистичные наушники',
      price: 299,
      category: 'electronics',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Элегантная рубашка',
      price: 79,
      category: 'clothing',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Современные кроссовки',
      price: 149,
      category: 'footwear',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      name: 'Умные часы',
      price: 399,
      category: 'electronics',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      name: 'Стильная сумка',
      price: 199,
      category: 'accessories',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      name: 'Ароматная свеча',
      price: 29,
      category: 'home',
      rating: 4.4,
      image: 'https://images.pexels.com/photos/6510616/pexels-photo-6510616.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const categories = ['all', 'electronics', 'clothing', 'footwear', 'accessories', 'home'];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, filterCategory, sortBy]);

  const handleAddToCart = (product) => {
    addItem(product);
    addNotification(`${product.name} добавлен в корзину`, 'success');
  };

  const cardStyle = {
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 8px 25px ${theme.colors.shadow}`
    }
  };

  const getCategoryLabel = (category) => {
    const labels = {
      electronics: 'Электроника',
      clothing: 'Одежда',
      footwear: 'Обувь',
      accessories: 'Аксессуары',
      home: 'Дом',
      all: 'Все'
    };
    return labels[category] || category;
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Filters and Sort */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: theme.colors.text }}>Категория</InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            sx={{
              color: theme.colors.text,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.colors.border
              }
            }}
          >
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>
                {getCategoryLabel(cat)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: theme.colors.text }}>Сортировка</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{
              color: theme.colors.text,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.colors.border
              }
            }}
          >
            <MenuItem value="name">По названию</MenuItem>
            <MenuItem value="price-low">Цена: по возрастанию</MenuItem>
            <MenuItem value="price-high">Цена: по убыванию</MenuItem>
            <MenuItem value="rating">По рейтингу</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        <AnimatePresence>
          {filteredAndSortedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card sx={cardStyle}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography 
                        variant="h6" 
                        component="h3"
                        sx={{ color: theme.colors.text, fontWeight: 600 }}
                      >
                        {product.name}
                      </Typography>
                      <Chip
                        size="small"
                        label={getCategoryLabel(product.category)}
                        sx={{
                          backgroundColor: theme.colors.primary + '20',
                          color: theme.colors.primary
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Star sx={{ color: '#ffa726', fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: theme.colors.textSecondary }}>
                        {product.rating}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography 
                        variant="h5" 
                        sx={{ color: theme.colors.primary, fontWeight: 700 }}
                      >
                        ${product.price}
                      </Typography>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="contained"
                          startIcon={<AddShoppingCart />}
                          onClick={() => handleAddToCart(product)}
                          sx={{
                            backgroundColor: theme.colors.primary,
                            '&:hover': {
                              backgroundColor: theme.colors.primary + 'dd'
                            }
                          }}
                        >
                          В корзину
                        </Button>
                      </motion.div>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {filteredAndSortedProducts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" sx={{ color: theme.colors.textSecondary }}>
            Товары не найдены
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductCards;