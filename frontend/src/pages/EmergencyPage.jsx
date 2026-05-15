import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button, MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLanguage } from '../context/LanguageContext';
import TechnicianCard from '../components/TechnicianCard';
import { CATEGORIES, DISTRICTS, DIAGNOSIS_DATA, SAMPLE_TECHNICIANS } from '../data/staticData';
import DangerLevelBadge from '../components/DangerLevelBadge';

const EmergencyPage = () => {
  const { lang, t } = useLanguage();
  const [category, setCategory] = useState('');
  const [district, setDistrict] = useState('');
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState(null);

  const problems = category && DIAGNOSIS_DATA[category] ? DIAGNOSIS_DATA[category].problems : [];

  const nearbyTechs = SAMPLE_TECHNICIANS.filter(t =>
    (!category || t.category === category) &&
    (!district || t.district === district)
  ).slice(0, 3);

  const handleDiagnose = () => {
    const diag = problems.find(p => p.id === problem);
    if (diag) setResult(diag);
  };

  return (
    <Box>
      {/* Emergency header */}
      <Box sx={{
        background: 'linear-gradient(135deg, #7F1D1D, #FF4D4D)',
        py: 6, color: '#fff', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', inset: 0, animation: 'emergBg 2s infinite alternate', opacity: 0.1,
          '@keyframes emergBg': { from: { background: '#FF4D4D' }, to: { background: '#7F1D1D' } } }} />
        <WarningAmberIcon sx={{ fontSize: 64, mb: 2, filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' }} />
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>{t('emergency.title')}</Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>{t('emergency.subtitle')}</Typography>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" size="large" href="tel:1800349366" startIcon={<PhoneIcon />}
            sx={{ background: '#fff', color: '#FF4D4D', fontWeight: 800, borderRadius: 3, py: 1.8, px: 4,
              '&:hover': { background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' } }}>
            📞 1800-FIX-NANBA
          </Button>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Diagnosis form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '2px solid #FECACA' }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#DC2626' }}>
                🔍 {t('diagnosis.title')}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>{t('diagnosis.district_label')}</InputLabel>
                    <Select value={district} label={t('diagnosis.district_label')} onChange={e => setDistrict(e.target.value)}>
                      {DISTRICTS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>{t('diagnosis.category_label')}</InputLabel>
                    <Select value={category} label={t('diagnosis.category_label')} onChange={e => { setCategory(e.target.value); setProblem(''); setResult(null); }}>
                      {CATEGORIES.map(c => <MenuItem key={c.id} value={c.id}>{c.icon} {t(`categories.${c.id}`)}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth disabled={!category}>
                    <InputLabel>{t('diagnosis.problem_label')}</InputLabel>
                    <Select value={problem} label={t('diagnosis.problem_label')} onChange={e => { setProblem(e.target.value); setResult(null); }}>
                      {problems.map(p => (
                        <MenuItem key={p.id} value={p.id}>{lang === 'ta' ? p.label_ta : p.label_en}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="error" fullWidth size="large"
                    onClick={handleDiagnose} disabled={!district || !category || !problem}
                    sx={{ borderRadius: 3, py: 1.8 }}>
                    {t('diagnosis.diagnose')}
                  </Button>
                </Grid>
              </Grid>

              {result && (
                <Box sx={{ mt: 3, p: 3, background: '#FFF5F5', borderRadius: 3, border: '1px solid #FECACA' }}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                    <DangerLevelBadge level={result.danger} />
                  </Box>
                  <List dense disablePadding>
                    {(lang === 'ta' ? result.safety_ta : result.safety_en).map((s, i) => (
                      <ListItem key={i} disableGutters>
                        <ListItemIcon sx={{ minWidth: 24 }}><CheckCircleIcon sx={{ fontSize: 16, color: '#DC2626' }} /></ListItemIcon>
                        <ListItemText primary={s} primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 500 }} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Nearby technicians */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>{t('technicians.title')}</Typography>
            {nearbyTechs.length > 0 ? (
              nearbyTechs.map(tech => (
                <Box key={tech._id} sx={{ mb: 2 }}>
                  <TechnicianCard tech={tech} />
                </Box>
              ))
            ) : (
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, textAlign: 'center', border: '1px dashed #CBD5E1' }}>
                <Typography sx={{ color: '#94A3B8' }}>Select district and category to find nearby technicians</Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EmergencyPage;
