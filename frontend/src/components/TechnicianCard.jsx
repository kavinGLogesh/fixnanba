import React from 'react';
import { Card, CardContent, Box, Typography, Chip, Button, Avatar, Divider, Rating } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../data/staticData';

const TechnicianCard = ({ tech }) => {
  const { t } = useLanguage();
  const cat = CATEGORIES.find(c => c.id === tech.category);
  const initials = tech.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <Card sx={{
      borderRadius: 3, overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 20px 48px rgba(0,0,0,0.1)' },
    }}>
      {/* Top strip */}
      <Box sx={{ height: 6, background: tech.availability ? 'linear-gradient(90deg, #22C55E, #16A34A)' : '#94A3B8' }} />
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Avatar sx={{
            width: 60, height: 60, fontSize: '1.3rem', fontWeight: 700,
            background: `linear-gradient(135deg, ${cat?.color || '#1E3A8A'}, #1E3A8A)`,
          }}>{initials}</Avatar>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
                {tech.name}
              </Typography>
              {tech.verified && (
                <VerifiedIcon sx={{ fontSize: 18, color: '#1E3A8A' }} />
              )}
            </Box>
            <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>
              {tech.shop_name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <LocationOnIcon sx={{ fontSize: 14, color: '#94A3B8' }} />
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                {tech.district} · {tech.distance} {t('technicians.distance')}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Badges */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {tech.verified && (
            <Chip label={t('technicians.verified')} size="small" icon={<VerifiedIcon />}
              sx={{ background: '#EFF6FF', color: '#1E3A8A', fontWeight: 600, fontSize: '0.7rem' }} />
          )}
          <Chip
            label={tech.availability ? t('technicians.available') : t('technicians.unavailable')}
            size="small"
            sx={{
              background: tech.availability ? '#DCFCE7' : '#F1F5F9',
              color: tech.availability ? '#16A34A' : '#64748B',
              fontWeight: 600, fontSize: '0.7rem',
            }}
          />
          {cat && (
            <Chip label={t(`categories.${tech.category}`)} size="small"
              sx={{ background: cat.bgColor, color: cat.color, fontWeight: 600, fontSize: '0.7rem' }} />
          )}
        </Box>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Rating value={tech.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>{tech.rating}</Typography>
          <Typography variant="caption" sx={{ color: '#94A3B8' }}>({tech.reviews_count} {t('technicians.reviews')})</Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained" color="success" fullWidth startIcon={<PhoneIcon />}
            href={`tel:${tech.phone}`}
            sx={{ borderRadius: 2, py: 1.2, fontSize: '0.85rem', background: 'linear-gradient(135deg, #22C55E, #16A34A)' }}>
            {t('technicians.call')}
          </Button>
          <Button
            variant="outlined" fullWidth startIcon={<EmailIcon />}
            href={`mailto:${tech.email}`}
            sx={{ borderRadius: 2, py: 1.2, fontSize: '0.85rem', borderColor: '#1E3A8A', color: '#1E3A8A' }}>
            {t('technicians.email')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TechnicianCard;
