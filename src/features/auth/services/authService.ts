const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const authService = {
  login: async (email: string, password: string) => {
    console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json(); // Recibe toda la respuesta JSON
      return data.token; // Asegúrate de devolver solo el token
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  register: async (username: string, email: string, password: string, roleType: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, roleType }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },
};
