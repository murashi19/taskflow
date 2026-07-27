import type { AuthUser } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isHydrated: boolean;
  setSession: (data: {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  }) => void;
  setAccessToken: (accessToken: string) => void;
  clearSession: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isHydrated: false,

      setSession: ({ user, accessToken, refreshToken }) => set({ user, accessToken, refreshToken }),

      setAccessToken: (accessToken) => set({ accessToken }),

      clearSession: () => set({ user: null, accessToken: null, refreshToken: null }),

      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "auth-storage",
      // Access token intentionally excluded — kept in memory only.
      partialize: (state) => ({
        user: state.user,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
