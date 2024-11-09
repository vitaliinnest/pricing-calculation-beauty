import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildStorage } from "./store";

interface LanguageStore {
  language: string;
  changeLanguage: (language: string) => void;
}

const storage = buildStorage<LanguageStore>();

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "uk",
      changeLanguage: (language) => set({ language }),
    }),
    {
      name: "language-storage",
      storage,
    }
  )
);
