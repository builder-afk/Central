import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  company: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "user-1",
    name: "Kunal Verma",
    email: "kunal@houseverse.ai",
    avatar: "KV",
    role: "Admin",
    company: "HouseVerse AI",
  },
  isAuthenticated: true,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
