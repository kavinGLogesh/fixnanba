import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, InputAdornment, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLanguage } from '../context/LanguageContext';
import TechnicianCard from '../components/TechnicianCard';
import { SAMPLE_TECHNICIANS, DISTRICTS, CATEGORIES } from '../data/staticData';
import { getTechnicians } from '../services/api';

const TechniciansPage = () => {
  const { t } = useLanguage();
  const [technicians, setTechnicians] = useState(SAMPLE_TECHNICIANS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getTechnicians({ district: filterDistrict, category: filterCategory, search });
        setTechnicians(res.data?.technicians || SAMPLE_TECHNICIANS);
      } catch {
        // fallback to sample data
        setTechnicians(SAMPLE_TECHNICIANS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filterDistrict, filterCategory, search]);

  const filtered = technicians.filter(tech => {
    const q = search.toLowerCase();
    return (
      (!search || tech.name.toLowerCase().includes(q) || tech.district.toLowerCase().includes(q) || tech.shop_name.toLowerCase().includes(q)) &&
      (!filterDistrict || tech.district === filterDistrict) &&
      (!filterCategory || tech.category === filterCategory)
    );
  });

  return (
    <Box>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #1E3A8A, #0F172A)', py: 6, color: '#fff' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>{t('technicians.title')}</Typography>
          <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 560 }}>{t('technicians.subtitle')}</Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Search & Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <TextField
            placeholder={t('technicians.search')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{ flex: 1, minWidth: 240 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94A3B8' }} /></InputAdornment> }}
          />
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>{t('technicians.filter_district')}</InputLabel>
            <Select value={filterDistrict} label={t('technicians.filter_district')} onChange={e => setFilterDistrict(e.target.value)}>
              <MenuItem value="">{t('technicians.all_districts')}</MenuItem>
              {DISTRICTS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>{t('technicians.filter_category')}</InputLabel>
            <Select value={filterCategory} label={t('technicians.filter_category')} onChange={e => setFilterCategory(e.target.value)}>
              <MenuItem value="">{t('technicians.all_categories')}</MenuItem>
              {CATEGORIES.map(c => <MenuItem key={c.id} value={c.id}>{c.icon} {t(`categories.${c.id}`)}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>

        {/* Grid */}
        {loading ? (
          <Grid container spacing={3}>
            {[1,2,3,4,5,6].map(i => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rounded" height={280} sx={{ borderRadius: 3 }} />
              </Grid>
            ))}
          </Grid>
        ) : filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: '#94A3B8' }}>😕 {t('technicians.no_results')}</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filtered.map(tech => (
              <Grid item xs={12} sm={6} md={4} key={tech._id}>
                <TechnicianCard tech={tech} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default TechniciansPage;
