import React, { useState, useContext } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Rating,
  IconButton
} from '@mui/material';
import { Search, ShoppingCart, Favorite, FilterList } from '@mui/icons-material';
import { LanguageContext } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  nameHe: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Organic Cotton T-Shirt",
    nameHe: "חולצת כותנה אורגנית",
    price: 45,
    originalPrice: 60,
    image: "https://images.unsplash.com/photo-1520975594088-0f8d6adb82ee?q=85&auto=format&fit=crop&w=600&h=600",
    category: "tops",
    rating: 4.5,
    reviews: 128,
    isSale: true
  },
  {
    id: 2,
    name: "Recycled Denim Jeans",
    nameHe: "ג'ינס ממוחזר",
    price: 89,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=85&auto=format&fit=crop&w=600&h=600",
    category: "bottoms",
    rating: 4.8,
    reviews: 95,
    isNew: true
  },
  {
    id: 3,
    name: "Hemp Blend Dress",
    nameHe: "שמלת תערובת קנבוס",
    price: 120,
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=85&auto=format&fit=crop&w=600&h=600",
    category: "dresses",
    rating: 4.3,
    reviews: 67,
  },
  {
    id: 4,
    name: "Bamboo Fiber Cardigan",
    nameHe: "קרדיגן סיבי במבוק",
    price: 75,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=85&auto=format&fit=crop&w=600&h=600",
    category: "outerwear",
    rating: 4.6,
    reviews: 84,
  }
];

const ProductsPage: React.FC = () => {
  const { language, t, isRTL } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { value: 'all', label: t('category.all') },
    { value: 'tops', label: t('category.tops') },
    { value: 'bottoms', label: t('category.bottoms') },
    { value: 'dresses', label: t('category.dresses') },
    { value: 'outerwear', label: t('category.outerwear') }
  ];

  const sortOptions = [
    { value: 'name', label: t('sort.name') },
    { value: 'price-low', label: t('sort.priceLowHigh') },
    { value: 'price-high', label: t('sort.priceHighLow') },
    { value: 'rating', label: t('sort.rating') }
  ];

  const filteredProducts = mockProducts
    .filter(product => {
      const matchesSearch = (language === 'he' ? product.nameHe : product.name)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return (language === 'he' ? a.nameHe : a.name).localeCompare(
            language === 'he' ? b.nameHe : b.name
          );
      }
    });

  const handleAddToCart = (product: Product) => {
    // Add to cart logic here
    console.log('Added to cart:', product);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>

      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ mb: 4, textAlign: 'center', direction: isRTL ? 'rtl' : 'ltr' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {t('products.title')}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {t('products.subtitle')}
          </Typography>
        </Box>

        {/* Filters and Search */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>{t('common.filter')}</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label={t('common.filter')}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>{t('common.sort')}</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label={t('common.sort')}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
                sx={{ height: '56px' }}
              >
                {language === 'he' ? 'פילטרים' : 'Filters'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                {/* Product Badges */}
                {(product.isNew || product.isSale) && (
                  <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1 }}>
                    {product.isNew && (
                      <Chip 
                        label={language === 'he' ? 'חדש' : 'New'} 
                        color="primary" 
                        size="small" 
                        sx={{ mr: 1 }}
                      />
                    )}
                    {product.isSale && (
                      <Chip 
                        label={language === 'he' ? 'מבצע' : 'Sale'} 
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  </Box>
                )}

                {/* Favorite Button */}
                <IconButton
                  sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, bgcolor: 'rgba(255,255,255,0.8)' }}
                  size="small"
                >
                  <Favorite sx={{ color: 'primary.main' }} />
                </IconButton>

                <CardMedia
                  component="img"
                  height="250"
                  image={product.image}
                  alt={language === 'he' ? product.nameHe : product.name}
                  sx={{ objectFit: 'cover' }}
                />
                
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2" noWrap>
                    {language === 'he' ? product.nameHe : product.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating} precision={0.1} size="small" readOnly sx={{ color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.reviews})
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                      ${product.price}
                    </Typography>
                    {product.originalPrice && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ textDecoration: 'line-through' }}
                      >
                        ${product.originalPrice}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(product)}
                    sx={{ borderRadius: 2 }}
                  >
                    {language === 'he' ? 'הוסף לעגלה' : 'Add to Cart'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {language === 'he' ? 'לא נמצאו מוצרים' : 'No products found'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {language === 'he' 
                ? 'נסה לשנות את מונחי החיפוש או הפילטרים'
                : 'Try adjusting your search terms or filters'
              }
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductsPage;