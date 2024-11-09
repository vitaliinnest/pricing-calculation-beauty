import React from 'react';
import { useLanguageStore } from "@/stores/languageStore";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function LanguageSettingsPage() {
  const { t, i18n } = useTranslation("languageSettings");
  const { language, changeLanguage } = useLanguageStore();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          language === "uk" && styles.selectedButton,
        ]}
        onPress={() => handleLanguageChange("uk")}
      >
        <Text style={styles.buttonText}>{t("ukrainian")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          language === "de" && styles.selectedButton,
        ]}
        onPress={() => handleLanguageChange("de")}
      >
        <Text style={styles.buttonText}>{t("german")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});