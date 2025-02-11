import { Modal } from "react-bootstrap";
import RegisterForm from "../features/auth/components/RegisterForm"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

interface RegisterModalProps {
  show: boolean;
  handleClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="border-0">
        <button 
          onClick={handleClose} 
          className="btn-close"
          style={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
        </button>
      </Modal.Header>
      
      <Modal.Body>
        <RegisterForm handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
