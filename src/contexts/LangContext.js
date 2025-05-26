// src/context/LangContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../utils/i18n";

const LangContext = createContext(null);

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem("lang");
    return stored || "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const currentTranslation = translations[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, currentTranslation }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang debe usarse dentro de LangProvider");
  }
  return context;
};
