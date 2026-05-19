"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/types";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const fakeUser: AuthUser = {
  id: "usr_001",
  name: "Helena Castilho",
  email: "helena@auroraboutique.com.br",
  role: "owner",
  avatarUrl:
    "https://api.dicebear.com/9.x/notionists/svg?seed=helena-castilho&backgroundType=gradientLinear&backgroundColor=c0aede,d1d4f9",
  partnerId: "ptn_001",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string) =>
        set({
          user: { ...fakeUser, email: email || fakeUser.email },
          isAuthenticated: true,
        }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "clube-fidelidade-auth" },
  ),
);
