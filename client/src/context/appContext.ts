import { create } from "zustand";

interface AppContext {
  darkMode: boolean;
  setDarkMode: () => void;
}

export const useAppContext = create<AppContext>((set) => ({
  darkMode: JSON.parse(localStorage.getItem("darkMode") || "false"),

  setDarkMode: () =>
    set((state) => {
      localStorage.setItem("darkMode", JSON.stringify(!state.darkMode));
      return { darkMode: !state.darkMode };
    }),
}));
