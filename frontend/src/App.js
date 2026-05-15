import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import TechniciansPage from './pages/TechniciansPage';
import EmergencyPage from './pages/EmergencyPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
              <Route path="/services" element={<MainLayout><ServicesPage /></MainLayout>} />
              <Route path="/technicians" element={<MainLayout><TechniciansPage /></MainLayout>} />
              <Route path="/emergency" element={<MainLayout><EmergencyPage /></MainLayout>} />
              <Route path="/admin/login" element={<MainLayout><AdminLoginPage /></MainLayout>} />
              <Route path="/admin" element={<MainLayout><AdminPanel /></MainLayout>} />
              {/* SEO-friendly routes */}
              <Route path="/electrician/:district" element={<MainLayout><TechniciansPage /></MainLayout>} />
              <Route path="/plumber/:district" element={<MainLayout><TechniciansPage /></MainLayout>} />
              <Route path="/cctv-repair/:district" element={<MainLayout><TechniciansPage /></MainLayout>} />
              <Route path="/ac-repair/:district" element={<MainLayout><TechniciansPage /></MainLayout>} />
              <Route path="/pest-control/:district" element={<MainLayout><TechniciansPage /></MainLayout>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
