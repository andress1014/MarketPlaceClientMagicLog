const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const userService = {
  getSellers: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/sellers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sellers");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching sellers:", error);
      throw error;
    }
  },
};
