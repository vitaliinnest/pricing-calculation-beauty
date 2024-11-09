import "intl-pluralrules";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { usePreferencesStore } from "@/stores/preferencesStore";

const resources = {
  uk: {
    translation: {
      cancel: "Скасувати",
      delete: "Видалити",
      deletionTitle: "Видалення",
      deletionMessage: "Ви впеврені, що хочете видалити?",
      add: "Додати",
      save: "Зберегти",
      name: "Назва",
      price: "Вартість",
      volume: "Обсяг",
      inputsSeparatorDefaultTitle: "Підрахунки",
      totalPricePerClient: "Сумарна ціна на одного клієнта",
      expenditurePerClient: "Витрата на клієнта",
      daysAmount: "Кількість днів",
      pricePerDay: "Ціна в день",
      pricePerClient: "Ціна на одного клієнта",
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
      added: "Інструмент додано",
      updated: "Інструмент оновлено",
      deleted: "Інструмент видалено",
      expenditurePerDay: "Витрати на день",
      clientsPerDay: "Кількість клієнтів на день",
    },
    equipmentWear: {
      detailsModalTitle: "Знос обладнання",
      addModalTitle: "Додавання зносу обладнання",
      added: "Обладнання додано",
      updated: "Обладнання оновлено",
      deleted: "Обладнання видалено",
      serviceLifeInDays: "Строк експлуатації в днях",
      averageClientsNumberPerDay: "Середня кількість клієнтів на день",
      enterNumber: "Введіть число",
    },
    costPrice: {
      detailsModalTitle: "Собівартість",
      addModalTitle: "Додавання собівартості",
      added: "Собівартість додано",
      updated: "Собівартість оновлено",
      deleted: "Собівартість видалено",
      totalClients: "Усього клієнтів",
    },
    expenses: {
      detailsModalTitle: "Витрата",
      addModalTitle: "Додавання витрати",
      updated: "Витрата оновлена",
      added: "Витрата додана",
      deleted: "Витрата видалена",
      totalPrice: "Сумарна ціна за рік",
    },
    financialModelMonth: {
      detailsModalTitle: "Фінансова модель",
    },
  },
  de: {
    translation: {
      cancel: "Stornieren",
      delete: "Löschen",
      deletionTitle: "Löschen",
      deletionMessage: "Möchten Sie wirklich löschen?",
      save: "Speichern",
      add: "Hinzufügen",
      name: "Bezeichnung",
      price: "Preis",
      volume: "Volumen",
      inputsSeparatorDefaultTitle: "Berechnungen",
      totalPricePerClient: "Gesamtpreis pro Kunde",
      expenditurePerClient: "Kosten pro Kunde",
      daysAmount: "Anzahl der Tage",
      pricePerDay: "Preis pro Tag",
      pricePerClient: "Preis pro Kunde",
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
      added: "Werkzeugbearbeitung hinzugefügt",
      updated: "Werkzeugbearbeitung aktualisiert",
      deleted: "Werkzeugbearbeitung gelöscht",
      expenditurePerDay: "Kosten pro Tag",
      clientsPerDay: "Anzahl der Kunden pro Tag",
    },
    equipmentWear: {
      detailsModalTitle: "Ausrüstungsverschleiß",
      addModalTitle: "Ausrüstungsverschleiß hinzufügen",
      added: "Ausrüstungsverschleiß hinzugefügt",
      updated: "Ausrüstungsverschleiß aktualisiert",
      deleted: "Ausrüstungsverschleiß gelöscht",
      serviceLifeInDays: "Lebensdauer in Tagen",
      averageClientsNumberPerDay: "Durchschnittliche Anzahl der Kunden pro Tag",
      enterNumber: "Geben Sie eine Zahl ein",
    },
    costPrice: {
      detailsModalTitle: "Selbstkosten",
      addModalTitle: "Selbstkosten hinzufügen",
      added: "Selbstkosten hinzugefügt",
      updated: "Selbstkosten aktualisiert",
      deleted: "Selbstkosten gelöscht",
      totalClients: "Gesamtzahl der Kunden",
    },
    expenses: {
      detailsModalTitle: "Kosten",
      addModalTitle: "Kosten hinzufügen",
      updated: "Kosten aktualisiert",
      added: "Kosten hinzugefügt",
      deleted: "Kosten gelöscht",
      totalPrice: "Gesamtpreis pro Jahr",
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
