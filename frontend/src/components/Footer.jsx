import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../data/staticData';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <Box sx={{ background: '#0F172A', color: '#94A3B8', mt: 8, pb: { xs: 10, md: 4 } }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: '10px',
                background: 'linear-gradient(135deg, #1E3A8A, #FF4D4D)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FlashOnIcon sx={{ color: '#fff', fontSize: 20 }} />
              </Box>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800 }}>FixNanba</Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{t('footer.tagline')}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>📞 1800-FIX-NANBA</Typography>
            <Typography variant="body2">📧 help@fixnanba.com</Typography>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>
              {t('footer.services')}
            </Typography>
            {CATEGORIES.slice(0, 4).map(cat => (
              <Typography key={cat.id} variant="body2" sx={{ mb: 1, cursor: 'pointer', '&:hover': { color: '#fff' } }}>
                {cat.icon} {t(`categories.${cat.id}`)}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>
              {t('footer.company')}
            </Typography>
            {['about', 'careers', 'blog', 'privacy', 'terms'].map(key => (
              <Typography key={key} variant="body2" sx={{ mb: 1, cursor: 'pointer', '&:hover': { color: '#fff' } }}>
                {t(`footer.${key}`)}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>
              Tamil Nadu Coverage
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 2 }}>
              Chennai · Coimbatore · Madurai · Salem · Erode · Tiruppur · Trichy · Vellore · Tirunelveli · Thanjavur
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption">© 2025 FixNanba. {t('footer.rights')}</Typography>
          <Typography variant="caption">Made with ❤️ for Tamil Nadu</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
