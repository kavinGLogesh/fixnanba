import React from 'react';
import { Fab, Tooltip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const SOSButton = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Tooltip title={t('common.sos_title')} placement="left">
      <Box sx={{ position: 'fixed', bottom: { xs: 80, md: 32 }, right: 24, zIndex: 999 }}>
        <Fab
          onClick={() => navigate('/emergency')}
          sx={{
            background: 'linear-gradient(135deg, #FF4D4D, #CC0000)',
            color: '#fff', fontWeight: 900, fontSize: '1rem',
            width: 64, height: 64,
            animation: 'sosPulse 2s infinite',
            boxShadow: '0 8px 32px rgba(255,77,77,0.5)',
            '@keyframes sosPulse': {
              '0%, 100%': { transform: 'scale(1)', boxShadow: '0 8px 32px rgba(255,77,77,0.5)' },
              '50%': { transform: 'scale(1.08)', boxShadow: '0 12px 48px rgba(255,77,77,0.7)' },
            },
          }}>
          SOS
        </Fab>
      </Box>
    </Tooltip>
  );
};

export default SOSButton;
