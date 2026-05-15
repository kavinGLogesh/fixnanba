import React, { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { adminLogin } from '../services/api';

const AdminLoginPage = () => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await adminLogin(form);
      login(res.data.access_token);
      navigate('/admin');
    } catch (err) {
      // Demo fallback: allow admin/admin123
      if (form.username === 'admin' && form.password === 'admin123') {
        login('demo-token-fixnanba');
        navigate('/admin');
      } else {
        setError(t('auth.error'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #F0F4FF, #EEF2FF)' }}>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={{ p: 5, borderRadius: 4, border: '1px solid rgba(30,58,138,0.1)', textAlign: 'center' }}>
          <Box sx={{
            width: 64, height: 64, borderRadius: '18px',
            background: 'linear-gradient(135deg, #1E3A8A, #3B5FD4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3,
          }}>
            <LockIcon sx={{ color: '#fff', fontSize: 28 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>{t('auth.login')}</Typography>
          <Typography variant="body2" sx={{ color: '#64748B', mb: 3 }}>FixNanba Admin Panel</Typography>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField fullWidth label={t('auth.username')} value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              sx={{ mb: 2 }} required />
            <TextField fullWidth label={t('auth.password')} type="password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              sx={{ mb: 3 }} required />
            <Button variant="contained" type="submit" fullWidth size="large"
              disabled={loading} sx={{ py: 1.8, borderRadius: 3 }}>
              {loading ? <CircularProgress size={24} color="inherit" /> : t('auth.sign_in')}
            </Button>
          </Box>
          <Typography variant="caption" sx={{ color: '#94A3B8', mt: 2, display: 'block' }}>
            Demo: admin / admin123
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLoginPage;
