import React, { useState, useContext } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  TextField,
  Divider,
  Paper,
  Chip,
  Alert
} from '@mui/material';
import { 
  Add, 
  Remove, 
  Delete, 
  ShoppingCartCheckout, 
  ArrowBack,
  LocalShipping,
  Security,
  Verified
} from '@mui/icons-material';
import { LanguageContext } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  nameHe: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "Organic Cotton T-Shirt",
    nameHe: "חולצת כותנה אורגנית",
    price: 45,
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=organic%20cotton%20white%20t-shirt%20sustainable%20fashion%20minimalist%20design&image_size=square",
    quantity: 2,
    size: "M",
    color: "White"
  },
  {
    id: 2,
    name: "Recycled Denim Jeans",
    nameHe: "ג'ינס ממוחזר",
    price: 89,
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=recycled%20denim%20jeans%20sustainable%20fashion%20blue%20eco-friendly&image_size=square",
    quantity: 1,
    size: "32",
    color: "Blue"
  }
];

const CartPage: React.FC = () => {
  const { language, t, isRTL } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal - discount + shipping;

  if (cartItems.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="md" sx={{ direction: isRTL ? 'rtl' : 'ltr' }}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h4" gutterBottom>
              {t('cart.empty')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {t('cart.emptyMessage')}
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => navigate('/products')}
              sx={{ borderRadius: 2 }}
            >
              {t('cart.startShopping')}
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton onClick={() => navigate('/products')}>
                <ArrowBack />
              </IconButton>
              <Typography variant="h4" component="h1">
                {t('cart.title')}
              </Typography>
              <Chip 
                label={`${cartItems.length} ${t('cart.items')}`} 
                color="primary" 
              />
            </Box>

            {cartItems.map((item) => (
              <Card key={item.id} sx={{ mb: 2, p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={item.image}
                      alt={language === 'he' ? item.nameHe : item.name}
                      sx={{ borderRadius: 1, objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CardContent sx={{ p: 0 }}>
                      <Typography variant="h6" gutterBottom>
                        {language === 'he' ? item.nameHe : item.name}
                      </Typography>
                      {item.size && (
                        <Typography variant="body2" color="text.secondary">
                          {t('cart.size')}: {item.size}
                        </Typography>
                      )}
                      {item.color && (
                        <Typography variant="body2" color="text.secondary">
                          {t('cart.color')}: {item.color}
                        </Typography>
                      )}
                      <Typography variant="h6" color="primary.main" sx={{ mt: 1 }}>
                        ${item.price}
                      </Typography>
                    </CardContent>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          size="small"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                          inputProps={{ 
                            style: { textAlign: 'center', width: '40px' },
                            min: 1
                          }}
                        />
                        <IconButton 
                          size="small" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                      <Typography variant="body2" fontWeight="bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => removeItem(item.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h5" gutterBottom>
                {t('cart.orderSummary')}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>{t('cart.subtotal')}:</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>
              
              {promoApplied && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="success.main">
                    {t('cart.discount')} (10%):
                  </Typography>
                  <Typography color="success.main">-${discount.toFixed(2)}</Typography>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>{t('cart.shipping')}:</Typography>
                <Typography>
                  {shipping === 0 ? 
                    t('cart.free') : 
                    `$${shipping.toFixed(2)}`
                  }
                </Typography>
              </Box>
              
              {shipping === 0 && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocalShipping fontSize="small" />
                    <Typography variant="body2">
                      {t('cart.freeShipping')}
                    </Typography>
                  </Box>
                </Alert>
              )}
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  {t('cart.total')}:
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  ${total.toFixed(2)}
                </Typography>
              </Box>
              
              {/* Promo Code */}
              {!promoApplied && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>
                    {t('cart.promoCode')}:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder={t('cart.enterCode')}
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button 
                      variant="outlined" 
                      onClick={applyPromoCode}
                      disabled={!promoCode}
                    >
                      {t('cart.apply')}
                    </Button>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {t('cart.tryCode')}: SAVE10
                  </Typography>
                </Box>
              )}
              
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<ShoppingCartCheckout />}
                sx={{ mb: 2, borderRadius: 2 }}
              >
                {t('cart.checkout')}
              </Button>
              
              {/* Security Features */}
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
                  <Security fontSize="small" color="action" />
                  <Verified fontSize="small" color="action" />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {t('cart.securePayment')}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CartPage;