import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as ruJson from "./locale/ru.json";
import * as kgJson from "./locale/kg.json";
import * as enJson from "./locale/en.json";

const storeLang = localStorage.getItem("i18nextLogisticLang") || "ru";

i18n.use(initReactI18next).init({
  resources: {
    ru: { ...ruJson },
    kg: { ...kgJson },
    en: { ...enJson },
  },
  lng: storeLang,
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export const CustomChangeLanguage = (language: string) => {
  i18n.changeLanguage(language);
  localStorage.setItem("i18nextLogisticLang", language);
};
