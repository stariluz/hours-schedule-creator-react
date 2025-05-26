// src/components/LanguageSwitcher.jsx
import { useLang } from "../../../contexts/LangContext";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { lang, setLang } = useLang();

  return (
    <select className="button btn-traslucid select" value={lang} onChange={(e) => setLang(e.target.value)}>
      <option className="select-option" value="en">English</option>
      <option className="select-option" value="es">Español</option>
    </select>
  );
};

export default LanguageSwitcher;
