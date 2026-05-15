import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SOSButton from '../components/SOSButton';
import MobileBottomNav from '../components/MobileBottomNav';

const MainLayout = ({ children }) => (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#F8FAFF' }}>
    <Navbar />
    <Box sx={{ flex: 1 }}>{children}</Box>
    <Footer />
    <SOSButton />
    <MobileBottomNav />
  </Box>
);

export default MainLayout;
