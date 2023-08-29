import { createContext, useState } from "react";

const LanguagesContext = createContext();

const LanguagesProvider = ({ children }) => {
  // False = en //// True = es
  const [languageInBoolean, setLanguageInBoolean] = useState(false);

  const receiveData = {
    languageInBoolean,
    setLanguageInBoolean,
  };
  return (
    <LanguagesContext.Provider value={receiveData}>
      {children}
    </LanguagesContext.Provider>
  );
};

export { LanguagesProvider };
export default LanguagesContext;
