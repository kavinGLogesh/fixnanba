import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useLanguage();

  if (!isMobile) return null;

  const routes = ['/', '/services', '/technicians', '/emergency'];
  const current = routes.indexOf(location.pathname);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 998, borderRadius: '16px 16px 0 0', overflow: 'hidden' }} elevation={8}>
      <BottomNavigation value={current >= 0 ? current : 0} onChange={(_, val) => navigate(routes[val])}>
        <BottomNavigationAction label={t('nav.home')} icon={<HomeIcon />} />
        <BottomNavigationAction label={t('nav.services')} icon={<BuildIcon />} />
        <BottomNavigationAction label={t('nav.technicians')} icon={<PeopleIcon />} />
        <BottomNavigationAction label={t('emergency.help')} icon={<WarningAmberIcon />}
          sx={{ color: '#FF4D4D', '&.Mui-selected': { color: '#FF4D4D' } }} />
      </BottomNavigation>
    </Paper>
  );
};

export default MobileBottomNav;
