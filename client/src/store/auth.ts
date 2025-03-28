import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (user: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  login: (token) => {
    localStorage.setItem("auth-token", token);
    set({ isAuthenticated: true, token });
  },
  logout: () => {
    localStorage.removeItem("auth-token");
    set({ isAuthenticated: false, token: null });
  },
}));

export default useAuthStore;
