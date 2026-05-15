import React from 'react';
import { Card, CardActionArea, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const CategoryCard = ({ category }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <Card sx={{
      borderRadius: 3,
      border: '1.5px solid transparent',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-6px)',
        borderColor: category.color,
        boxShadow: `0 16px 48px ${category.color}30`,
      },
    }}>
      <CardActionArea onClick={() => navigate(`/services?cat=${category.id}`)} sx={{ p: 3 }}>
        <Box sx={{
          width: 56, height: 56, borderRadius: 2.5,
          background: category.bgColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.8rem', mb: 2,
        }}>
          {category.icon}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
          {t(`categories.${category.id}`)}
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.5 }}>
          {t(`categories.${category.id}_desc`)}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
