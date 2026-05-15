import React from 'react';
import { Chip } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useLanguage } from '../context/LanguageContext';
import { DANGER_COLORS } from '../data/staticData';

const DangerLevelBadge = ({ level, size = 'medium' }) => {
  const { t } = useLanguage();
  const color = DANGER_COLORS[level] || '#22C55E';

  return (
    <Chip
      icon={<WarningAmberIcon sx={{ color: `${color} !important` }} />}
      label={t(`danger.${level}`)}
      size={size}
      sx={{
        background: `${color}20`,
        border: `1.5px solid ${color}`,
        color: color,
        fontWeight: 700,
        fontSize: size === 'small' ? '0.7rem' : '0.85rem',
        animation: level === 'critical' ? 'dangerPulse 1.5s infinite' : 'none',
        '@keyframes dangerPulse': {
          '0%, 100%': { boxShadow: `0 0 0 0 ${color}40` },
          '50%': { boxShadow: `0 0 0 8px ${color}00` },
        },
      }}
    />
  );
};

export default DangerLevelBadge;
