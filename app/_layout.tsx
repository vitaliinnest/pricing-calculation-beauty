import toastConfig from "@/toastConfig";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import "@/i18n";
import { useLanguageStore } from "@/stores/languageStore";
import DecemberMessage from "@/components/DecemberMessage";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const { t, i18n } = useTranslation();
  const { language } = useLanguageStore();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="tool-processing/[id]"
          options={{
            presentation: "modal",
            title: t("detailsModalTitle", { ns: "toolProcessing" }),
          }}
        />

        <Stack.Screen
          name="tool-processing/add"
          options={{
            presentation: "modal",
            title: t("addModalTitle", { ns: "toolProcessing" }),
          }}
        />

        <Stack.Screen
          name="equipment-wear/[id]"
          options={{
            presentation: "modal",
            title: t("detailsModalTitle", { ns: "equipmentWear" }),
          }}
        />

        <Stack.Screen
          name="equipment-wear/add"
          options={{
            presentation: "modal",
            title: t("addModalTitle", { ns: "equipmentWear" }),
          }}
        />

        <Stack.Screen
          name="cost-price/[id]"
          options={{
            presentation: "modal",
            title: t("detailsModalTitle", { ns: "costPrice" }),
          }}
        />

        <Stack.Screen
          name="cost-price/add"
          options={{
            presentation: "modal",
            title: t("addModalTitle", { ns: "costPrice" }),
          }}
        />

        <Stack.Screen
          name="expense/[id]"
          options={{
            presentation: "modal",
            title: t("detailsModalTitle", { ns: "expenses" }),
          }}
        />

        <Stack.Screen
          name="expense/add"
          options={{
            presentation: "modal",
            title: t("addModalTitle", { ns: "expenses" }),
          }}
        />

        <Stack.Screen
          name="financial-model-month/[id]"
          options={{
            presentation: "modal",
            title: t("detailsModalTitle", { ns: "financialModel" }),
          }}
        />

        <Stack.Screen name="+not-found" />
      </Stack>
      <Toast config={toastConfig} />
      <DecemberMessage />
    </ThemeProvider>
  );
}
