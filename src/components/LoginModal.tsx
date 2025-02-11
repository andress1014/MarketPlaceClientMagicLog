import { Modal } from "react-bootstrap";
import LoginForm from "../features/auth/components/LoginForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

interface LoginModalProps {
  show: boolean;
  handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="border-0">
        <button 
          onClick={handleClose} 
          type="button"
          className="btn-close"
        >
        </button>
      </Modal.Header>
      
      <Modal.Body>
        <LoginForm handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
