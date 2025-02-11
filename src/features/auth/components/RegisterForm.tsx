import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

// ✅ Definimos correctamente la interfaz de props
interface RegisterFormProps {
  onSubmit: (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    roleType: string;
  }) => Promise<void>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleType: "customer",
  });

  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; confirmPassword?: string; apiError?: string }>({});

  const validate = () => {
    const newErrors: { username?: string; email?: string; password?: string; confirmPassword?: string } = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password || formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"; 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        await onSubmit(formData);
      } catch (error: any) {
        if (error instanceof Response) {
          const errorData = await error.json();
          setErrors({ apiError: errorData.message || "Registration failed" });
        } else {
          console.log(error);
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
          name="username"
          value={formData.username}
          onChange={handleChange}
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
          name="email"
          value={formData.email}
          onChange={handleChange}
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
          name="password"
          value={formData.password}
          onChange={handleChange}
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
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
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
