import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import { useAuthStore } from "../../auth/store/authStore";
import { useCart } from "../../../context/CartContext";
import EditProductModal from "./EditProductModal";

interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

const ProductList = ({ sellerOnly }: { sellerOnly?: boolean }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, roleType: rawRoleType } = useAuthStore();
  const roleType = rawRoleType || "";
  const { addToCart, cart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const data = isAuthenticated && token
        ? await productService.getSellerProducts(token)
        : await productService.getCustomerProducts(token || "");

      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sellerOnly, isAuthenticated]);

  const handleDeleteProduct = async (productId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in as a seller to delete products.");
      return;
    }

    try {
      await productService.deleteProduct(token, productId);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  // ✅ Función mejorada para controlar el stock antes de agregar al carrito
  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;

    if (currentQuantity + 1 > product.quantity) {
      alert(`Not enough stock available for ${product.name}. Only ${product.quantity} left.`);
      return;
    }

    addToCart(product);
  };

  // ✅ Función para abrir el modal de edición con verificación
  const handleEditProduct = (product: Product) => {
    console.log("Selected product for editing:", product);
    setSelectedProduct(product);
  };

  return (
    <div className="container-fluid">
      <h2 className="text-center mb-4">All Products</h2>

      <div className="table-responsive mx-auto product-table-container">
        <table className="table table-striped table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">SKU</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              {!["admin", "seller"].includes(roleType) && <th scope="col">Action</th>}
              {roleType === "seller" && <th scope="col">Edit</th>}
              {roleType === "seller" && <th scope="col">Delete</th>}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={product.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price.toFixed(2)}</td>
                  {!["admin", "seller"].includes(roleType) && (
                    <td>
                      <button className="btn btn-primary btn-sm" onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </button>
                    </td>
                  )}
                  {roleType === "seller" && (
                    <td>
                      <button className="btn btn-warning btn-sm" onClick={() => handleEditProduct(product)}>
                        Edit
                      </button>
                    </td>
                  )}
                  {roleType === "seller" && (
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product.id)}>
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-danger">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Asegurar que el modal se muestra correctamente */}
      <EditProductModal
        product={selectedProduct}
        handleClose={() => setSelectedProduct(null)}
        refreshProducts={fetchProducts}
      />
    </div>
  );
};

export default ProductList;
