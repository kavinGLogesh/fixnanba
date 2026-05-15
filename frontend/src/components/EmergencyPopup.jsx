import React from 'react';
import { Dialog, DialogContent, Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import { useLanguage } from '../context/LanguageContext';
import DangerLevelBadge from './DangerLevelBadge';

const EmergencyPopup = ({ open, onClose, diagnosis, technicians = [] }) => {
  const { lang, t } = useLanguage();
  if (!diagnosis) return null;

  const safetySteps = lang === 'ta' ? diagnosis.safety_ta : diagnosis.safety_en;
  const availableTechs = technicians.filter(t => t.availability).slice(0, 2);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
      PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden' } }}>
      {/* Red header */}
      <Box sx={{
        background: 'linear-gradient(135deg, #FF4D4D, #CC0000)',
        p: 3, textAlign: 'center',
        animation: 'emergencyPulse 1.5s infinite',
        '@keyframes emergencyPulse': {
          '0%, 100%': { background: 'linear-gradient(135deg, #FF4D4D, #CC0000)' },
          '50%': { background: 'linear-gradient(135deg, #CC0000, #FF4D4D)' },
        },
      }}>
        <WarningAmberIcon sx={{ fontSize: 48, color: '#fff', mb: 1 }} />
        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800 }}>
          {t('emergency.title')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', mt: 0.5 }}>
          {t('emergency.subtitle')}
        </Typography>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        {/* Danger level */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
          <DangerLevelBadge level={diagnosis.danger} />
        </Box>

        {/* Safety steps */}
        <Box sx={{ background: '#FFF5F5', borderRadius: 2, p: 2, mb: 2, border: '1px solid #FECACA' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#DC2626', mb: 1 }}>
            {t('diagnosis.safety')}
          </Typography>
          <List dense disablePadding>
            {safetySteps?.map((step, i) => (
              <ListItem key={i} disableGutters>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <CheckCircleIcon sx={{ fontSize: 16, color: '#DC2626' }} />
                </ListItemIcon>
                <ListItemText primary={step} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Cost estimate */}
        <Chip
          label={`${t('diagnosis.cost')}: ₹${diagnosis.cost_min} ${t('diagnosis.to')} ₹${diagnosis.cost_max}`}
          sx={{ background: '#EFF6FF', color: '#1E3A8A', fontWeight: 700, mb: 2, width: '100%', borderRadius: 2 }}
        />

        {/* Technicians */}
        {availableTechs.length > 0 && (
          <Box sx={{ mb: 2 }}>
            {availableTechs.map(tech => (
              <Box key={tech._id} sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                p: 2, background: '#F0FDF4', borderRadius: 2, mb: 1, border: '1px solid #BBF7D0',
              }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{tech.name}</Typography>
                  <Typography variant="caption" sx={{ color: '#64748B' }}>{tech.shop_name}</Typography>
                </Box>
                <Button variant="contained" color="success" size="small"
                  startIcon={<PhoneIcon />} href={`tel:${tech.phone}`}
                  sx={{ borderRadius: 2, whiteSpace: 'nowrap' }}>
                  {t('emergency.call_now')}
                </Button>
              </Box>
            ))}
          </Box>
        )}

        <Button variant="outlined" fullWidth onClick={onClose}
          sx={{ borderRadius: 2, py: 1.5, borderColor: '#22C55E', color: '#22C55E', fontWeight: 700 }}>
          ✅ {t('emergency.close')}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyPopup;
