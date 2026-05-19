import type { AuthUser } from "@/types";

// Mock: integrar JWT/multi-tenant futuramente.
export const authService = {
  async login(_email: string, _password: string): Promise<AuthUser> {
    return {
      id: "usr_001",
      name: "Helena Castilho",
      email: _email,
      role: "owner",
      avatarUrl:
        "https://api.dicebear.com/9.x/notionists/svg?seed=helena-castilho",
      partnerId: "ptn_001",
    };
  },
  async logout(): Promise<void> {
    return;
  },
};
