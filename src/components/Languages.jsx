import React, { useContext } from "react";
import "./Languages.css";
import LanguagesContext from "../context/LanguagesContext";

const Languages = () => {
  const { setLanguageInBoolean, languageInBoolean } = useContext(LanguagesContext);

  const storage = window.localStorage;
  const isChecked = JSON.parse(storage.getItem("language"));

  const handleLanguageChange = () => {
    const newLanguage = !languageInBoolean;
    setLanguageInBoolean(newLanguage);
    storage.setItem("language", JSON.stringify(newLanguage));
  };

  return (
    <div className="containerLanguages">
      <span className="en">EN</span>
      <input className="check" type="checkbox" checked={isChecked} onChange={handleLanguageChange} />
      <span className="es">ES</span>
    </div>
  );
};

export default Languages;
