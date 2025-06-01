import { create } from "zustand";
import { api } from "../api/api";
import { toast } from "react-toastify";
import axios from "axios";
import { CategoryObject } from "../interfaces/category";

interface User {
  email: string;
}

interface AppContext {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  darkMode: boolean;
  setDarkMode: () => void;
  categories: CategoryObject[] | null;
  setCategories: (categories: CategoryObject[]) => void;
}

export const useAppContext = create<AppContext>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: async () => {
    try {
      const response = await api.User.logout();
      set({ user: null });
      toast.success(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Error during Logout");
      }
    }
  },
  darkMode: JSON.parse(localStorage.getItem("darkMode") || "false"),
  setDarkMode: () =>
    set((state) => {
      localStorage.setItem("darkMode", JSON.stringify(!state.darkMode));
      return { darkMode: !state.darkMode };
    }),
  categories: null,
  setCategories: (categories) => set({ categories }),
}));
