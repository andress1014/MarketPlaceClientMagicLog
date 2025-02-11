import { Modal, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faTrash } from '@fortawesome/free-solid-svg-icons';

interface CartModalProps {
  show: boolean;
  handleClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ show, handleClose }) => {
  const { cart, removeFromCart } = useCart();

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="border-0 ">
        <Modal.Title>Shopping Cart</Modal.Title>
        <button 
          onClick={handleClose} 
          className="btn-close"
          style={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
        </button>
      </Modal.Header>
      <Modal.Body>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => removeFromCart(item.id)}
                      className="d-flex align-items-center gap-2 justify-content-center"
                      style={{ paddingLeft: '15px', paddingRight: '15px' }} // Añadimos 5px extra a cada lado
                    >
                      <FontAwesomeIcon icon={faTrash} /> 
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
