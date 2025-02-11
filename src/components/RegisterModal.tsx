import { Modal } from "react-bootstrap";
import RegisterForm from "../features/auth/components/RegisterForm"; 
import { authService } from "../features/auth/services/authService";

interface RegisterModalProps {
  show: boolean;
  handleClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ show, handleClose }) => {
  const handleRegister = async (data: { username: string; email: string; password: string; confirmPassword: string; roleType: string }) => {
    try {
      await authService.register(data.username, data.email, data.password, data.roleType);
      handleClose(); // ✅ Cierra el modal después del registro
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="border-0">
        <button 
          onClick={handleClose} 
          className="btn-close"
          style={{ position: 'absolute', right: '1rem', top: '1rem' }}
        />
      </Modal.Header>
      
      <Modal.Body>
        <RegisterForm onSubmit={handleRegister} /> {/* ✅ Pasa onSubmit en vez de handleClose */}
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
