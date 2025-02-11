import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import RegisterForm from "../components/RegisterForm";

const RegisterUser = () => {
  const navigate = useNavigate();

  const handleRegister = async (data: { username: string; email: string; password: string; confirmPassword: string; roleType: string }) => {
    try {
      await authService.register(data.username, data.email, data.password, data.roleType);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* ✅ Ahora RegisterForm recibe correctamente onSubmit */}
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterUser;
