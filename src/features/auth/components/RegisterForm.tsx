import { useState } from "react";
import { authService } from "../services/authService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

interface RegisterFormProps {
  handleClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ handleClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; confirmPassword?: string; apiError?: string }>({});

  const validate = () => {
    const newErrors: { username?: string; email?: string; password?: string; confirmPassword?: string } = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password || password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match"; 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        await authService.register(username, email, password, "customer");
        handleClose(); // ✅ Cierra el modal después del registro exitoso
      } catch (error: any) {
        // ✅ Verificar si el error es una respuesta HTTP válida
        if (error instanceof Response) {
          const errorData = await error.json();
          setErrors({ apiError: errorData.message || "Registration failed" });
        } else {
          console.log(error)
          setErrors({ apiError: "An unexpected error occurred" });
        }
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {errors.apiError && <p className="text-danger">{errors.apiError}</p>}
      
      <div className="flex-column">
        <label>Username</label>
      </div>
      <div className="inputForm">
        <FontAwesomeIcon icon={faUser} />
        <input 
          placeholder="Enter your Username"
          className="input" 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
        />
      </div>
      {errors.username && <p className="text-danger">{errors.username}</p>}

      <div className="flex-column">
        <label>Email</label>
      </div>
      <div className="inputForm">
        <FontAwesomeIcon icon={faEnvelope} />
        <input 
          placeholder="Enter your Email"
          className="input" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </div>
      {errors.email && <p className="text-danger">{errors.email}</p>}

      <div className="flex-column">
        <label>Password</label>
      </div>
      <div className="inputForm">
        <FontAwesomeIcon icon={faLock} />
        <input 
          placeholder="Enter your Password"
          className="input" 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
      </div>
      {errors.password && <p className="text-danger">{errors.password}</p>}

      <div className="flex-column">
        <label>Confirm Password</label>
      </div>
      <div className="inputForm">
        <FontAwesomeIcon icon={faLock} />
        <input 
          placeholder="Confirm your Password"
          className="input" 
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required 
        />
      </div>
      {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}

      <button type="submit" className="buttonLogReg">
        Register
      </button>
    </form>
  );
};


export default RegisterForm;
