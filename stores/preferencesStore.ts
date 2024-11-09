import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";

interface PreferencesStore {
  language: string;
  changeLanguage: (language: string) => void;
}

const storage = buildStorage<PreferencesStore>();

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      language: "uk",
      changeLanguage: (language) => set({ language }),
    }),
    {
      name: "preferences-storage",
      storage,
    }
  )
);
