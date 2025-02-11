const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const productService = {
  getSellerProducts: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/my-products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch seller products");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching seller products:", error);
      throw error;
    }
  },

  getCustomerProducts: async (token: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/product/list-customer-products`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch customer products");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching customer products:", error);
      throw error;
    }
  },

  createProduct: async (
    token: string,
    productData: {
      name: string;
      quantity: number;
      price: number;
      categoryId: number;
    }
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to create product");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  deleteProduct: async (token: string, productId: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/product/delete/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },

  updateProduct: async (
    token: string,
    productId: number,
    productData: { name: string; price: number; quantity: number }
  ) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/product/update/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to update product");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  getAdminProducts: async (token: string, sellerId: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/product/admin-products?sellerId=${sellerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch admin products");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching admin products:", error);
      throw error;
    }
  },

  getCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
};
