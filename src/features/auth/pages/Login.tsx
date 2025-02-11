import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <LoginForm handleClose={() => { /* handle close logic */ }} />
    </div>
  );
};

export default Login;
