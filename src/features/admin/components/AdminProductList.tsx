import { useEffect, useState } from "react";
import { productService } from "../../product/services/productService";
import { userService } from "../services/adminService"; // ✅ Importar userService
import { useAuthStore } from "../../auth/store/authStore";

interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

interface Seller {
  id: number;
  email: string;
}

const AdminProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]); // ✅ Lista de vendedores
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSellerId, setSelectedSellerId] = useState<number | "">("");
  const { isAuthenticated, token } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchSellers();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedSellerId !== "" && isAuthenticated) {
      fetchProducts();
    }
  }, [selectedSellerId]);

  // 🔹 Obtener la lista de vendedores
  const fetchSellers = async () => {
    try {
      if (!token) {
        throw new Error("Unauthorized");
      }
      const data = await userService.getSellers(token);
      setSellers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch sellers");
    }
  };

  // 🔹 Obtener productos del vendedor seleccionado
  const fetchProducts = async () => {
    setLoading(true);
    try {
      if (!token) {
        throw new Error("Unauthorized");
      }
      const data = await productService.getAdminProducts(token, Number(selectedSellerId));
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Admin: Seller Products</h2>

      {/* 🔥 Selector de vendedores dinámico */}
      <div className="mb-4">
        <label className="form-label fw-bold">Select Seller</label>
        <select className="form-control" value={selectedSellerId} onChange={(e) => setSelectedSellerId(Number(e.target.value))}>
          <option value="">-- Select Seller --</option>
          {sellers.map((seller) => (
            <option key={seller.id} value={seller.id}>
              {seller.email}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {/* 📋 Tabla de productos */}
      {!loading && products.length > 0 && (
        <div className="table-responsive d-flex justify-content-center">
          <table className="table table-bordered text-center w-75">
            <thead className="table-dark">
              <tr>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProductList;
