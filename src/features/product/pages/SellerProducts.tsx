import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import { useAuthStore } from "../../auth/store/authStore";
import EditProductModal from "../components/EditProductModal";
import AddProductModal from "../components/AddProductModal";

interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

const SellerProducts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddProductModal, setShowAddProductModal] = useState<boolean>(false);

  const fetchSellerProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se ha encontrado el token de autenticación");
      }
      const data = await productService.getSellerProducts(token);
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(
        err instanceof Error
          ? `Error al cargar productos: ${err.message}`
          : "Error al cargar los productos del vendedor"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    console.log("Producto seleccionado para edición:", product);
    setSelectedProduct(product);
  };

  const handleDelete = async (productId: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        await productService.deleteProduct(token, productId);
        await fetchSellerProducts(); // Recargar la lista después de eliminar
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete product");
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSellerProducts();
    }
  }, [isAuthenticated]);

  // Show loading state
  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  // Show error state
  if (error) {
    return <div className="text-center p-4 text-danger">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-center mb-4">Your Products</h2>

      {/* Botón para agregar producto */}
      <div className="text-end mb-3">
        <button
          className="btn btn-success"
          onClick={() => setShowAddProductModal(true)}
        >
          Add Product
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">SKU</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para editar producto */}
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          handleClose={() => setSelectedProduct(null)}
          refreshProducts={fetchSellerProducts}
        />
      )}

      {/* Modal para agregar producto */}
      <AddProductModal
        show={showAddProductModal}
        handleClose={() => setShowAddProductModal(false)}
        onProductAdded={() => {
          fetchSellerProducts(); // Refrescar la lista de productos
          setShowAddProductModal(false); // Cerrar el modal
        }}
      />
    </div>
  );
};

export default SellerProducts;