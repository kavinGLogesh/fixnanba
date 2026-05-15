import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent, Button, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Chip,
  Tab, Tabs, Alert, Snackbar, Switch, FormControlLabel, MenuItem, Select, FormControl, InputLabel, Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getTechnicians, createTechnician, updateTechnician, deleteTechnician } from '../services/api';
import { SAMPLE_TECHNICIANS, DISTRICTS, CATEGORIES } from '../data/staticData';

const EMPTY_TECH = {
  name: '', shop_name: '', district: '', category: '', phone: '',
  email: '', address: '', rating: 4.5, verified: true, availability: true, distance: 1.0,
};

const AdminPanel = () => {
  const { t } = useLanguage();
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [technicians, setTechnicians] = useState(SAMPLE_TECHNICIANS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(EMPTY_TECH);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (!isAdmin) { navigate('/admin/login'); return; }
    loadTechnicians();
  }, [isAdmin]);

  const loadTechnicians = async () => {
    try {
      const res = await getTechnicians({});
      setTechnicians(res.data?.technicians || SAMPLE_TECHNICIANS);
    } catch {
      setTechnicians(SAMPLE_TECHNICIANS);
    }
  };

  const handleAdd = () => { setForm(EMPTY_TECH); setEditMode(false); setDialogOpen(true); };
  const handleEdit = (tech) => { setForm({ ...tech }); setEditMode(true); setDialogOpen(true); };

  const handleSave = async () => {
    try {
      if (editMode) {
        await updateTechnician(form._id, form);
        setTechnicians(prev => prev.map(t => t._id === form._id ? { ...form } : t));
        setSnack({ open: true, message: t('admin.success_update'), severity: 'success' });
      } else {
        const newTech = { ...form, _id: Date.now().toString(), reviews_count: 0 };
        await createTechnician(form);
        setTechnicians(prev => [...prev, newTech]);
        setSnack({ open: true, message: t('admin.success_add'), severity: 'success' });
      }
      setDialogOpen(false);
    } catch {
      // Optimistic update for demo
      if (editMode) {
        setTechnicians(prev => prev.map(t => t._id === form._id ? { ...form } : t));
        setSnack({ open: true, message: t('admin.success_update'), severity: 'success' });
      } else {
        setTechnicians(prev => [...prev, { ...form, _id: Date.now().toString(), reviews_count: 0 }]);
        setSnack({ open: true, message: t('admin.success_add'), severity: 'success' });
      }
      setDialogOpen(false);
    }
  };

  const handleDelete = async () => {
    try { await deleteTechnician(deleteDialog.id); } catch {}
    setTechnicians(prev => prev.filter(t => t._id !== deleteDialog.id));
    setDeleteDialog({ open: false, id: null });
    setSnack({ open: true, message: t('admin.success_delete'), severity: 'success' });
  };

  const stats = [
    { label: t('admin.technicians'), value: technicians.length, icon: <PeopleIcon />, color: '#1E3A8A' },
    { label: 'Available', value: technicians.filter(t => t.availability).length, icon: <BuildIcon />, color: '#22C55E' },
    { label: 'Verified', value: technicians.filter(t => t.verified).length, icon: <PeopleIcon />, color: '#FACC15' },
    { label: 'Districts', value: [...new Set(technicians.map(t => t.district))].length, icon: <BuildIcon />, color: '#FF4D4D' },
  ];

  return (
    <Box>
      <Box sx={{ background: 'linear-gradient(135deg, #0F172A, #1E3A8A)', py: 4, color: '#fff' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>{t('admin.title')}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>FixNanba Admin Dashboard</Typography>
            </Box>
            <Button variant="outlined" onClick={() => { logout(); navigate('/'); }}
              sx={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
              {t('auth.logout')}
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Card elevation={0} sx={{ border: '1px solid rgba(30,58,138,0.1)' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1.5, borderRadius: 2, background: `${stat.color}20`, color: stat.color }}>
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>{stat.value}</Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>{stat.label}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Technicians Table */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{t('admin.technicians')}</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd} sx={{ borderRadius: 2 }}>
            {t('admin.add')}
          </Button>
        </Box>

        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(30,58,138,0.1)' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: '#F8FAFF' }}>
                {['Name', 'Shop', 'District', 'Category', 'Phone', 'Rating', 'Status', 'Actions'].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 700, color: '#1E3A8A' }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {technicians.map(tech => (
                <TableRow key={tech._id} sx={{ '&:hover': { background: '#F8FAFF' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', background: '#1E3A8A' }}>
                        {tech.name[0]}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{tech.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell><Typography variant="body2">{tech.shop_name}</Typography></TableCell>
                  <TableCell><Typography variant="body2">{tech.district}</Typography></TableCell>
                  <TableCell>
                    <Chip label={tech.category} size="small" sx={{ fontWeight: 600, textTransform: 'capitalize' }} />
                  </TableCell>
                  <TableCell><Typography variant="body2">{tech.phone}</Typography></TableCell>
                  <TableCell><Typography variant="body2" sx={{ fontWeight: 700, color: '#FACC15' }}>⭐ {tech.rating}</Typography></TableCell>
                  <TableCell>
                    <Chip label={tech.availability ? t('technicians.available') : t('technicians.unavailable')}
                      size="small"
                      sx={{ background: tech.availability ? '#DCFCE7' : '#F1F5F9', color: tech.availability ? '#16A34A' : '#64748B', fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton size="small" onClick={() => handleEdit(tech)} sx={{ color: '#1E3A8A' }}><EditIcon fontSize="small" /></IconButton>
                      <IconButton size="small" onClick={() => setDeleteDialog({ open: true, id: tech._id })} sx={{ color: '#FF4D4D' }}><DeleteIcon fontSize="small" /></IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth
          PaperProps={{ sx: { borderRadius: 3 } }}>
          <DialogTitle sx={{ fontWeight: 700 }}>
            {editMode ? t('admin.edit') : t('admin.add')} {t('admin.technicians')}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              {[
                { field: 'name', label: 'Name' }, { field: 'shop_name', label: 'Shop Name' },
                { field: 'phone', label: 'Phone' }, { field: 'email', label: 'Email' },
                { field: 'address', label: 'Address' },
              ].map(({ field, label }) => (
                <Grid item xs={12} sm={6} key={field}>
                  <TextField fullWidth label={label} value={form[field] || ''}
                    onChange={e => setForm({ ...form, [field]: e.target.value })} size="small" />
                </Grid>
              ))}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>District</InputLabel>
                  <Select value={form.district || ''} label="District" onChange={e => setForm({ ...form, district: e.target.value })}>
                    {DISTRICTS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select value={form.category || ''} label="Category" onChange={e => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.map(c => <MenuItem key={c.id} value={c.id}>{c.icon} {c.id}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Rating (1-5)" type="number" size="small"
                  value={form.rating || ''} onChange={e => setForm({ ...form, rating: parseFloat(e.target.value) })}
                  inputProps={{ min: 1, max: 5, step: 0.1 }} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Distance (km)" type="number" size="small"
                  value={form.distance || ''} onChange={e => setForm({ ...form, distance: parseFloat(e.target.value) })} />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Switch checked={!!form.verified} onChange={e => setForm({ ...form, verified: e.target.checked })} />} label="Verified" />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel control={<Switch checked={!!form.availability} onChange={e => setForm({ ...form, availability: e.target.checked })} />} label="Available" />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 1 }}>
            <Button onClick={() => setDialogOpen(false)} variant="outlined" sx={{ borderRadius: 2 }}>{t('admin.cancel')}</Button>
            <Button onClick={handleSave} variant="contained" sx={{ borderRadius: 2 }}>{t('admin.save')}</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirm */}
        <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null })}
          PaperProps={{ sx: { borderRadius: 3, p: 1 } }}>
          <DialogTitle sx={{ fontWeight: 700 }}>⚠️ {t('admin.confirm_delete')}</DialogTitle>
          <DialogActions sx={{ gap: 1 }}>
            <Button onClick={() => setDeleteDialog({ open: false, id: null })} variant="outlined" sx={{ borderRadius: 2 }}>{t('admin.cancel')}</Button>
            <Button onClick={handleDelete} variant="contained" color="error" sx={{ borderRadius: 2 }}>{t('admin.delete')}</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}>
          <Alert severity={snack.severity} sx={{ borderRadius: 2 }}>{snack.message}</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default AdminPanel;
