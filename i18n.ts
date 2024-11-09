import "intl-pluralrules";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useLanguageStore } from "@/stores/languageStore";

const resources = {
  uk: {
    translation: {
      emptyList: "Список порожній",
      cancel: "Скасувати",
      delete: "Видалити",
      close: "Закрити",
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
      languageSettings: "Sprache / Мова",
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
    financialModel: {
      detailsModalTitle: "Фінансова модель",
      updated: "Дані оновлено",
      workingDaysPerMonth: "Робочі дні в місяць",
      workingDaysPerWeek: "Робочі дні в тиждень",
      clientsNumberPerDay: "Кількість клієнтів на день",
      hoursNumberPerClient: "Кількість годин на одного клієнта",
      expectedMonthlyProfit: "Орієнтований прибуток",
      calculations: "Розрахунки",
      expectedYearlyProfit: "Орієнтований річний прибуток",
      yearlyExpenses: "Річні витрати",
      averageExpensesPerClient: "Середні витрати на одного клієнта",
      averageExpensesPerDay: "Середні витрати за один день",
      averageExpensesPerHour: "Середні витрати за одну годину",
      totalWorkingDays: "Загальна кількість робочих днів",
      averageWorkingDaysPerWeek: "Середня кількість робочих днів на тиждень",
      averageClientsNumberPerDay: "Середня кількість клієнтів на день",
      averageHoursNumberPerClient: "Середня кількість годин на одного клієнта",
      averageDailyClientHours:
        "Середня кількість годин на одного клієнта в день",
      averageClientsNumberPerWeek: "Середня кількість клієнтів на тиждень",
      totalClientsNumberPerMonth: "Загальна кількість клієнтів в місяць",
      totalMonthlyClientHours: "Загальна кількість годин в місяць",
      averageMonthlyCostPrice: "Середня собівартість матеріалу в місяць",

      month: "Місяць",
      totalDailyClientHours: "Загальна кількість годин на день",
      clientsNumberPerWeek: "Кількість клієнтів на тиждень",
      clientsNumberPerMonth: "Кількість клієнтів на місяць",
      hoursNumberPerMonth: "Кількість годин на місяць",
      monthlyCostPrice: "Собівартість матеріалу",
      expenses: "Витрати",
      totalExpenses: "Загальні витрати",
      totalExpensesPerClient: "Витрати на одного клієнта",
      totalDailyExpenses: "Витрати за один день",
      totalHourlyExpenses: "Витрати за одну годину",
      profit: "Прибуток",
      turnover: "Обсяг",
      expectedMonthlyTurnover: "Бажаний обсяг в місяць",
      actualMonthlyTurnover: "Фактичний обсяг в місяць",
      turnoverGoalMet: "Чи виконали мету на місяць",
      yes: "Так",
      no: "Ні",
      more: "більше",
      less: "менше",
    },
    priceFormation: {
      priceFormation: "Ціноутворення",
      costPricePerClient: "Собівартість матеріала на одного клієнта",
      expensesPerClient: "Витрати на одного клієнта",
      clientProfit: "Прибуток з клієнта",
      recommendedPrice: "Рекомендована вартість",
      scenario: "Сценарій, щоб краще бачити свою мету",
      expectedMonthlyTurnover: "Бажаний оборот в місяць",
      servicePrice: "Ціна вашої послуги",
      workingDaysPerMonth: "Кількість робочих днів в місяць",
      clientsNumberPerDay: "Кількість клієнтів на день",
      clientsNumberPerMonth: "Кількість клієнтів в місяць",
      requiredDailyTurnover: "Необхідний оборот за один день",
      totalDailyExpenses:
        "Загальні витрати на день виходячи з кількості робочих днів на місяць",
      totalCostPerClientPerDay: "Загальні витрати на день на одного клієнта",
      plannedDailyTurnover:
        "Ваш запланований оборот на день, виходячи з кількості робочих днів на місяць",
      plannedMonthlyTurnover:
        "Ваш запланований оборот на місяць виходячи з кількості робочих днів на місяць",
      dailyTurnoverDifference: "Різниця до мети в день",
      monthlyTurnoverDifference: "Різниця до мети в місяць",
      profit: "Прибуток",
      netProfitPerClient: "Прибуток з клієнта",
      netProfitPerDay: "Прибуток в день",
      netProfitPerMonth: "Прибуток в місяць",
    },
    languageSettings: {
      ukrainian: "Українська",
      german: "Німецька",
    },
    decemberMessage: {
      message: "Час робити річний звіт",
    },
    januaryMessage: {
      message: "Необхідно оновити застосунок",
    },
    months: {
      "1": "Січень",
      "2": "Лютий",
      "3": "Березень",
      "4": "Квітень",
      "5": "Травень",
      "6": "Червень",
      "7": "Липень",
      "8": "Серпень",
      "9": "Вересень",
      "10": "Жовтень",
      "11": "Листопад",
      "12": "Грудень",
    },
  },
  de: {
    translation: {
      emptyList: "Die Liste ist leer",
      cancel: "Stornieren",
      delete: "Löschen",
      close: "Schließen",
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
      languageSettings: "Мова / Sprache",
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
    financialModel: {
      detailsModalTitle: "Finanzmodell",
      updated: "Daten aktualisiert",
      workingDaysPerMonth: "Arbeitstage pro Monat",
      workingDaysPerWeek: "Arbeitstage pro Woche",
      clientsNumberPerDay: "Anzahl der Kunden pro Tag",
      hoursNumberPerClient: "Stundenzahl pro Kunde",
      expectedMonthlyProfit: "Erwarteter Monatsgewinn",
      calculations: "Berechnungen",
      expectedYearlyProfit: "Erwarteter Jahresgewinn",
      yearlyExpenses: "Jährliche Ausgaben",
      averageExpensesPerClient: "Durchschnittliche Ausgaben pro Kunde",
      averageExpensesPerDay: "Durchschnittliche Ausgaben pro Tag",
      averageExpensesPerHour: "Durchschnittliche Ausgaben pro Stunde",
      totalWorkingDays: "Gesamtzahl der Arbeitstage",
      averageWorkingDaysPerWeek: "Durchschnittliche Arbeitstage pro Woche",
      averageClientsNumberPerDay: "Durchschnittliche Anzahl der Kunden pro Tag",
      averageHoursNumberPerClient: "Durchschnittliche Stundenzahl pro Kunde",
      averageDailyClientHours: "Durchschnittliche tägliche Kundenstunden",
      averageClientsNumberPerWeek:
        "Durchschnittliche Anzahl der Kunden pro Woche",
      totalClientsNumberPerMonth: "Gesamtzahl der Kunden pro Monat",
      totalMonthlyClientHours: "Gesamtzahl der Kundenstunden pro Monat",
      averageMonthlyCostPrice:
        "Durchschnittlicher monatlicher Selbstkostenpreis",

      month: "Monat",
      totalDailyClientHours: "Gesamtstunden pro Tag",
      clientsNumberPerWeek: "Anzahl der Kunden pro Woche",
      clientsNumberPerMonth: "Anzahl der Kunden pro Monat",
      hoursNumberPerMonth: "Stundenzahl pro Monat",
      monthlyCostPrice: "Monatlicher Selbstkostenpreis",
      expenses: "Ausgaben",
      totalExpenses: "Gesamtausgaben",
      totalExpensesPerClient: "Gesamtausgaben pro Kunde",
      totalDailyExpenses: "Gesamtausgaben pro Tag",
      totalHourlyExpenses: "Gesamtausgaben pro Stunde",
      profit: "Gewinn",
      turnover: "Umsatz",
      expectedMonthlyTurnover: "Erwarteter Monatsumsatz",
      actualMonthlyTurnover: "Tatsächlicher Monatsumsatz",
      turnoverGoalMet: "Monatsziel erreicht",
      yes: "Ja",
      no: "Nein",
      more: "mehr",
      less: "weniger",
    },
    priceFormation: {
      priceFormation: "Preisbildung",
      costPricePerClient: "Selbstkostenpreis pro Kunde",
      expensesPerClient: "Ausgaben pro Kunde",
      clientProfit: "Gewinn pro Kunde",
      recommendedPrice: "Empfohlener Preis",
      scenario: "Szenario, um Ihr Ziel besser zu sehen",
      expectedMonthlyTurnover: "Erwarteter Monatsumsatz",
      servicePrice: "Preis Ihrer Dienstleistung",
      workingDaysPerMonth: "Arbeitstage pro Monat",
      clientsNumberPerDay: "Anzahl der Kunden pro Tag",
      clientsNumberPerMonth: "Anzahl der Kunden pro Monat",
      requiredDailyTurnover: "Erforderlicher Tagesumsatz",
      totalDailyExpenses:
        "Gesamtausgaben pro Tag basierend auf der Anzahl der Arbeitstage pro Monat",
      totalCostPerClientPerDay: "Gesamtkosten pro Tag pro Kunde",
      plannedDailyTurnover:
        "Geplanter Tagesumsatz basierend auf der Anzahl der Arbeitstage pro Monat",
      plannedMonthlyTurnover:
        "Geplanter Monatsumsatz basierend auf der Anzahl der Arbeitstage pro Monat",
      dailyTurnoverDifference: "Tagesumsatzdifferenz zum Ziel",
      monthlyTurnoverDifference: "Monatsumsatzdifferenz zum Ziel",
      profit: "Gewinn",
      netProfitPerClient: "Nettogewinn pro Kunde",
      netProfitPerDay: "Nettogewinn pro Tag",
      netProfitPerMonth: "Nettogewinn pro Monat",
    },
    languageSettings: {
      ukrainian: "Ukrainisch",
      german: "Deutsch",
    },
    decemberMessage: {
      message: "Es ist Zeit für den Jahresbericht",
    },
    januaryMessage: {
      message: "Es ist Zeit für ein Update der Anwendung",
    },
    months: {
      "1": "Januar",
      "2": "Februar",
      "3": "März",
      "4": "April",
      "5": "Mai",
      "6": "Juni",
      "7": "Juli",
      "8": "August",
      "9": "September",
      "10": "Oktober",
      "11": "November",
      "12": "Dezember",
    },
  },
};

const savedLanguage = useLanguageStore.getState().language;
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
