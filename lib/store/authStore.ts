import { create } from "zustand";
import { User } from "@/types/user";
import { persist } from "zustand/middleware";

type SessionStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) =>
        set(() => ({
          user: user,
          isAuthenticated: true,
        })),
      clearIsAuthenticated: () =>
        set(() => ({
          isAuthenticated: false,
          user: null,
        })),
    }),
    {
      name: "uset-session",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
