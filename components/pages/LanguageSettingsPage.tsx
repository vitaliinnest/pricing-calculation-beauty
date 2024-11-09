import { useLanguageStore } from "@/stores/languageStore";
import { View } from "react-native";

export default function LanguageSettingsPage() {
  const t = useLanguageStore();
  return <View></View>;
}
