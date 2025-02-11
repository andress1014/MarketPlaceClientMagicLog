import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/authStore";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import CartModal from "../components/CartModal"; // Modal del carrito
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faFilePen, faRightFromBracket, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddProductModal from "../features/product/components/AddProductModal";

const Navigation = () => {
  const { isAuthenticated, logout, roleType } = useAuthStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="main-content">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ borderRadius: "0 0 15px 15px", backgroundColor: "#a6dfe3" }}>
        <div className="container d-flex justify-content-between">
          <Link to="/" className="navbar-brand">Home</Link>

          <div className="d-flex gap-2">
            {/* Botón para abrir el carrito */}
            {(!isAuthenticated || (roleType && !["admin", "seller"].includes(roleType))) && (
              <button className="btn buttonNav position-relative" onClick={() => setIsCartOpen(true)}>
                <FontAwesomeIcon icon={faCartShopping} /> Cart
                {cart.length > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {cart.length}
                  </span>
                )}
              </button>
            )}

            {/* Mostrar botón Logout si está autenticado; de lo contrario, Login y Register */}
            {isAuthenticated ? (
              <>
                <button onClick={handleLogout} className="btn buttonNav">
                  <div className="sign">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </div>
                  <div className="text">Logout</div>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsLoginOpen(true)} className="btn buttonNav ">
                  <FontAwesomeIcon icon={faUser} /> Login
                </button>
                <button onClick={() => setIsRegisterOpen(true)} className="btn buttonNav"> <FontAwesomeIcon icon={faFilePen} /> Register</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {}
      <LoginModal show={isLoginOpen} handleClose={() => setIsLoginOpen(false)} />
      <RegisterModal show={isRegisterOpen} handleClose={() => setIsRegisterOpen(false)} />
      <CartModal show={isCartOpen} handleClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Navigation;
