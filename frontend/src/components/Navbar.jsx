import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useLanguage();
  const { isAdmin, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.services'), path: '/services' },
    { label: t('nav.technicians'), path: '/technicians' },
  ];

  return (
    <AppBar position="sticky" elevation={0} sx={{
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(30,58,138,0.08)',
    }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Logo */}
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}>
          <Box sx={{
            width: 38, height: 38, borderRadius: '10px',
            background: 'linear-gradient(135deg, #1E3A8A, #FF4D4D)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FlashOnIcon sx={{ color: '#fff', fontSize: 22 }} />
          </Box>
          <Box>
            <Box sx={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E3A8A', lineHeight: 1 }}>FixNanba</Box>
            <Box sx={{ fontSize: '0.6rem', color: '#64748B', letterSpacing: '0.08em' }}>EMERGENCY REPAIRS</Box>
          </Box>
        </Box>

        {/* Desktop Nav */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {navLinks.map((link) => (
              <Button key={link.path} component={Link} to={link.path}
                sx={{ color: '#1E3A8A', fontWeight: 600, '&:hover': { background: 'rgba(30,58,138,0.06)' } }}>
                {link.label}
              </Button>
            ))}
            {isAdmin && (
              <>
                <Button component={Link} to="/admin"
                  sx={{ color: '#1E3A8A', fontWeight: 600 }}>
                  {t('nav.admin')}
                </Button>
                <Button onClick={() => { logout(); navigate('/'); }} variant="outlined" color="error" size="small">
                  {t('auth.logout')}
                </Button>
              </>
            )}
            {!isAdmin && (
              <Button component={Link} to="/admin/login"
                sx={{ color: '#475569', fontWeight: 600 }}>
                {t('nav.login')}
              </Button>
            )}
            <LanguageSwitcher />
            <Button variant="contained" color="error" component={Link} to="/emergency"
              sx={{ ml: 1, animation: 'pulse 2s infinite' }}>
              🆘 {t('emergency.help')}
            </Button>
          </Box>
        )}

        {/* Mobile */}
        {isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LanguageSwitcher />
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#1E3A8A' }}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, p: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E3A8A' }}>FixNanba</Box>
          <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.path} component={Link} to={link.path}
              onClick={() => setDrawerOpen(false)}
              sx={{ borderRadius: 2, mb: 0.5, '&:hover': { background: 'rgba(30,58,138,0.06)' } }}>
              <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 600, color: '#1E3A8A' }} />
            </ListItem>
          ))}
          {isAdmin && (
            <ListItem component={Link} to="/admin" onClick={() => setDrawerOpen(false)}
              sx={{ borderRadius: 2, mb: 0.5 }}>
              <ListItemText primary={t('nav.admin')} primaryTypographyProps={{ fontWeight: 600, color: '#1E3A8A' }} />
            </ListItem>
          )}
        </List>
        <Button variant="contained" color="error" fullWidth component={Link} to="/emergency"
          onClick={() => setDrawerOpen(false)} sx={{ mt: 2 }}>
          🆘 {t('emergency.help')}
        </Button>
      </Drawer>

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255,77,77,0.4); }
          70% { box-shadow: 0 0 0 8px rgba(255,77,77,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,77,77,0); }
        }
      `}</style>
    </AppBar>
  );
};

export default Navbar;
