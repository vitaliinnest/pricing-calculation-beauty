import "intl-pluralrules";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { usePreferencesStore } from "@/stores/preferencesStore";

const resources = {
  uk: {
    translation: {

    },
  },
  de: {
    translation: {

    },
  },
};

const savedLanguage = usePreferencesStore.getState().language;
const defaultLanguage = "uk";
const language = savedLanguage ?? defaultLanguage;

i18n.use(initReactI18next).init({
  resources,
  lng: language,
  fallbackLng: defaultLanguage,
  fallbackNS: "translation",
  interpolation: {
    escapeValue: false,
  },
  // debug: true,
});

export default i18n;
