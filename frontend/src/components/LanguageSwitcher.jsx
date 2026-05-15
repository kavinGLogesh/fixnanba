import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { lang, switchLang } = useLanguage();
  return (
    <ToggleButtonGroup value={lang} exclusive onChange={(_, v) => v && switchLang(v)} size="small"
      sx={{ border: '1px solid rgba(30,58,138,0.2)', borderRadius: 2, overflow: 'hidden' }}>
      <ToggleButton value="en" sx={{
        px: 1.5, py: 0.5, fontSize: '0.75rem', fontWeight: 700, border: 'none',
        '&.Mui-selected': { background: '#1E3A8A', color: '#fff' },
      }}>EN</ToggleButton>
      <ToggleButton value="ta" sx={{
        px: 1.5, py: 0.5, fontSize: '0.75rem', fontWeight: 700, border: 'none',
        fontFamily: '"Noto Sans Tamil", sans-serif',
        '&.Mui-selected': { background: '#1E3A8A', color: '#fff' },
      }}>தமிழ்</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageSwitcher;
