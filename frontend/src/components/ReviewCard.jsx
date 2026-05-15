import React from 'react';
import { Card, CardContent, Box, Typography, Rating, Avatar } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

const ReviewCard = ({ review }) => {
  const { lang } = useLanguage();
  const text = lang === 'ta' ? review.text_ta : review.text_en;
  const initials = review.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card sx={{
      borderRadius: 3, height: '100%',
      transition: 'all 0.3s',
      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 16px 40px rgba(0,0,0,0.1)' },
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Avatar sx={{ background: 'linear-gradient(135deg, #1E3A8A, #3B5FD4)', fontWeight: 700 }}>
            {initials}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{review.name}</Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8' }}>{review.district}</Typography>
          </Box>
        </Box>
        <Rating value={review.rating} readOnly size="small" sx={{ mb: 1.5 }} />
        <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, fontStyle: 'italic' }}>
          "{text}"
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
