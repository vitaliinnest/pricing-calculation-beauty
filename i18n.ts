import "intl-pluralrules";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { usePreferencesStore } from "@/stores/preferencesStore";

const resources = {
  uk: {
    translation: {

    },
    drawerLayout: {
      financialModel: "Фінансова модель",
      toolProcessing: "Обробка інструментів",
      equipmentWear: "Знос обладнання",
      costPrice: "Собівартість",
      expenses: "Витрати",
      priceFormation: "Ціноутворення",
    }
  },
  de: {
    translation: {

    },
    drawerLayout: {
      financialModel: "Finanzmodell",
      toolProcessing: "Werkzeugbearbeitung",
      equipmentWear: "Ausrüstungsverschleiß",
      costPrice: "Selbstkosten",
      expenses: "Kosten",
      priceFormation: "Preisbildung",
    }
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
