import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

interface LoginFormProps {
  handleClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) newErrors.email = "Invalid email format";
    
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const token = await authService.login(email, password);
        if (!token) throw new Error("Token not received from server");
  
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const roleType = decodedToken.roleCode;
  
        login(token);
        handleClose();
  
        if (roleType === "seller") {
          navigate("/seller/products");
        } else if (roleType === "admin") {
          navigate("/admin/products");
        }
      } catch (error) {
        setErrors({ email: "Invalid credentials" });
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {errors.email && errors.email === "Invalid credentials" && (
        <p className="text-danger">{errors.email}</p>
      )}

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
      {errors.email && errors.email !== "Invalid credentials" && (
        <p className="text-danger">{errors.email}</p>
      )}

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

      <button type="submit" className="buttonLogReg">
        Login
      </button>
    </form>
  );
};


export default LoginForm;
