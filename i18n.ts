import "intl-pluralrules";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { usePreferencesStore } from "@/stores/preferencesStore";

const resources = {
  uk: {
    translation: {
      cancel: "Скасувати",
      delete: "Видалити",
      save: "Зберегти",
    },
    drawerLayout: {
      financialModel: "Фінансова модель",
      toolProcessing: "Обробка інструментів",
      equipmentWear: "Знос обладнання",
      costPrice: "Собівартість",
      expenses: "Витрати",
      priceFormation: "Ціноутворення",
    },
    toolProcessing: {
      detailsModalTitle: "Обробка інструменту",
      addModalTitle: "Додавання обробки інструменту",
    },
    equipmentWear: {
      detailsModalTitle: "Знос обладнання",
      addModalTitle: "Додавання зносу обладнання",
    },
    costPrice: {
      detailsModalTitle: "Собівартість",
      addModalTitle: "Додавання собівартості",
    },
    expenses: {
      detailsModalTitle: "Витрата",
      addModalTitle: "Додавання витрати",
    },
    financialModelMonth: {
      detailsModalTitle: "Фінансова модель",
    },
  },
  de: {
    translation: {
      cancel: "Stornieren",
      delete: "Löschen",
      save: "Speichern",
    },
    drawerLayout: {
      financialModel: "Finanzmodell",
      toolProcessing: "Werkzeugbearbeitung",
      equipmentWear: "Ausrüstungsverschleiß",
      costPrice: "Selbstkosten",
      expenses: "Kosten",
      priceFormation: "Preisbildung",
    },
    toolProcessing: {
      detailsModalTitle: "Werkzeugbearbeitung",
      addModalTitle: "Werkzeugbearbeitung hinzufügen",
    },
    quipmentWear: {
      detailsModalTitle: "Ausrüstungsverschleiß",
      addModalTitle: "Ausrüstungsverschleiß hinzufügen",
    },
    costPrice: {
      detailsModalTitle: "Selbstkosten",
      addModalTitle: "Selbstkosten hinzufügen",
    },
    expenses: {
      detailsModalTitle: "Kosten",
      addModalTitle: "Kosten hinzufügen",
    },
    financialModelMonth: {
      detailsModalTitle: "Finanzmodell",
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
