import React, { useContext } from 'react';
import { Box, Container, Typography, Stack, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate, Link } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

const Hero = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[100]} 100%)`,
  paddingTop: theme.spacing(6)
}));

const HomePage: React.FC = () => {
  const { t, isRTL } = useContext(LanguageContext);
  const navigate = useNavigate();

  return (
    <Box>
      <Hero>
        <Container maxWidth="lg">
          <Stack alignItems="center" spacing={3}>
            <FavoriteIcon sx={{ color: 'primary.main', fontSize: 56, transform: 'rotate(25deg)', transformOrigin: '50% 60%' }} />
            <Typography variant="h1" sx={{ textAlign: 'center' }}>{t('hero.title')}</Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary', maxWidth: 800 }}>
              {t('hero.subtitle')}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained" size="large" onClick={() => navigate('/products')}>
                {t('hero.shopNow')}
              </Button>
              <Button variant="outlined" size="large" onClick={() => {
                const el = document.getElementById('story');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
                {t('hero.learnMore')}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Hero>

      {/* Brand Story Section */}
      <Box id="story" sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} direction={isRTL ? 'row-reverse' : 'row'} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom>{t('storyTitle')}</Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>{t('storyContent')}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
                <img src="https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?q=85&auto=format&fit=crop&w=1000" alt="brand story" style={{ width: '100%', display: 'block' }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Sustainability Section */}
      <Box id="sustainability" sx={{ py: 10, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            {t('sustainability.title')}
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <Box sx={{ fontSize: 48, mb: 2 }}>♻️</Box>
                <Typography variant="h5" gutterBottom>{t('sustainability.recycled.title')}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('sustainability.recycled.description')}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <Box sx={{ fontSize: 48, mb: 2 }}>🌱</Box>
                <Typography variant="h5" gutterBottom>{t('sustainability.organic.title')}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('sustainability.organic.description')}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <Box sx={{ fontSize: 48, mb: 2 }}>🌍</Box>
                <Typography variant="h5" gutterBottom>{t('sustainability.carbon.title')}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {t('sustainability.carbon.description')}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Visual Gallery Section */}
      <Box id="gallery" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            {t('gallery.title')}
          </Typography>
          <Grid container spacing={3}>
            {[
              { id: 1, title: 'Eco Denim', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=85&auto=format&fit=crop&w=800&h=1000' },
              { id: 2, title: 'Linen Collection', image: 'https://images.unsplash.com/photo-1485462537746-965f33f7d6a4?q=85&auto=format&fit=crop&w=1000&h=800' },
              { id: 3, title: 'Organic Cotton', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=85&auto=format&fit=crop&w=800&h=1000' },
              { id: 4, title: 'Sustainable Wool', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=85&auto=format&fit=crop&w=1000&h=800' }
            ].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia 
                    component="img" 
                    height="300" 
                    image={item.image} 
                    alt={item.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">{item.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Coming Soon Section */}
      <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Stack alignItems="center" spacing={4}>
            <Typography variant="h2" textAlign="center">{t('comingSoon.title')}</Typography>
            <Typography variant="h6" textAlign="center" color="text.secondary" maxWidth={600}>
              {t('comingSoon.description')}
            </Typography>
            <Box sx={{ textAlign: 'center', maxWidth: 500, width: '100%' }}>
              <Typography variant="h5" gutterBottom>{t('comingSoon.newsletter.title')}</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {t('comingSoon.newsletter.description')}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <input 
                  type="email" 
                  placeholder={t('comingSoon.newsletter.placeholder')} 
                  style={{ 
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    border: '1px solid #ddd', 
                    flex: 1,
                    minWidth: '250px'
                  }} 
                />
                <Button variant="contained" size="large">
                  {t('comingSoon.newsletter.subscribe')}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Stack alignItems="center" spacing={2} sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2">{t('contactTitle')}</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700 }}>{t('contactSubtitle')}</Typography>
          </Stack>
          <Grid container spacing={3}>
            {[
              { icon: '📍', title: t('address'), desc: 'Tel Aviv, Israel' },
              { icon: '✉️', title: t('email'), desc: 'hello@repeatbyoshi.com' },
              { icon: '📞', title: t('phone'), desc: '+972-XX-XXX-XXXX' },
            ].map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'background.default', textAlign: 'center', boxShadow: 1 }}>
                  <Box sx={{ fontSize: 32, mb: 1 }}>{item.icon}</Box>
                  <Typography variant="h6" gutterBottom>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>{t('footer.brand.title')}</Typography>
              <Typography variant="body2" color="grey.400">
                {t('footer.brand.description')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>{t('footer.links.title')}</Typography>
              <Stack spacing={1}>
                <Link to="#home" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Typography variant="body2" color="grey.400">{t('footer.links.home')}</Typography>
                </Link>
                <Link to="#story" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Typography variant="body2" color="grey.400">{t('footer.links.story')}</Typography>
                </Link>
                <Link to="#sustainability" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Typography variant="body2" color="grey.400">{t('footer.links.sustainability')}</Typography>
                </Link>
                <Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Typography variant="body2" color="grey.400">{t('footer.links.products')}</Typography>
                </Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>{t('footer.support.title')}</Typography>
              <Stack spacing={1}>
                <Link to="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Typography variant="body2" color="grey.400">{t('footer.support.contact')}</Typography>
                </Link>
                <Typography variant="body2" color="grey.400">{t('footer.support.faq')}</Typography>
                <Typography variant="body2" color="grey.400">{t('footer.support.shipping')}</Typography>
                <Typography variant="body2" color="grey.400">{t('footer.support.returns')}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>{t('footer.social.title')}</Typography>
              <Stack direction="row" spacing={2}>
                <Box component="a" href="#" sx={{ fontSize: 24, textDecoration: 'none' }}>📘</Box>
                <Box component="a" href="#" sx={{ fontSize: 24, textDecoration: 'none' }}>📷</Box>
                <Box component="a" href="#" sx={{ fontSize: 24, textDecoration: 'none' }}>🐦</Box>
                <Box component="a" href="#" sx={{ fontSize: 24, textDecoration: 'none' }}>💼</Box>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: 1, borderColor: 'grey.800', mt: 4, pt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="grey.400">
              {t('footer.copyright')}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Collapsible Image Gallery Section */}
      <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            {t('gallery.inspiration')}
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
            {t('gallery.inspirationSubtitle')}
          </Typography>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2,
            '& img': {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 1,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)'
              }
            }
          }}>
            {/* Row 1 */}
            <Box sx={{ gridRow: { xs: '1', sm: '1 / span 2', md: '1 / span 2' }, gridColumn: { xs: '1', sm: '1', md: '1 / span 2' } }}>
              <img 
                src="https://images.unsplash.com/photo-1485462537746-965f33f7d6a4?q=85&auto=format&fit=crop&w=1000&h=1200" 
                alt="Sustainable fashion look 1"
                loading="lazy"
              />
            </Box>
            <Box>
              <img 
                src="https://images.unsplash.com/photo-1485462537746-965f33f7d6a4?q=85&auto=format&fit=crop&w=800&h=800" 
                alt="Sustainable fashion look 2"
                loading="lazy"
              />
            </Box>
            
            {/* Row 2 */}
            <Box>
              <img 
                src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=85&auto=format&fit=crop&w=800&h=800" 
                alt="Sustainable fashion look 3"
                loading="lazy"
              />
            </Box>
            <Box sx={{ gridColumn: { xs: '1', sm: '1', md: '2 / span 2' } }}>
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=85&auto=format&fit=crop&w=1200&h=800" 
                alt="Sustainable fashion look 4"
                loading="lazy"
              />
            </Box>
            
            {/* Row 3 */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <img 
                src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=85&auto=format&fit=crop&w=800&h=1000" 
                alt="Sustainable fashion look 5"
                loading="lazy"
              />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <img 
                src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=85&auto=format&fit=crop&w=800&h=1000" 
                alt="Sustainable fashion look 6"
                loading="lazy"
              />
            </Box>
          </Box>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => {
                // Toggle between showing more/less images
                const gallery = document.querySelector('.gallery-grid');
                if (gallery) {
                  gallery.classList.toggle('expanded');
                }
              }}
              sx={{ 
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText'
                }
              }}
            >
              {t('gallery.showMore')}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;