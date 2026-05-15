import React, { createContext, useContext, useState } from 'react';
import en from '../i18n/en.json';
import ta from '../i18n/ta.json';

const translations = { en, ta };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('fixnanba_lang') || 'en');

  const switchLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('fixnanba_lang', newLang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) {
      val = val?.[k];
    }
    return val || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
