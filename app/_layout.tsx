import toastConfig from "@/toastConfig";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

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
            title: "Обробка інструменту",
          }}
        />
        <Stack.Screen
          name="tool-processing/add"
          options={{
            presentation: "modal",
            title: "Додавання обробки інструменту",
          }}
        />

        <Stack.Screen
          name="equipment-wear/[id]"
          options={{
            presentation: "modal",
            title: "Знос обладнання",
          }}
        />
        <Stack.Screen
          name="equipment-wear/add"
          options={{
            presentation: "modal",
            title: "Додавання зносу обладнання",
          }}
        />

        <Stack.Screen
          name="cost-price/[id]"
          options={{
            presentation: "modal",
            title: "Собівартість",
          }}
        />

        <Stack.Screen
          name="cost-price/add"
          options={{
            presentation: "modal",
            title: "Додавання собівартості",
          }}
        />

        <Stack.Screen
          name="expense/[id]"
          options={{
            presentation: "modal",
            title: "Витрати",
          }}
        />

        <Stack.Screen
          name="expense/add"
          options={{
            presentation: "modal",
            title: "Додавання витрат",
          }}
        />

        <Stack.Screen
          name="financial-model/[id]"
          options={{
            presentation: "modal",
            title: "Фінансова модель",
          }}
        />

        <Stack.Screen name="+not-found" />
      </Stack>
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}
