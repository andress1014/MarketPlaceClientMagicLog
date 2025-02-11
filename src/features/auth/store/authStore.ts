import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  roleType: "seller" | "customer" | "admin" | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  restoreAuth: () => void; // ✅ Nueva función para restaurar la sesión
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  roleType: null,
  token: null,

  login: (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const roleType = decodedToken.roleCode as "seller" | "customer" | "admin";
      console.log("Logging in:", decodedToken.email, roleType);

      localStorage.setItem("token", token);
      set({ isAuthenticated: true, roleType, token });
    } catch (error) {
      console.error("Failed to decode token", error);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false, roleType: null, token: null });
  },

  restoreAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const roleType = decodedToken.roleCode as "seller" | "customer" | "admin";
        set({ isAuthenticated: true, roleType, token });
      } catch (error) {
        console.error("Failed to restore auth", error);
      }
    }
  },
}));
