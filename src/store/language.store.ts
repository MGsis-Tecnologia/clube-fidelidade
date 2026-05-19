import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Language } from "@/lib/i18n";

interface LanguageState {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: "pt",
      setLang: (lang) => set({ lang }),
    }),
    { name: "sv-lang" }
  )
);
