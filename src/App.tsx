import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./features/auth/store/authStore";
import Navigation from "./components/Navigation";
import RegisterUser from "./features/auth/pages/Register";
import Home from "./components/Home";
import SellerProducts from "./features/product/pages/SellerProducts";
import AdminProductList from "./features/admin/components/AdminProductList";
import { CartProvider } from "./context/CartContext";
import './App.css';

function App() {
  const { isAuthenticated, roleType, restoreAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    restoreAuth();
    setIsLoading(false); // ✅ Espera que termine restoreAuth
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // ✅ Muestra un loader mientras se verifica la autenticación
  }

  return (
    <CartProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route
            path="/seller/products"
            element={isAuthenticated && roleType === "seller" ? <SellerProducts /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/products"
            element={isAuthenticated && roleType === "admin" ? <AdminProductList /> : <Navigate to="/" />}
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                roleType === "seller" ? <Navigate to="/seller/products" />
                : roleType === "admin" ? <Navigate to="/admin/products" />
                : <Navigate to="/" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="*" element={<Navigate to={window.location.pathname} />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
