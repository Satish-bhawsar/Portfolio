import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authAPI } from "../services/api";

const useAuthStore = create(
  persist(
    (set, get) => ({
      admin: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authAPI.login({ email, password });
          const { token, admin } = res.data;
          localStorage.setItem("portfolio_token", token);
          set({ admin, token, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (err) {
          const message = err.response?.data?.message || "Login failed";
          set({ error: message, isLoading: false });
          return { success: false, message };
        }
      },

      logout: () => {
        localStorage.removeItem("portfolio_token");
        localStorage.removeItem("portfolio_admin");
        set({ admin: null, token: null, isAuthenticated: false });
      },

      updateAdmin: (admin) => set({ admin }),

      fetchMe: async () => {
        try {
          const res = await authAPI.getMe();
          set({ admin: res.data.admin, isAuthenticated: true });
        } catch {
          get().logout();
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "portfolio_admin",
      partialize: (state) => ({
        admin: state.admin,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
