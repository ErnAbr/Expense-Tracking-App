import { create } from "zustand";

interface User {
  email: string;
}

interface AppContext {
  user: User | null;
  setUser: (user: User | null) => void;
  darkMode: boolean;
  setDarkMode: () => void;
}

export const useAppContext = create<AppContext>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  darkMode: JSON.parse(localStorage.getItem("darkMode") || "false"),
  setDarkMode: () =>
    set((state) => {
      localStorage.setItem("darkMode", JSON.stringify(!state.darkMode));
      return { darkMode: !state.darkMode };
    }),
}));
