import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button, MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemIcon, ListItemText, Chip, Paper } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLanguage } from '../context/LanguageContext';
import CategoryCard from '../components/CategoryCard';
import DangerLevelBadge from '../components/DangerLevelBadge';
import EmergencyPopup from '../components/EmergencyPopup';
import { CATEGORIES, DISTRICTS, DIAGNOSIS_DATA, SAMPLE_TECHNICIANS } from '../data/staticData';

const ServicesPage = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState(searchParams.get('cat') || '');
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const problems = category && DIAGNOSIS_DATA[category] ? DIAGNOSIS_DATA[category].problems : [];

  const handleDiagnose = () => {
    const diag = problems.find(p => p.id === problem);
    if (diag) {
      setResult(diag);
      if (diag.danger === 'critical' || diag.danger === 'high') setPopupOpen(true);
    }
  };

  return (
    <Box>
      <Box sx={{ background: 'linear-gradient(135deg, #1E3A8A, #0F172A)', py: 6, color: '#fff' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>{t('diagnosis.title')}</Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>{t('diagnosis.subtitle')}</Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Category grid */}
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>{t('categories.title')}</Typography>
        <Grid container spacing={2} sx={{ mb: 6 }}>
          {CATEGORIES.map(cat => (
            <Grid item xs={6} sm={4} md={3} key={cat.id}>
              <Box onClick={() => { setCategory(cat.id); setProblem(''); setResult(null); }}
                sx={{
                  p: 2.5, borderRadius: 3, cursor: 'pointer', textAlign: 'center',
                  border: '2px solid', borderColor: category === cat.id ? cat.color : 'transparent',
                  background: category === cat.id ? cat.bgColor : '#fff',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: cat.color, background: cat.bgColor },
                }}>
                <Typography sx={{ fontSize: '2rem', mb: 0.5 }}>{cat.icon}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                  {t(`categories.${cat.id}`)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Diagnosis form */}
        {category && (
          <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: '1px solid rgba(30,58,138,0.1)', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              {CATEGORIES.find(c => c.id === category)?.icon} {t(`categories.${category}`)} — {t('diagnosis.title')}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>{t('diagnosis.district_label')}</InputLabel>
                  <Select value={district} label={t('diagnosis.district_label')} onChange={e => setDistrict(e.target.value)}>
                    {DISTRICTS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={!category}>
                  <InputLabel>{t('diagnosis.problem_label')}</InputLabel>
                  <Select value={problem} label={t('diagnosis.problem_label')} onChange={e => { setProblem(e.target.value); setResult(null); }}>
                    {problems.map(p => (
                      <MenuItem key={p.id} value={p.id}>
                        {lang === 'ta' ? p.label_ta : p.label_en}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" size="large" onClick={handleDiagnose}
                  disabled={!district || !problem}
                  sx={{ borderRadius: 3, py: 1.8 }}>
                  🔍 {t('diagnosis.diagnose')}
                </Button>
              </Grid>

              {result && (
                <Grid item xs={12}>
                  <Box sx={{ p: 3, borderRadius: 3, background: '#F8FAFF', border: '2px solid #1E3A8A' }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{t('diagnosis.danger')}:</Typography>
                      <DangerLevelBadge level={result.danger} />
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A8A', mb: 1 }}>{t('diagnosis.safety')}</Typography>
                    <List dense disablePadding sx={{ mb: 2 }}>
                      {(lang === 'ta' ? result.safety_ta : result.safety_en).map((s, i) => (
                        <ListItem key={i} disableGutters>
                          <ListItemIcon sx={{ minWidth: 24 }}><CheckCircleIcon sx={{ fontSize: 16, color: '#22C55E' }} /></ListItemIcon>
                          <ListItemText primary={s} primaryTypographyProps={{ fontSize: '0.875rem' }} />
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Chip label={`${t('diagnosis.cost')}: ₹${result.cost_min} ${t('diagnosis.to')} ₹${result.cost_max}`}
                        sx={{ background: '#EFF6FF', color: '#1E3A8A', fontWeight: 700 }} />
                      <Button variant="contained" endIcon={<ArrowForwardIcon />}
                        onClick={() => navigate('/technicians')} sx={{ borderRadius: 2 }}>
                        {t('diagnosis.find')}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>
        )}
      </Container>

      <EmergencyPopup
        open={popupOpen} onClose={() => setPopupOpen(false)}
        diagnosis={result}
        technicians={SAMPLE_TECHNICIANS.filter(t => t.category === category)}
      />
    </Box>
  );
};

export default ServicesPage;
