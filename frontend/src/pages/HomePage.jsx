import React, { useState } from 'react';
import {
  Box, Container, Typography, Button, Grid, Chip,
  MenuItem, Select, FormControl, InputLabel,
  List, ListItem, ListItemIcon, ListItemText, Paper, Skeleton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLanguage } from '../context/LanguageContext';
import CategoryCard from '../components/CategoryCard';
import ReviewCard from '../components/ReviewCard';
import DangerLevelBadge from '../components/DangerLevelBadge';
import EmergencyPopup from '../components/EmergencyPopup';
import { CATEGORIES, DISTRICTS, DIAGNOSIS_DATA, SAMPLE_REVIEWS, SAMPLE_TECHNICIANS } from '../data/staticData';

const STATS = [
  { value: '33', key: 'stat1' },
  { value: '2,400+', key: 'stat2' },
  { value: '18,000+', key: 'stat3' },
  { value: '<60 min', key: 'stat4' },
];

const SAFETY_TIPS = [
  { icon: '⚡', title_en: 'Electrical Fire', title_ta: 'மின் தீ', tip_en: 'Never use water on electrical fires. Use CO₂ or dry powder extinguisher and cut main power immediately.', tip_ta: 'மின் தீயில் தண்ணீர் பயன்படுத்தாதீர்கள். CO₂ அல்லது வறண்ட தூள் அணைப்பானை பயன்படுத்தவும்.' },
  { icon: '💧', title_en: 'Pipe Burst', title_ta: 'குழாய் வெடிப்பு', tip_en: 'Immediately close the main water valve. Keep electrical devices away from water and call a plumber.', tip_ta: 'உடனே மெயின் வாட்டர் வால்வை மூடவும். மின் சாதனங்களை தண்ணீரிலிருந்து விலக்கவும்.' },
  { icon: '🔥', title_en: 'Gas Leak', title_ta: 'எரிவாயு கசிவு', tip_en: 'Do not turn on any switches. Open all windows and doors. Leave the building and call emergency services.', tip_ta: 'எந்த சுவிட்சையும் போடாதீர்கள். அனைத்து ஜன்னல்களையும் திறக்கவும். கட்டடத்தை விட்டு வெளியே வரவும்.' },
  { icon: '🐛', title_en: 'Pest Emergency', title_ta: 'பூச்சி அவசரநிலை', tip_en: 'Keep food sealed. Do not use excessive DIY sprays. Contact a licensed pest control professional.', tip_ta: 'உணவை மூடி வையுங்கள். அதிக DIY ஸ்ப்ரேக்களை பயன்படுத்தாதீர்கள்.' },
];

const HomePage = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [district, setDistrict] = useState('');
  const [category, setCategory] = useState('');
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const problems = category && DIAGNOSIS_DATA[category]
    ? DIAGNOSIS_DATA[category].problems
    : [];

  const handleDiagnose = () => {
    if (!district || !category || !problem) return;
    const diag = problems.find(p => p.id === problem);
    if (diag) {
      setResult(diag);
      if (diag.danger === 'critical' || diag.danger === 'high') {
        setPopupOpen(true);
      }
    }
  };

  return (
    <Box>
      {/* HERO */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #1E40AF 100%)',
        color: '#fff', position: 'relative', overflow: 'hidden',
        py: { xs: 8, md: 12 }, pb: { xs: 12, md: 14 },
      }}>
        {/* bg orbs */}
        <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,77,77,0.1)', filter: 'blur(80px)' }} />
        <Box sx={{ position: 'absolute', bottom: -100, left: -100, width: 300, height: 300, borderRadius: '50%', background: 'rgba(59,95,212,0.2)', filter: 'blur(60px)' }} />

        <Container maxWidth="lg">
          <Chip label={t('hero.badge')} sx={{
            background: 'rgba(255,255,255,0.1)', color: '#fff', mb: 3,
            border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
            fontWeight: 600,
          }} />
          <Typography variant="h1" sx={{
            fontSize: { xs: '2.8rem', md: '4.5rem' },
            fontWeight: 900, lineHeight: 1.05, mb: 1,
          }}>
            {t('hero.title')}
          </Typography>
          <Typography variant="h1" sx={{
            fontSize: { xs: '2.8rem', md: '4.5rem' },
            fontWeight: 900, lineHeight: 1.05, mb: 3,
            background: 'linear-gradient(90deg, #FF4D4D, #FACC15)',
            backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {t('hero.title2')}
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 560, mb: 4, opacity: 0.85, fontWeight: 400, lineHeight: 1.7 }}>
            {t('hero.subtitle')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" color="error" size="large"
              onClick={() => navigate('/emergency')}
              startIcon={<BoltIcon />}
              sx={{ py: 1.8, px: 4, fontSize: '1.1rem', borderRadius: 3, animation: 'pulse 2s infinite' }}>
              {t('hero.cta')}
            </Button>
            <Button variant="outlined" size="large"
              onClick={() => navigate('/technicians')}
              endIcon={<ArrowForwardIcon />}
              sx={{ py: 1.8, px: 4, fontSize: '1.1rem', borderRadius: 3, borderColor: 'rgba(255,255,255,0.4)', color: '#fff', '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.1)' } }}>
              {t('hero.cta2')}
            </Button>
          </Box>

          {/* Stats */}
          <Grid container spacing={3} sx={{ mt: 6 }}>
            {STATS.map(stat => (
              <Grid item xs={6} md={3} key={stat.key}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: '#FACC15' }}>{stat.value}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75 }}>{t(`hero.${stat.key}`)}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        <style>{`@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255,77,77,0.4); } 70% { box-shadow: 0 0 0 12px rgba(255,77,77,0); } 100% { box-shadow: 0 0 0 0 rgba(255,77,77,0); } }`}</style>
      </Box>

      {/* CATEGORIES */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>{t('categories.title')}</Typography>
          <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 560, mx: 'auto' }}>{t('categories.subtitle')}</Typography>
        </Box>
        <Grid container spacing={3}>
          {CATEGORIES.map(cat => (
            <Grid item xs={6} sm={4} md={3} key={cat.id}>
              <CategoryCard category={cat} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* DIAGNOSIS SECTION */}
      <Box sx={{ background: 'linear-gradient(135deg, #F0F4FF, #EEF2FF)', py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>{t('diagnosis.title')}</Typography>
            <Typography variant="body1" sx={{ color: '#64748B' }}>{t('diagnosis.subtitle')}</Typography>
          </Box>

          <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: '1px solid rgba(30,58,138,0.1)' }}>
            <Grid container spacing={3}>
              {/* District */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>{t('diagnosis.district_label')}</InputLabel>
                  <Select value={district} label={t('diagnosis.district_label')} onChange={e => setDistrict(e.target.value)}>
                    {DISTRICTS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>

              {/* Category */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>{t('diagnosis.category_label')}</InputLabel>
                  <Select value={category} label={t('diagnosis.category_label')} onChange={e => { setCategory(e.target.value); setProblem(''); setResult(null); }}>
                    {CATEGORIES.map(c => <MenuItem key={c.id} value={c.id}>{c.icon} {t(`categories.${c.id}`)}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>

              {/* Problem */}
              <Grid item xs={12} md={4}>
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
                <Button variant="contained" fullWidth size="large"
                  onClick={handleDiagnose}
                  disabled={!district || !category || !problem}
                  sx={{ py: 1.8, borderRadius: 3, fontSize: '1.05rem' }}>
                  🔍 {t('diagnosis.diagnose')}
                </Button>
              </Grid>

              {/* Result */}
              {result && (
                <Grid item xs={12}>
                  <Box sx={{ p: 3, background: '#FFF', borderRadius: 3, border: '2px solid', borderColor: result.danger === 'critical' ? '#FF4D4D' : result.danger === 'high' ? '#FF7A00' : result.danger === 'medium' ? '#FACC15' : '#22C55E' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{t('diagnosis.danger')}:</Typography>
                      <DangerLevelBadge level={result.danger} />
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#1E3A8A' }}>{t('diagnosis.safety')}</Typography>
                    <List dense disablePadding sx={{ mb: 2 }}>
                      {(lang === 'ta' ? result.safety_ta : result.safety_en).map((s, i) => (
                        <ListItem key={i} disableGutters>
                          <ListItemIcon sx={{ minWidth: 24 }}><CheckCircleIcon sx={{ fontSize: 16, color: '#22C55E' }} /></ListItemIcon>
                          <ListItemText primary={s} primaryTypographyProps={{ fontSize: '0.875rem' }} />
                        </ListItem>
                      ))}
                    </List>
                    <Chip label={`${t('diagnosis.cost')}: ₹${result.cost_min} ${t('diagnosis.to')} ₹${result.cost_max}`}
                      sx={{ background: '#EFF6FF', color: '#1E3A8A', fontWeight: 700, mr: 1 }} />
                    <Button variant="contained" size="small" onClick={() => navigate('/technicians')} sx={{ borderRadius: 2 }}>
                      {t('diagnosis.find')}
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* REVIEWS */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>{t('reviews.title')}</Typography>
          <Typography variant="body1" sx={{ color: '#64748B' }}>{t('reviews.subtitle')}</Typography>
        </Box>
        <Grid container spacing={3}>
          {SAMPLE_REVIEWS.map(review => (
            <Grid item xs={12} md={4} key={review._id}>
              <ReviewCard review={review} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* SAFETY TIPS */}
      <Box sx={{ background: '#0F172A', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#fff', mb: 1 }}>{t('safety.title')}</Typography>
            <Typography variant="body1" sx={{ color: '#94A3B8' }}>{t('safety.subtitle')}</Typography>
          </Box>
          <Grid container spacing={3}>
            {SAFETY_TIPS.map((tip, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Box sx={{
                  p: 3, borderRadius: 3,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s',
                  '&:hover': { background: 'rgba(255,255,255,0.1)', transform: 'translateY(-4px)' },
                }}>
                  <Typography sx={{ fontSize: '2rem', mb: 1.5 }}>{tip.icon}</Typography>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
                    {lang === 'ta' ? tip.title_ta : tip.title_en}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94A3B8', lineHeight: 1.7 }}>
                    {lang === 'ta' ? tip.tip_ta : tip.tip_en}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Emergency popup for critical issues */}
      <EmergencyPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        diagnosis={result}
        technicians={SAMPLE_TECHNICIANS.filter(t => t.category === category)}
      />
    </Box>
  );
};

export default HomePage;
